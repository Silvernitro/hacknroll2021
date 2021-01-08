const { model, Schema } = require('mongoose');

const eligibleSchema = Schema({
  identification: {
    type: String,
    required: true
  }
});

const Eligible = model('Eligible', eligibleSchema);

module.exports = Eligible;

