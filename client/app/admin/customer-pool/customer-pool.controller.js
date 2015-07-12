'use strict';

angular.module('atrExpApp')
  .controller('CustomerPoolCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    var newObj = {
      "name":"Podoid",
      "country":"Spain",
      "countryCode":"es",
      "region":"West-Europe",
      "regionCode":"we",
      "industry":"Durables",
      "buyerCountry1":"Spain",
      "buyerIndustry1":"Services",
      "buyerTpe1":3114278,
      "buyerCountry2":"Belgium",
      "buyerIndustry2":"Chemicals",
      "buyerTpe2":816454,
      "buyerCountry3":"Spain",
      "buyerIndustry3":"Chemicals",
      "buyerTpe3":565189
    };
    $http.post('/api/customer', { name: 'hi'});

    $http.get('/api/customer').success(function (customers) {
      $scope.customerPool = customers;
      console.log('customerPool: ', customers)
    });

    $http.get('/api/economy').success(function (economies) {
      $scope.economy = economies;
      console.log('economy: ', $scope.economy)
    });

  });
