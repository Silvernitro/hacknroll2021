const { DataSource } = require('apollo-datasource');
const Donation  = require('../models/donation');

class DonationAPI extends DataSource {
  constructor() {
    super();
  }

  async createDonation({ donor_id, restaurant_id, amount }) {
    const newDonation = new Donation({ donor_id, restaurant_id, amount });
    return newDonation.save();
  }

  donationReducer(donation) {
    return {
      amount: donation.amount,
      date: donation.createdAt
    }
  }
}

module.exports = DonationAPI;
