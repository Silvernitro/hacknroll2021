const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    getAllRestaurants: [Restaurant!]!
    restaurant(id: String): Restaurant
    customer(id: String): Customer
  }

  type Mutation {
    createRestaurant(restaurantInput: RestaurantInput): Restaurant
    createCustomer(customerInput: CustomerInput): Customer
    createDonation(donationInput: DonationInput): Donation
    createClaim(claimInput: ClaimInput): Claim
  }

  input RestaurantInput {
    name: String!
    email: String!
    password: String!
    phone: String!
    description: String
    location: String
  }

  input CustomerInput {
    name: String!,
    email: String!
    password: String!
    phone: String!
    card: CardInput
  }

  input DonationInput {
    donor_id: String!
    restaurant_id: String!
    amount: Int!
  }

  input ClaimInput {
    ic: String!
    restaurant_id: String!
    item_id: String!
  }

  input CardInput {
    number: String!
    name: String!
    date: String!
  }

  type Restaurant {
    id: String!
    name: String!
    email: String!
    phone: String!
    description: String
    location: String
    menu: [Item!]!
    claims: [Claim!]!
    donations: [Donation!]!
    profile_pic: String
    qr_code: String
    balance: Int!
  }

  type Customer {
    id: String!
    email: String!
    name: String!,
    phone: String!
    card: Card
    donations: [Donation!]!
    totalDonations: Int!
  }

  type Card {
    number: String!
    name: String!
    date: String!
  }

  type Donation {
    amount: Int!
    date: String!
  }

  type Item {
    price: Int!
    name: String!
  }

  type Claim {
    item: Item!
    ic: String!
    date: String!
  }
`;

module.exports = typeDefs;
