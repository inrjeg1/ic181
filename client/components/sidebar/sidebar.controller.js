'use strict';

angular.module('atrExpApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'icon': 'dashboard'
    },{
      'title': 'Market',
      'link': '/market',
      'icon': 'globe'
    },{
      'title': 'Customer Portfolio',
      'link': '/customer-portfolio',
      'icon': 'search-plus'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    // $scope.slogan = Auth.getCurrentUser().slogan

    $scope.isActive = function(route) {
      // if route === '/admin'
      return route === $location.path();
    };

    // angular.element(document).ready(function() {
    //   var controllerElement = document.querySelector('slogan');
    //   var controllerScope = angular.element(controllerElement).scope();
    //   $scope.slogan = controllerScope.sloganName
    //   console.log('controllerScope: ', controllerScope.teamSlogan);
    // });

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

  })