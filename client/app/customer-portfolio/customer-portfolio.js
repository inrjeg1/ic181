'use strict';

angular.module('atrExpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer-portfolio', {
        url: '/customer-portfolio',
        templateUrl: 'app/customer-portfolio/customer-portfolio.html',
        controller: 'CustomerPortfolioCtrl'
      });
  });