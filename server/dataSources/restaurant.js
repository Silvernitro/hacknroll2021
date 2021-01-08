const { DataSource } = require('apollo-datasource');
const { Restaurant } = require('../models/restaurants');

class RestaurantAPI extends DataSource {
  constructor() {
    super();
  }

  async getRestaurantById({ id }) {
    try {
      console.log("id" + id);
      const restaurant = await Restaurant.findById(id);
      console.log(restaurant);
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
