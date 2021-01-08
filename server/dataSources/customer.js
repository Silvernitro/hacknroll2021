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
      return Customer.findById(id)
        .then(doc => this.customerReducer(doc));
    } catch (err) {
      console.log(`Unable to get customer information, \n ${err}`);
    }
  }

  async createCustomer({
    name,
    email,
    password,
    phone,
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
      return newCustomer.save();
    } catch (err) {
      console.log(`Unable to create customer, \n ${err}`);
    }
  }

  async addDonationToCustomer({ amount, donor_id, _id: donation_id }) {
    return Customer.findByIdAndUpdate(
        donor_id,
        {
          $push: { donations: donation_id },
          $inc: { totalDonations: amount }
        }
      );
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
