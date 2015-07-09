'use strict';

angular.module('atrExpApp')
  .controller('SimulationbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'First Tab',
      'link': '/admin/simulation#first-tab'
    },
    {
      'title': 'Second Tab',
      'link': '/admin/simulation#second-tab'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });