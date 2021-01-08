const mongoose = require('mongoose')

const { Schema } = mongoose

const ClaimSchema = new Schema(
  {
    item: {
      type: mongoose.Schema.ObjectId,
      ref: 'MenuItem',
    },
    ic: {
      type: Number
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Claim', ClaimSchema);
