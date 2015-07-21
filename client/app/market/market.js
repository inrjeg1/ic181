'use strict';

angular.module('atrExpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('market', {
        url: '/market',
        templateUrl: 'app/market/market.html',
        controller: 'MarketCtrl',
        authenticate: true
      });
  });