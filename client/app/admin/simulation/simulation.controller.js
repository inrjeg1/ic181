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
      console.log('economies: ', economies)
    });

    $scope.$watch('chartData', function (data) {
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
            symbol: 'circle',
            enabled: data[i].marker,
            radius: 6,
            states: {
              hover: {
                enabled: data[i].hover
              }
            }
          },
          lineWidth: '3px',
          states: {
            hover: {
              enabled: data[i].hover,
              lineWidth: '3px'
            }
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
      $http.get('/api/economy/').success(function (economies) {
        for (var i in economies) {
          if (economies[i].code != 'control') {
            for (var j in economies[i].data) {
              if (j == round) {
                console.log('round: ', round)
                console.log('j: ', j)
                var random = Math.random() + 1 ;
                random *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
                var multiplier = newValue * random
                economies[i].data[j] = multiplier;
              }
            }
            console.log('formule: ', $scope.chartData)
          } else {
            for (var m in economies[i].data) {
              if (m == round) {
                economies[i].data[m] = Number(newValue)
              }
            }
          }
          $scope.chartData = economies;
          var updated = economies
          $http.put('/api/economy/' + updated[i]._id, updated[i]);
        }
      });
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        xAxis: {
            categories: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7', 'Round 8']
        },
        colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'],
        plotOptions: {
          series: {
              cursor: 'ns-resize',
              point: {
                  events: {
                      drag: function (e) {
                          if (this.series.name == 'Control') {
                            // $scope.drag = this.category;
                            console.log('1: ', this.series.data.indexOf(this.point))
                            console.log('2: ', this.series.data)
                            console.log('3: ', this)
                            $scope.drag = this.series.data.indexOf(this)
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






