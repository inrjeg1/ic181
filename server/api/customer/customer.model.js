'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Customer', CustomerSchema);

