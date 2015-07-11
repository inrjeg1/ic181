'use strict';

angular.module('atrExpApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    // var w = angular.element($window);
    // $scope.getHeight = function() {
    //     return w.height();
    // };
    // $scope.$watch($scope.getHeight, function(newValue, oldValue) {
    //     $scope.windowHeight = newValue;
    //     $scope.style = function() {
    //         return 'height="' + newValue + '"'
    //     };
    // });

    // w.bind('resize', function () {
    //     $scope.$apply();
    // });

  });