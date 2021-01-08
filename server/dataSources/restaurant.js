const { DataSource } = require('apollo-datasource');
const { Restaurant } = require('../models/restaurants');

class RestaurantAPI extends DataSource {
  constructor() {
    super();
  }

  async getAllRestaurants() {
    const restaurants = await Restaurant.find({});
    return restaurants.map(restaurant => this.restaurantReducer(restaurant));
  }

  async getRestaurantById({ id }) {
    try {
      return Restaurant.findById(id)
        .then(doc => this.restaurantReducer(doc));
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
      return newRestaurant.save();
    } catch (err) {
      console.log(`Unable to create restaurant, \n ${err}`);
    }
  }

  async addDonationToRestaurant({ amount, restaurant_id, _id: donation_id}) {
    return Restaurant.findByIdAndUpdate(
        restaurant_id,
        {
          $push: { donations: donation_id},
          $inc: { balance: amount }
        }
      );
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
