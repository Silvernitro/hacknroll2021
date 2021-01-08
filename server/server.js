const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const RestaurantAPI = require('./dataSources/restaurant');
const CustomerAPI = require('./dataSources/customer');
const DonationAPI = require('./dataSources/donation');

require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected.");
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {}
  },
  dataSources: () => ({
    restaurantAPI: new RestaurantAPI(),
    customerAPI: new CustomerAPI(),
    donationAPI: new DonationAPI()
  })
});

// Initialize the app
const app = express();

app.use(cors());

server.applyMiddleware({ app, cors: false });

// Start the server
app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphql to run queries!');
});
