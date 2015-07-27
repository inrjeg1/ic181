'use strict';

angular.module('atrExpApp')
  .controller('MadeOffersCtrl', function ($scope, $modal, $http) {

    

    
    

    // load selected offer in modal
    $scope.showOffer = function(selectedOffer) {
      $scope.selected = selectedOffer     
      }
      
      
      

        //$http.get('/api/customer/' + $scope.selected.customer_id)
        //.success(function(stuff){$scope.offercust = stuff})
        //.error(function(err){alert(err)})
        
        
       


           
      


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

    $scope.open = function (size) {
      // open modal and load tpl
      

      $http.get('/api/customer/' + $scope.selected.customer_id)
        .success(function(stuff){$scope.offercust = stuff


      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/madeoffers/tpl/adjust-offer-decision.html',
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
  })

.controller('AdjustOfferInstanceCtrl', function ($scope, $modalInstance, selectedOffer, $http, offerCustomer) {
    // re-add selectedOffer to $scope.selected
    $scope.selected = selectedOffer;
    $scope.offercust = offerCustomer;

    $scope.closeModal = function () {
      $modalInstance.dismiss('close');
    };
  
    //add offer
    $scope.addOffer = function() {
      
      console.log($scope.selected)
      var thisoffer = {team: "Test", customer: $scope.selected.customer_name, price: 20, riskacceptance: 90}
      console.log(thisoffer)

    
      $http.post('/api/offer', thisoffer)
           .success(function(data){alert("success")})
           .error(function(err){alert(err)});
      
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

.controller('SpinnerCtrl', SpinnerCtrl)
      .directive('jqSpinner', jqSpinner);

  function SpinnerCtrl() {
      var spinner = this;
      spinner.val = 0;
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

