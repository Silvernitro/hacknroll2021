module.exports = {
  Query: {
    restaurant: async (_, { id }, { dataSources } ) => {
      return dataSources.restaurantAPI.getRestaurantById({id});
    },
    customer: async (_, { id }, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById({id});
    }
  }

}
