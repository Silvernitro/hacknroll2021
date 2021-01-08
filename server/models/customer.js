const mongoose = require('mongoose')

const { Schema } = mongoose

const CustomerSchema = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    card: {
      number: Number,
      name: String,
      date: Date,
    },
    donations: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Donation',
      }
    ],
    totalDonations: {
      type: Number,
      default: 0
    }
  }
)

module.exports = mongoose.model('Customer', CustomerSchema)
