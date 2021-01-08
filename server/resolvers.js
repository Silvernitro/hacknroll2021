module.exports = {
  Query: {
    restaurant: async (_, { id }, { dataSources }) => {
      return dataSources.restaurantAPI.getRestaurantById({id});
    },
    customer: async (_, { id }, { dataSources }) => {
      return dataSources.customerAPI.getCustomerById({id});
    }
  },
  Mutation: {
    createRestaurant: async (_, { restaurantInput }, { dataSources }) => {
      return dataSources.restaurantAPI.createRestaurant(restaurantInput);
    },
    createCustomer: async (_, { customerInput }, { dataSources }) => {
      return dataSources.customerAPI.createCustomer(customerInput);
    }
  }
}
