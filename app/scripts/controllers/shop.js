'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
  .controller('ShopCtrl',['$scope', function ($scope) {

      $scope.products = [
          {
              id: 14,
              name: 'Akacjowo-Malinowy',
              shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              price: 19.99,
              image: 'product1.jpg'
          },
          {
              id: 88,
              name: 'Lipowo-Spadziowy',
              shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              price: 18.99,
              image: 'product2.jpg'
          },
          {
              id: 9,
              name: 'Spadź liściasta',
              shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              price: 17.99,
              image: 'product1.jpg'
          },
          {
              id: 45,
              name: 'Wielokwiatowy',
              shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
              price: 16.99,
              image: 'product2.jpg'
          }
      ];

      $scope.order = {
          products: []
      };

      $scope.products.forEach(function (element) {
          element.quantity = 0;
          $scope.order.products.push(element);
      });

      $scope.increase = function (id) {
          var product = $scope.order.products.find(function (product) {
              return product.id === id;
          });

          product.quantity += 1;
      };

      $scope.decrease = function (id) {
          var product = $scope.order.products.find(function (product) {
              return product.id === id;
          });

          if (product.quantity > 0) {
              product.quantity -= 1;
          }
      };

      $scope.placeOrder = function () {
          console.log($scope.placeOrderForm.$valid);
          console.log($scope.order);
      };

  }]);
