module.exports = {
  Query: {
    getAllRestaurants: (_, __, { dataSources }) => (
      dataSources.restaurantAPI.getAllRestaurants()
    ),
    restaurant: async (_, { id }, { dataSources }) => {
      return dataSources.restaurantAPI.getRestaurantById({ id });
    },
    customer: async (_, { id }, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById({id});
    }
  },
  Mutation: {
    login: async (_, { userInput: { email, password, role }}, context) => {
      if (!context.user) {
        try {
          const authResult = await context.dataSources.authAPI.authenticateUser({ email, password, role });
          return {
            ...authResult,
            role,
            success: true,
            message: "Successfully logged in."
          }
        } catch (authError) {
          return {
            success: false,
            message: "Failed to log in."
          }
        }
      }

      return {
        success: true,
        message: "Already logged in."
      }
    },
    createRestaurant: async (_, { restaurantInput }, { dataSources }) => {
      try {
        return dataSources.restaurantAPI.createRestaurant(restaurantInput)
          .then(result => ({
            restaurant: result,
            success: true
          }));
      } catch (err) {
        console.log(err);
        return {
          success: false
        }
      }
    },
    createCustomer: async (_, { customerInput }, { dataSources }) => {
      try {
        return dataSources.customerAPI.createCustomer(customerInput)
          .then(result => ({
            customer: result,
            success: true
          }));
      } catch (err) {
        console.log(err);
        return {
          success: false
        }
      }
    },
    createDonation: async (_, { donationInput }, { dataSources }) => {
      try {
        const donation = await dataSources.donationAPI.createDonation(donationInput);
        return Promise.all([
          dataSources.restaurantAPI.addDonationToRestaurant(donation),
          dataSources.customerAPI.addDonationToCustomer(donation)
        ]).then(() => dataSources.donationAPI.donationReducer(donation))
          .then((result) => ({
            donation: result,
            success: true
          }));
      } catch (err) {
        console.log(err);
        return {
          success: false
        }
      }
    },
    createClaim: async (_, { claimInput }, { dataSources }) => {
      try {
        const claim = await dataSources.claimAPI.createClaim(claimInput)
        return dataSources.restaurantAPI.addClaimToRestaurant(claim, claimInput.restaurant_id)
          .then(() => ({
            claim: dataSources.claimAPI.claimReducer(claim),
            success: true
          }));
      } catch (err) {
        console.log(err);
        return {
          success: false
        }
      }
    },
    addMenuItem: async (_, { menuInput }, { dataSources }) => {
      try {
        const { restaurant_id, items } = menuInput;
        return dataSources.restaurantAPI.addMenuItemsToRestaurant(restaurant_id, items)
          .then(doc => ({
            menu: {
              items: doc.menu,
              restaurant_id: doc._id
            },
            success: true
          }));
      } catch (err) {
        console.log(err);
        return {
          success: false
        }
      }
    }
  }
}
