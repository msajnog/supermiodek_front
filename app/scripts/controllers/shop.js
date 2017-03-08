'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
.controller('ShopCtrl',['$scope', 'productService', 'MEDIA', function ($scope, productService, MEDIA) {
    $scope.media_path = MEDIA.url;

    productService.get(function(response) {
        if (response.data) {
            $scope.products = response.data;
            $scope.order = {
                products: []
            };

            $scope.products.forEach(function (element) {
                element.quantity = 0;
                $scope.order.products.push(element);
            });
        }
    });


  $scope.increase = function (id) {
    var product = $scope.order.products.find(function (product) {
      return product.id === id;
    });

    product.quantity += 1;
    $scope.checkProducts();
  };

  $scope.decrease = function (id) {
      var product = $scope.order.products.find(function (product) {
          return product.id === id;
      });

      if (product.quantity > 0) {
          product.quantity -= 1;
      }

      $scope.checkProducts();
  };

  $scope.checkProducts = function () {
      $scope.productsRequired = true;

      $scope.order.products.forEach(function (element) {
          if (element.quantity > 0) {
              $scope.productsRequired = false;
              return;
          }
      });
  };

  $scope.placeOrder = function () {
      console.log($scope.placeOrderForm.$valid);
      console.log($scope.order);

      if (!$scope.placeOrderForm.$valid) {
          $scope.formInvalid = true;
          return;
      } else {
          $scope.formInvalid = false;
      }

      $scope.checkProducts();

      if ($scope.productsRequired) {
          return;
      }
  };

}]);
