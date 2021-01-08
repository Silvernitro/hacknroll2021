import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
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
