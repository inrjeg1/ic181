'use strict';

angular.module('atrExpApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.tweet = '';
    $scope.twCounter = 140;

    $scope.$watch('tweet', function (tweet) {
      $scope.twCounter = (140 - tweet.length)
    });

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.exampleData = [
       {
           "key": "Capital",
           "values": [[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8]]
       }
    ];

    $scope.xAxisTickFormatFunction = function(){
        return function(d){
            return d3.time.format('%b')(new Date(d));
        }
    }

    
  });
