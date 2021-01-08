import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

import ApolloClient from "apollo-boost";
import { NormalizedCacheObject } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { cache } from "../cache";

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    id: String!
  }
`;

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    cache,
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization:
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : undefined,
    },
    resolvers: {},
  });

  // client
  //   .query({
  //     query: gql`
  //       {
  //         restaurant(id: "5ff823849d4ed21049a5a870") {
  //           name
  //         }
  //       }
  //     `,
  //   })
  //   .then((result) => console.log(result));

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
