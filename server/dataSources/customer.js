const { DataSource } = require("apollo-datasource");
const Customer = require('../models/customer');

class CustomerAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async getCustomerById({ id }) {
    try {
      const customer = await Customer.findById(id);
      return customer;
    } catch (err) {
      console.log(`Unable to get restaurant information, \n ${err}`);
    }
  }
}

module.exports = CustomerAPI;
