'use strict';

angular.module('atrExpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('madeoffers', {
        url: '/madeoffers',
        templateUrl: 'app/madeoffers/madeoffers.html',
        controller: 'MadeOffersCtrl',
        authenticate: true
      });
  });