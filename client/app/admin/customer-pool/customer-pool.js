'use strict';

angular.module('atrExpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer-pool', {
        url: '/admin/customer-pool',
        templateUrl: 'app/admin/customer-pool/customer-pool.html',
        controller: 'CustomerPoolCtrl',
        authenticate: true
      });
  });