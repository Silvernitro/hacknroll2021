const { model, Schema } = require('mongoose');
const Claim = require('./claim');
const Donation = require('./donation');

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  menu: [
    {
      type: Schema.ObjectId,
      ref: 'Menuitem',
    }
  ],
  claims: [
    {
      type: Schema.ObjectId,
      ref: 'Claim',
    }
  ],
  donations: [
    {
      type: Schema.ObjectId,
      ref: 'Donation',
    }
  ],
  profile_pic: {
    type: String
  },
  qr_code: {
    type: String
  },
  balance: {
    type: Number
  }
});

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Restaurant = model('Restaurant', restaurantSchema);
const MenuItem = model('Menuitem', menuItemSchema);

module.exports = {
  Restaurant,
  MenuItem
}
