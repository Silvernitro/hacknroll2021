const { DataSource } = require("apollo-datasource");
const Claims = require('../models/claims');

class ClaimsAPI extends DataSource {
  constructor() {
    super();
  }

  async createClaim({ itemId, ic }) {
    try {
      const claimDetails = {
        itemId,
        ic
      }
      const newClaim = new Claims(claimDetails);
      return newClaim.save()
        .then(doc => {
          doc.populate('item')
          return doc
        });
    } catch (err) {
      console.log(`Unable to create claim, ${err}`);
    }
  }
}

module.exports = ClaimsAPI;
