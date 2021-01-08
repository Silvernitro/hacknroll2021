const { DataSource } = require('apollo-datasource');

class RestaurantAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getRestaurantById({ id }) {
    try {
      const restaurant = await this.store.restaurants.findById(id);
      return this.restaurantReducer(restaurant);
    } catch (error) {
      console.error(error);
    }
  }

  restaurantReducer(restaurant) {
    return {
      name: restaurant.name,
      email: restaurant.email,
      phone: restaurant.phone,
      description: restaurant.description,
      location: restaurant.location
    }
  }
}

module.exports = RestaurantAPI
