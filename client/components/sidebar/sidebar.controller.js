'use strict';

angular.module('atrExpApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth, settings) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
      'icon': 'dashboard'
    },{
      'title': 'Market',
      'link': '/market',
      'icon': 'globe'
    },{
      'title': 'Offers',
      'link': '/madeoffers',
      'icon': 'briefcase'
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
    $scope.slogan = settings.slogan;

    $scope.$watch('slogan.length', function (newValue, oldValue) {
      if (newValue !== oldValue)
        $scope.slogan = settings.slogan
    }, true);  
    
  })
