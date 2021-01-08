const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query {
  restaurant(id: ID): Restaurant
  customer(id: ID): Customer
}

type Restaurant {
  name: String!,
  email: String!,
  password: String!,
  phone: String!,
  description: String,
  location: String
}

type Customer {
  email: String!,
  password: String!,
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
`
