'use strict';

angular.module('atrExpApp')

  .controller('CustomerPortfolioCtrl', function ($scope, $modal) {

    // load selected customer in modal
    $scope.showCustomer = function(cust) {
      $scope.selected = cust
    }

    // modal backdrop animation
    $scope.animationsEnabled = true

    $scope.open = function (size) {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/customer-portfolio/tpl/modal-customer-decision.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          selectedCustomer: function () {
            return $scope.selected;
          }
        }
      });
      // add selected customer to $scope.selected
      modalInstance.result.then(function (selectedCustomer) {
        $scope.selected = selectedCustomer;
      })
    };
  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer) {
    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };
  })

.controller('LoadCustomersCtrl', function LoadCustomersCtrl($resource) {
    var vm = this;
    // fetch data with $resource
    $resource('/api/customer').query().$promise.then(function(customers) {
        vm.customers = customers;
    });
})
