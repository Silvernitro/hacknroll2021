const { DataSource } = require("apollo-datasource");

class CustomerAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
    this.customerModel = { store };
  }

  initialize(config) {
    this.context = config.context;
  }

  async getCustomerById({ customerId }) {
    try {
      const customer = await this.customerModel.findById(customerId);
      return customer;
    } catch (err) {
      console.log(`Unable to get restaurant information, \n ${err}`);
    }
  }
}

const store = {
  customerModel: require("../models/customer")
}

const testApi = new CustomerAPI(store)
console.log(testApi.getCustomerById("5ff7ffc059d7d89e8e1f8d04"));

module.exports = CustomerAPI;
