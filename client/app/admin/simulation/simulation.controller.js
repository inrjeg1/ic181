'use strict';
angular.module('atrExpApp').controller('SimulationCtrl', function($scope, $http) {
    $scope.message = 'Hello';
    $scope.rounds = [0, 1.9, 1.4, 2.2, 3.0, 2.9, 1.6, 0.5];
    $scope.countries = [{
        name: 'The Netherlands',
        code: 'nl'
    }, {
        name: 'Germany',
        code: 'ge'
    }, {
        name: 'United Kingdom',
        code: 'uk'
    }];
    // $scope.addEconomy = function() {
    //   if($scope.newEconomy === '') {
    //     return;
    //   }
    //   $http.post('/api/economy', { 
    //     name: "Control", 
    //     code: "control", 
    //     control: $scope.newEconomy 
    //   });
    //   $scope.newEconomy = '';
    // };
    // $scope.showEconomy = function(gdp) {
    //   $http.get('/api/economy/' + gdp._id).success(function(economy) {
    //     console.log('economy: ', economy);
    //     $scope.econ = economy
    //   })
    // };

    $http.get('/api/economy').success(function (economies) {
      $scope.economy = economies;
    });

    $scope.$watch('gdp', function (economies) {
      // $scope.$apply(function() {
        $scope.economy = economies;
      // })
    });

    // $scope.change = function() {
    //   $scope.changed = 'changed'
    // }

    // $scope.updateEconomy = function(newEconomy) {
    //     $scope.economy = newEconomy;
    //     // console.log(newEconomy._id)
    //     $http.put('/api/economy/' + newEconomy._id, newEconomy).success(function(newEconomy) {
    //       // console.log('updated mongo -> newEconomy: ', newEconomy);
    //     })
    // }
});