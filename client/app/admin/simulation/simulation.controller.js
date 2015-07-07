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


    // BREAK

    $scope.chartData = 'chartData';
    $scope.drag = 0;
    $scope.drop = 'drop';
    
    $http.get('/api/economy').success(function (economies) {
      $scope.chartData = economies;
    });

    $scope.$watch('chartData', function (data) {
      var chart = [{
        "name": "Control",
        "data": data[0].control,
        "color": "grey",
        "draggableY": true,
        "marker": {
          "radius": 6
        },
        "stickyTracking": false
      }];
      $scope.chartConfig.series = chart;
    }, true);

    $scope.$watch('drag', function (round) {
      $scope.drag = round;
    });

    $scope.$watch('drop', function (newValue) {
      var round = $scope.drag;
      var serie = $scope.chartData[0].control;
      var oldValue = serie[round];
      var index = serie.indexOf(oldValue);
      if (index !== -1) {
          serie[index] = Number(newValue);
      };
      var chart = $scope.chartData[0];
      console.log(chart)
      $http.put('/api/economy/' + $scope.chartData[0]._id, chart).success(function () {
        console.log('$scope.chartData[0]: ', $scope.chartData[0]);
        console.log('** updated!!!');
      });
    });


    // $scope.drop = 'drop feedback';
    // $scope.round = '0'
    // $scope.serieName = 'nothing changed yet'
    // $scope.chartData = ''
    // $scope.controlEconomy = ''
    // $scope.serieData = []


    $scope.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        plotOptions: {
          series: {
              cursor: 'ns-resize',
              point: {
                  events: {
                      drag: function (e) {
                          $scope.drag = this.category;
                          $scope.$apply();
                      },
                      drop: function () {
                          $scope.drop = Highcharts.numberFormat(this.y, 2);
                          $scope.serieName = this.series.name
                          $scope.$apply();
                      }
                  }
              },
              stickyTracking: false
          },
          column: {
              stacking: 'normal'
          }
        }
      },
      series: null, 
      title: {
        text: 'Hello'
      },
      credits: {
        enabled: false
      },
      loading: false,
      size: {}
    }
});