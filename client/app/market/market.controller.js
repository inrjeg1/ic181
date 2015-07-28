'use strict';

angular.module('atrExpApp')
.controller('AdjustOfferInstanceCtrl', function ($scope, $modalInstance, selectedOffer, $http, offerCustomer) {
    // re-add selectedOffer to $scope.selected
    $scope.selected = selectedOffer;
    $scope.offercust = offerCustomer;

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };
  
    //add offer
    $scope.adjustOffer = function() {
      
      console.log($scope.selected)
      var thisoffer = {team: "Test", customer: $scope.selected.customer_name, price: 20, riskacceptance: 90}
      console.log(thisoffer)

    
      $http.post('/api/offer', thisoffer)
           .success(function(data){alert("success")})
           .error(function(err){alert(err)});
      
      $scope.LoadMadeOffersCtrl().offers.push(thisoffer)

      $scope.closeModal()    
      };
})

.controller('LoadMadeOffersCtrl', function LoadMadeOffersCtrl($resource) {
    var vm = this;
    
    // fetch data with $resource
    $resource('/api/offer').query().$promise.then(function(offers) {
        vm.offers = offers;
    });


})

  .controller('MarketCtrl', function ($scope, $modal, $http) {
    

        // load selected customer in modal
    $scope.showCustomer = function(cust) {
      $scope.selected = cust
    };

    $scope.showOffer = function(selectedOffer) {
      $scope.selected = selectedOffer     
      }        

    // modal backdrop animation
    $scope.animationsEnabled = true

    $scope.deleteoffer = function(selectedOffer){
      $scope.selected = selectedOffer;
      $http.delete('/api/offer/' + $scope.selected._id)
        .success(function(){
          alert("success");
        })
        .error(function(err){alert(err)});
    }

    $scope.amendoffer = function (size) {
      // open modal and load tpl
      

      $http.get('/api/customer/' + $scope.selected.customer_id)
        .success(function(stuff){$scope.offercust = stuff


      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-offer-decision.html',
        controller: 'AdjustOfferInstanceCtrl',
        size: size,
        resolve: {
          selectedOffer: function () {
            return $scope.selected;
          },
          offerCustomer: function () {
            return $scope.offercust;
          }
        }
      })}).error(function(err){alert(err)});
      // add selected offer to $scope.selected
      modalInstance.result.then(function (selectedOffer, $scope, offerCustomer) {
        $scope.selected = selectedOffer;
        $scope.offercust = offerCustomer;
      })
    };



    $scope.open = function (size) {
      // open modal and load tpl
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/market/tpl/modal-customer-decision.html',
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

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, selectedCustomer, $http, Auth){

    // re-add selectedCustomer to $scope.selected
    $scope.selected = selectedCustomer;
    $scope.thisoffer = {};
    $scope.team = Auth.getCurrentUser;

    
    // $scope.ok = function () {
    //   $modalInstance.close($scope.selected.item);
    // };

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };
  
    //add offer
    $scope.addOffer = function() {
      
      console.log($scope.selected)
      $scope.thisoffer = {
        team: $scope.team().name,
        customer_id: $scope.selected._id, 
        customer_name: $scope.selected.name, 
        price: 20,
        riskacceptance: 90 
      }

      console.log($scope.thisoffer)
    
      $http.post('/api/offer', $scope.thisoffer)
           .success(function(data){alert("success")})
           .error(function(err){alert(err)});   
      
      $scope.closeModal()    
      };
})

.controller('LoadMarketCtrl', function LoadMarketCtrl($resource) {
    var vm = this;
    // fetch data with $resource
    $resource('/api/customer').query().$promise.then(function(customers) {
        vm.customers = customers;
    });
})

.controller('SpinnerCtrl', SpinnerCtrl)
      .directive('jqSpinner', jqSpinner);



  function SpinnerCtrl() {
      var spinner = this;
      spinner.val = 0;
      //spinner.val = 90
  };

  function jqSpinner() {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, element, attrs, spinner) {
              element.spinner({
                  spin: function (event, ui) {
                      spinner.$setViewValue(ui.value);
                  }
              });
          }
      };
  };

