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
      console.log(data)
      var charts = []
      for (var i in data) {
        var chart = {
          "name": data[i].name,
          "data": data[i].control,
          "color": data[i].color,
          "draggableY": data[i].draggableY,
          "marker": {
            "radius": 6
          },
          "stickyTracking": false
        };
        charts.push(chart)
      }
      $scope.chartConfig.series = charts;
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
      var updated = $scope.chartData[0];
      $http.put('/api/economy/' + updated._id, updated);
    });

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