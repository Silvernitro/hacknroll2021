import { InMemoryCache, Reference, makeVar } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        id: {
          read() {
            return idVar();
          },
        },
      },
    },
  },
});

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar(
  typeof window !== "undefined" ? !!localStorage.getItem("token") : undefined
);

// Initializes to an empty string
export const idVar = makeVar("");
