const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    restaurant(id: String): Restaurant
    customer(id: String): Customer
  }

  type Restaurant {
    name: String!,
    email: String!,
    phone: String!,
    description: String,
    location: String
  }

  type Customer {
    email: String!,
    phone: String!,
    card: Card,
    donations: [Donation!]!,
    totalDonations: Int!
  }

  type Card {
    number: String!,
    name: String!,
    date: String!
  }

  type Donation {
    amount: Int!,
    date: String!
  }
`;

module.exports = typeDefs;
