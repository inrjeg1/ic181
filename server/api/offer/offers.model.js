'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfferSchema = new Schema({
  team: String,
  customer: String,
  price: Number,
  riskacceptance: Number,
});

module.exports = mongoose.model('Offer', OfferSchema);