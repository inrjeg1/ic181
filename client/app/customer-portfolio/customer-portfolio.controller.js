'use strict';

angular.module('atrExpApp')

  .controller('CustomerPortfolioCtrl', function ($scope, $modal, $log) {

    $scope.showCustomer = function(cust) {
      $scope.selected = cust
    }

    $scope.animationsEnabled = true

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/customer-portfolio/modal-customer-decision.html',
        // template: $templateCache.get('modal-customer-decision.html')
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
      }), function () {
        $log.info('Modal dismissed at: ' + new Date());
      };
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $templateCache) {

    // console.log($templateCache.get('./modal-customer-decision.html'))

    $scope.selected = items;

    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })

.controller('AngularWayCtrl', AngularWayCtrl);

function AngularWayCtrl($resource) {
    var vm = this;
    $resource('/api/customer').query().$promise.then(function(persons) {
        vm.persons = persons;
    });
}

  