'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  offerid: String,
  team: String,
  customer: String,
  price: String,
  riskacceptance: String,
});

module.exports = mongoose.model('Offers', OfferSchema);