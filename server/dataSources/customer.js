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
      return this.customerReducer(customer);
    } catch (err) {
      console.log(`Unable to get customer information, \n ${err}`);
    }
  }

  async createCustomer({
    name,
    email,
    password,
    card: {
      name: card_name,
      number,
      date
    }
  }) {
    try {
      const customerDetails = {
        name,
        email,
        phone,
        password,
        card: {
          name: card_name,
          number,
          date,
        },
      }
      const newCustomer = new Customer(customerDetails);
      await newCustomer.save();
      return this.customerReducer({
        _id: newCustomer._id,
        ...customerDetails
      })
    } catch (err) {
      console.log(`Unable to create customer, \n ${err}`);
    }
  }

  customerReducer(customer) {
    return {
      id: customer._id || "id",
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "123456",
      card: customer.card || {
        name: "cardName",
        date: "11/11/2021",
        number: "209312094",
      },
      donations: customer.donations || [],
      totalDonations: customer.totalDonations || 0,
    };
  }
}

module.exports = CustomerAPI;
