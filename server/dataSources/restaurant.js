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

  async createRestaurant({
    name,
    email,
    phone,
    password,
    location,
  }) {
    try {
      const restaurantDetails = {
        name,
        email,
        phone,
        password,
        location,
      };
      const newRestaurant = new Restaurant(restaurantDetails);
      await newRestaurant.save();
      return this.restaurantReducer({
        _id: newRestaurant._id,
        ...restaurantDetails
      })
    } catch (err) {
      console.log(`Unable to create restaurant, \n ${err}`);
    }
  }

  restaurantReducer(restaurant) {
    return {
      id: restaurant._id || "123456",
      name: restaurant.name,
      email: restaurant.email,
      phone: restaurant.phone || "+65 1231 1234",
      description: restaurant.description || "This is a sample description",
      location: restaurant.location || "123 Avenue 1",
    }
  }
}

module.exports = RestaurantAPI
