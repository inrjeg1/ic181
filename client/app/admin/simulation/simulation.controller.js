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

    $scope.drop = 'drop feedback';
    $scope.round = '0'
    $scope.serieName = 'nothing changed yet'
    $scope.chartData = ''
    $scope.controlEconomy = ''
    $scope.serieData = []

    $http.get('/api/economy').success(function (economies) {
      $scope.chartData = economies
      for (var i=0;i<economies.length;i++) {
        for (var item in economies[i]) {
          if (economies[i].code == 'control') {
            console.log(economies[i].control)
          }
        }
      }
      if ($scope.serieName = 'Control') {
        $scope.serieData = economies[0].control
      }
    })

    // $scope.updateGdp = function(newValue) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    $scope.$watch('serieData', function (data) {
        var chart = [{
          "name": "Control", 
          "data": data,
          "color": "grey",
          "draggableY": true,
          "marker": {
            "radius": 6
          },
          "stickyTracking": false
        }];
        $scope.chartConfig.series = chart;
     }, true);

    // $scope.$watch('chartData', function (data) {
    //     for (var i;i<data.length;i++) {
    //       for (key in data[i]) {
    //         if (key == 'control') {
    //           $scope.controlEconomy = data[i];
    //           $scope.chartData.splice(i, 1)
    //           console.log('chartData: ', $scope.chartData);
    //         }
    //       }
    //     }
    //     var chart = [{
    //       "name": "Control", 
    //       "data": data,
    //       "color": "grey",
    //       "draggableY": true,
    //       "marker": {
    //         "radius": 6
    //       },
    //       "stickyTracking": false
    //     }];
    //     $scope.chartConfig.series = chart;
    // }, true);

    // listen for the drop event when changing the control chart
    $scope.$watch('drop', function (newValue) {
      // var serieName = $scope.serieData
      var oldSerie = $scope.serieData
      var newSerie = []
      // update serie data with new value
      for (var i = 0; i < oldSerie.length; i++) {
        if (i == $scope.round) {
          newSerie.push(Number(newValue))
        } else {
          newSerie.push(oldSerie[i])
        }
      }
      // console.log('serieName: ', serieName)
      $scope.serieData = newSerie
      $scope.serieData
      // add Series to chart: can only be pushed if there is an array...
      $scope.chartConfig.series.push({
        name: 'test',
        data: [2.0, 3.9, 3.4, 4.2, 5.0, 4.9, 3.6, 2.5]
      })
    })

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
                      drop: function () {
                          $scope.drop = Highcharts.numberFormat(this.y, 2);
                          $scope.round = this.category
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