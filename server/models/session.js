const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const SessionSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  // either "restraunt" or "customer"
  role: {
    type: String,
    required: true
  }
});

const Session = model("Session", SessionSchema);

module.exports = Session;
