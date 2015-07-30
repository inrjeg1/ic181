'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OfferSchema = new Schema({
  yourModel: String
});

module.exports = mongoose.model('Offer', OfferSchema);