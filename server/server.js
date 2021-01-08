const express = require("express");
const bodyParser = require("body-parser");
const {
  ApolloServer,
  graphqlExpress,
  graphiqlExpress,
} = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const mongoose = require("mongoose");
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const RestaurantAPI = require("./dataSources/restaurant");
const CustomerAPI = require("./dataSources/customer");
const DonationAPI = require("./dataSources/donation");
const ClaimAPI = require("./dataSources/claim");
const AuthAPI = require("./dataSources/auth");
const Session = require("./models/session");

require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB connected.");
});

async function getUser(token) {
  return Session.findOne({ token: token });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) =>{
    // // get the user token from the headers
    // const token = req.headers.authentication || '';

    // // try to retrieve a user with the token
    // const user = await getUser(token);

    // // optionally block the user
    // // we could also check user roles/permissions here
    // // if (!user) throw new AuthenticationError('you must be logged in to query this schema');

    // // add the user to the context
    // return {
    //   user,
    //   models: {
    //     User: generateUserModel({ user }),
    //   }
    // };
   },
  dataSources: () => ({
    restaurantAPI: new RestaurantAPI(),
    customerAPI: new CustomerAPI(),
    donationAPI: new DonationAPI(),
    claimAPI: new ClaimAPI(),
    authAPI: new AuthAPI(),
  }),
});

// Initialize the app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

server.applyMiddleware({ app, cors: corsOptions });

// Start the server
app.listen(4000, () => {
  console.log("Go to http://localhost:4000/graphql to run queries!");
});
