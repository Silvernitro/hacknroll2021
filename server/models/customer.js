const mongoose = require('mongoose')

const { Schema } = mongoose

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    card: {
      number: String,
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
