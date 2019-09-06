import gql from "graphql-tag";

export const TRANSLATIONS_QUERY = gql`
    {
        translations {
            id
            phrase
            type
            description
            translation
            userName
        }
    }
`;

export const CREATE_TRANSLATION = gql`
    mutation createTranslation($input: TranslationInput) {
        createTranslation(input: $input) {
            id
            phrase
            type
            description
            translation
            userName
        }       
    }
    
`;

export const TRANSLATION_CREATED = gql`
    subscription {
        translationCreated {
            id
            phrase
            type
            description
            translation
            userName
        }
    }
`;
