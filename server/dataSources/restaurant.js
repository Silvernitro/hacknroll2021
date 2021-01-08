const { DataSource } = require('apollo-datasource');
const { Restaurant } = require('../models/restaurants');

class RestaurantAPI extends DataSource {
  constructor() {
    super();
  }

  async getAllRestaurants() {
    const restaurants = await Restaurant.find({}).populate([
      {
        path: 'menu',
      },
      {
        path: 'claims',
        populate: [{ path: 'item' }]
      },
      {
        path: 'donations'
      }
    ]);

    return restaurants.map(restaurant => this.restaurantReducer(restaurant));
  }

  async getRestaurantById({ id }) {
    try {
      const restaurant = await Restaurant.findById(id)
      .populate([
        {
          path: 'menu',
        },
        {
          path: 'claims',
          populate: [{ path: 'item' }]
        },
        {
          path: 'donations'
        }
      ])

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
      menu: restaurant.menu,
      claims: restaurant.claims.map(claim => ({
        item: claim.item,
        ic: claim.ic,
        date: claim.createdAt
      })),
      donations: restaurant.donations.map(donation => ({
        amount: donation.amount,
        date: donation.createdAt
      })),
      profile_pic: restaurant.profile_pic,
      qr_code: restaurant.qr_code,
      balance: restaurant.balance,
    }
  }
}

module.exports = RestaurantAPI
