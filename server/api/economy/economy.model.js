'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EconomySchema = new Schema({
  name: String,
  code: String,
  control: Array
});

module.exports = mongoose.model('Economy', EconomySchema);