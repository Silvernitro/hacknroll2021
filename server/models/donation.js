const mongoose = require('mongoose')

const { Schema } = mongoose

const DonationSchema = new Schema(
  {
    donor_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
    },
    amount: {
      type: Number,
      required: true
    },
    restaurant_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Donation', DonationSchema)
