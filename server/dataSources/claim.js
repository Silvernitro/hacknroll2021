const { DataSource } = require("apollo-datasource");
const Claim = require('../models/claims');

class ClaimAPI extends DataSource {
  constructor() {
    super();
  }

  async createClaim({ itemId, ic }) {
    try {
      const claimDetails = {
        itemId,
        ic
      }
      const newClaim = new Claim(claimDetails);
      return newClaim.save()
        .then(doc => {
          doc.populate('item')
          return doc
        });
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
