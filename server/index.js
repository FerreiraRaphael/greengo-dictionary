const pubSub = require("./pubSub");
const database = require('./database');
const uuid = require("uuid/v4");

const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`  
    type Translation {
        id: String
        phrase: String
        type: String
        description: String
        translation: String
        userName: String
    }
    
    input TranslationInput {
        phrase: String
        type: String
        description: String
        translation: String
        userName: String
    }

    type Subscription {
        translationCreated: Translation
    }
    
    type Query {
        translations: [Translation]
    }
    
    type Mutation {
        createTranslation(input: TranslationInput): Translation
    } 
`;

const TRANSLATION_CREATED = 'TRANSLATION_CREATED';

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Subscription: {
    translationCreated: {
      subscribe: () => pubSub.asyncIterator([TRANSLATION_CREATED])
    },
  },
  Query: {
    translations: async (_, args, {database}) => {
      console.log('querying')
      return database('translations').select('*')
    },
  },
  Mutation: {
    createTranslation: async (_, { input }, { database }) => {
      const id = uuid();
      const createInput = { id, ...input };
      await database('translations').insert(createInput);
      pubSub.publish(TRANSLATION_CREATED, { translationCreated: createInput });
      return createInput;
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: (...args) => {
    return {
      database,
    }
  },
  subscriptions: {
    keepAlive: 10000,
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
