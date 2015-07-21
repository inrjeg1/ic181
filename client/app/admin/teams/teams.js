'use strict';

angular.module('atrExpApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('teams', {
        url: '/admin/teams',
        templateUrl: 'app/admin/teams/teams.html',
        controller: 'TeamsCtrl',
        authenticate: true
      });
  });
