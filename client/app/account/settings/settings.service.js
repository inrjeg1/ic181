'use strict';

angular.module('atrExpApp')
  .service('settings', function (Auth) {
    var slogan = Auth.getCurrentUser().slogan;
    console.log('Slogan: ', slogan)
    this.slogan = slogan;
  });
