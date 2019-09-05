const pubSub = require("./pubSub");

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
    type Subscription {
        hi: String
    }

    type Book {
        title: String
        author: String
    }
    type Query {
        books: [Book]
    }
    
    type Mutation {
        hey: String
    } 
`;

const HEY_HI = 'HEY_HI';

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Subscription: {
    hi: {
      subscribe: () => pubSub.asyncIterator([HEY_HI])
    },
  },
  Query: {
    books: () => books,
  },
  Mutation: {
    hey: () => {
      pubSub.publish(HEY_HI, { hi: 'HI' });
      return 'HEY';
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
