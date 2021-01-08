const { DataSource } = require("apollo-datasource");
const { Restaurant } = require("../models/restaurants");
const Session = require("../models/session");
const Customer = require("../models/customer");
const { AuthenticationError } = require("apollo-server");
const randtoken = require("rand-token");

class AuthAPI extends DataSource {
  constructor() {
    super();
  }

  async authenticateUser({ email, password, role }) {
    const model = role === "CUSTOMER" ? Customer : Restaurant;
    const user = await model.findOne({ email, password });

    if (!user) {
      throw new AuthenticationError("Email or password not correct!");
    }

    return {
      id: user._id,
      token: randtoken.generate(16)
    }
  }

}