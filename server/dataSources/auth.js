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

    const generatedToken = randtoken.generate(16);
    const session = new Session({ token: generatedToken, user_id: user._id, role })
    return session.save().then(({ user_id, token }) => ({
      id: user_id,
      token
    }));
  }

}

module.exports = AuthAPI
