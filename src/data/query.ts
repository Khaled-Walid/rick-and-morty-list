import { gql } from '@apollo/client';

export const getCharactersQuery = gql`
  query getCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        image
        name
        status
        species
        gender
        location {
          name
        }
        episode {
          name
        }
      }
    }
  }
`;
