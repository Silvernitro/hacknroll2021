const { DataSource } = require("apollo-datasource");
const Claim = require('../models/claim');

class ClaimAPI extends DataSource {
  constructor() {
    super();
  }

  async createClaim({ item_id, ic }) {
    try {
      const claimDetails = {
        item: item_id,
        ic
      }
      const newClaim = new Claim(claimDetails);
      await newClaim.save();
      return Claim.findById(newClaim._id)
        .populate('item');
    } catch (err) {
      console.log(`Unable to create claim, ${err}`);
    }
  }

  claimReducer(claim) {
    return {
      item: claim.item,
      ic: claim.ic,
      date: claim.createdAt
    }
  }
}

module.exports = ClaimAPI;
