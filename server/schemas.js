const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    getAllRestaurants: [Restaurant!]!
    restaurant(id: String): Restaurant
    customer(id: String): Customer
  }

  type Mutation {
    login(userInput: UserInput): LoginResponse!
    createRestaurant(restaurantInput: RestaurantInput): RestaurantUpdateResponse!
    createCustomer(customerInput: CustomerInput): CustomerUpdateResponse!
    createDonation(donationInput: DonationInput): DonationUpdateResponse!
    createClaim(claimInput: ClaimInput): ClaimUpdateResponse!
    addMenuItem(menuInput: MenuInput): MenuUpdateResponse!
  }

  input UserInput {
    email: String!
    password: String!
    role: String!
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
    amount: Float!
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

  input ItemInput {
    name: String!
    price: Float!
  }

  input MenuInput {
    items: [ItemInput!]!
    restaurant_id: String!
  }

  type LoginResponse {
    success: Boolean!
    id: String
    token: String
    role: String
    message: String
  }

  type RestaurantUpdateResponse {
    success: Boolean!
    restaurant: Restaurant
    message: String
  }

  type CustomerUpdateResponse {
    success: Boolean!
    customer: Customer
    message: String
  }

  type DonationUpdateResponse {
    success: Boolean!
    donation: Donation
    message: String
  }

  type ClaimUpdateResponse {
    success: Boolean!
    claim: Claim
    message: String
  }

  type MenuUpdateResponse {
    success: Boolean!
    menu: Menu
    message: String
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
    balance: Float!
  }

  type Menu {
    restaurant_id: String!
    items: [Item!]!
  }

  type Customer {
    id: String!
    email: String!
    name: String!,
    phone: String!
    card: Card
    donations: [Donation!]!
    totalDonations: Float!
  }

  type Card {
    number: String!
    name: String!
    date: String!
  }

  type Donation {
    amount: Float!
    date: String!
  }

  type Item {
    id: String
    price: Float!
    name: String!
  }

  type Claim {
    item: Item!
    ic: String!
    date: String!
  }
`;

module.exports = typeDefs;
