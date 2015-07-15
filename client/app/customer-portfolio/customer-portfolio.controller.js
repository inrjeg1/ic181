'use strict';

angular.module('atrExpApp')

  .controller('CustomerPortfolioCtrl', function ($scope, $http, $modal, $log) {
    $http.get('/api/customer').success(function (customers) {
      console.log(customers)
      $scope.objects = customers
      $scope.totalItems = $scope.objects.length;
      $scope.currentPage = 1;
      $scope.numPerPage = 10;
      
      $scope.paginate = function(value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.objects.indexOf(value);
        return (begin <= index && index < end);
      };
    })

    $scope.showCustomer = function(cust) {
      console.log(cust)
      $scope.selected = cust
    }

    // $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.selected;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.selected = items;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });

  