const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const RestaurantAPI = require('./dataSources/restaurant');
const CustomerAPI = require('./dataSources/customer');

require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connected.");
});

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context: () => {
    return {}
  },
  dataSources: () => ({
    restaurantAPI: new RestaurantAPI(),
    customerAPI: new CustomerAPI()
  })
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphiql to run queries!');
});
