'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('ShopCtrl', ['$scope', 'productService', 'RESOURCES', function($scope, productService, RESOURCES) {
        $scope.domain = RESOURCES.domain;

        productService.get({status: '1'}, function(response) {
            if (response.data) {
                $scope.products = response.data;
                $scope.order = {
                    products: []
                };

                $scope.products.forEach(function(element) {
                    element.quantity = 0;
                    $scope.order.products.push(element);
                });

                $scope.order.total = 0;
            }
        });

        var calculateTotal = function() {
            $scope.order.total = 0;
            $scope.order.products.forEach(function(el) {
                $scope.order.total += el.quantity * parseFloat(el.price);
            });
        }


        $scope.increase = function(id) {
            var product = $scope.order.products.find(function(product) {
                return product._id === id;
            });

            if(product.quantity < product.availability) {
                product.quantity += 1;
                $scope.checkProducts();
            }

            calculateTotal();
        };

        $scope.decrease = function(id) {
            var product = $scope.order.products.find(function(product) {
                return product._id === id;
            });

            if (product.quantity > 0) {
                product.quantity -= 1;
            }

            $scope.checkProducts();
            calculateTotal();
        };

        $scope.checkProducts = function(id) {
            $scope.productsRequired = true;

            $scope.order.products.forEach(function(element) {
                if (element.quantity > 0) {
                    $scope.productsRequired = false;
                    return;
                }
            });

            if(id) {
                checkQty(id);
            }
        };

        var checkQty = function(id) {
            var product = $scope.order.products.find(function(product) {
                return product._id === id;
            });

            if(product.quantity > product.availability) {
                product.quantity = product.availability;
            }

            calculateTotal();
        }

        $scope.placeOrder = function() {
            console.log($scope.placeOrderForm.$valid);
            console.log($scope.order);

            // $scope.order.products = $scope.order.products.find(function(product) {
            //     return product.quantity > 0;
            // });

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
