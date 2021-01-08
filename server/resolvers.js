module.exports = {
  Query: {
    getAllRestaurants: (_, __, { dataSources }) => (
      dataSources.restaurantAPI.getAllRestaurants()
    ),
    restaurant: async (_, { id }, { dataSources }) => {
      return dataSources.restaurantAPI.getRestaurantById({id});
    },
    customer: async (_, { id }, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById({id});
    }
  },
  Mutation: {
    createRestaurant: async (_, { restaurantInput }, { dataSources }) => {
      console.log(restaurantInput);
      return dataSources.restaurantAPI.createRestaurant(restaurantInput);
    },
    createCustomer: async (_, { customerInput }, { dataSources }) => {
      return dataSources.customerAPI.createCustomer(customerInput);
    },
    createDonation: async (_, { donationInput }, { dataSources }) => {
      try {
        const donation = await dataSources.donationAPI.createDonation(donationInput);
        return Promise.all([
          dataSources.restaurantAPI.addDonationToRestaurant(donation),
          dataSources.customerAPI.addDonationToCustomer(donation)
        ]).then(() => dataSources.donationAPI.donationReducer(donation));
      } catch (error) {
        console.log(error);
      }
    },
    createClaim: async(_, { claimInput }, { dataSources }) => {
      try {
        const claim = await dataSources.claimAPI.createClaim(claimInput);
        return dataSources.restaurantAPI.addClaimToRestaurant(claim)
          .then(() => dataSources.claimAPI.claimReducer(claim));
      } catch (error) {
        console.log(error);
      }
    }
  }
}
