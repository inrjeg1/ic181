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

    $scope.chartData = [];
    $scope.drag = 'drag';
    $scope.drop = 'drop';
    
    $http.get('/api/economy').success(function (economies) {
      $scope.chartData = economies;
      console.log('GET')
    });

    $scope.$watch('chartData', function (data) {
      // var charts = []
      // for (var i in data) {
      //   var chart = {
      //     "name": data[i].name,
      //     "data": data[i].data,
      //     "color": data[i].color,
      //     "draggableY": data[i].draggableY,
      //     "type": data[i].type,
      //     "marker": {
      //       "radius": 6
      //     },
      //     "stickyTracking": false
      //   };
      //   charts.push(chart)
      // }
      data = $scope.chartData
      console.log('data: ', data)
      $scope.chartConfig.series = []
      for (var i in data) {
        $scope.chartConfig.series.push({
          name: data[i].name,
          data: data[i].data,
          color: data[i].color,
          draggableY: data[i].draggableY,
          type: data[i].type,
          marker: {
            radius: 6
          },
          stickyTracking: false
        });
      }
    }, true);

    $scope.$watch('drag', function (round) {
      $scope.drag = round;
    });

    $scope.$watch('drop', function (newValue) {
      $http.get('/api/economy').success(function (economies) {
        var round = $scope.drag;
        var serie = economies[0].data;
        var oldValue = serie[round];
        var index = serie.indexOf(oldValue);
        if (index !== -1) {
            serie[index] = Number(newValue);
        };
        var updated = economies[0];
        $http.put('/api/economy/' + updated._id, updated);
        $scope.updateChart(round, newValue);
      })
    });

    $scope.updateChart = function (round, newValue) {
      console.log('chartData: ', $scope.chartData)
      for (var i in $scope.chartData) {
        if ($scope.chartData[i].code != 'control') {
          for (var j in $scope.chartData[i].data) {
            if (j == round) {
              console.log('round: ', round)
              console.log('j: ', j)
              var random = Math.random() + 1 ;
              random *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
              var multiplier = newValue * random
              $scope.chartData[i].data[j] = multiplier;
            }
          }
        } else {
          for (var m in $scope.chartData[i].data) {
            if (m == round) {
              $scope.chartData[i].data[m] = Number(newValue)
            }
          }
        }
      }
    };

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
                          if (this.series.name == 'Control') {
                            $scope.drag = this.category;
                            $scope.$apply();
                          }
                      },
                      drop: function () {
                          if (this.series.name == 'Control') {
                            $scope.drop = Highcharts.numberFormat(this.y, 2);
                            $scope.serieName = this.series.name
                            $scope.$apply();
                          }
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
      series: [], 
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






