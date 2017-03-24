'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('ShopCtrl', ['$scope', 'productService', 'ngDialog', 'RESOURCES',
     function($scope, productService, ngDialog, RESOURCES) {
        $scope.domain = RESOURCES.domain;
        $scope.shipmentMethods = [
            {
                _id: 1,
                name: 'Kurier',
                price: 13.00
            },
            {
                _id: 2,
                name: 'Poczta Polska',
                price: 8.50
            }
        ];

        productService.get({status: '1'}, function(response) {
            if (response.data) {
                $scope.products = response.data;
                $scope.order = {
                    products: []
                };

                $scope.products.forEach(function(element) {
                    element.quantity = 0;
                    // $scope.order.products.push(element);
                });

                $scope.order.total = 0;
            }
        });

        var calculateTotal = function() {
            $scope.order.total = 0;
            $scope.order.products.forEach(function(el) {
                $scope.order.total += el.quantity * parseFloat(el.price);
                $scope.order.productsTotal = $scope.order.total;
            });

            if ($scope.order.shipment) {
                $scope.order.total += $scope.order.shipment.price;
            }
        };


        $scope.increase = function(id) {
            var product = $scope.order.products.find(function(product) {
                return product._id === id;
            });

            if(!product) {
                product = $scope.products.find(function(product) {
                    return product._id === id;
                });

                $scope.order.products.push(product);
            }

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

            if(!product) {
                return;
            }

            if (product.quantity > 0) {
                product.quantity -= 1;
            }

            $scope.order.products = $scope.order.products.filter(function(item) {
                return item.quantity > 0;
            });

            $scope.checkProducts();
            calculateTotal();
        };

        $scope.chooseShipmentMethod = function (id) {
            var choosedMethod = $scope.shipmentMethods.find(function (el) {
                return el._id === id;
            });

            $scope.order.shipment = choosedMethod;
            calculateTotal();
            console.log($scope.order);
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
        };

        var confirmOrder = function () {
            ngDialog.open({
                template: 'shopConfirm',
                className: 'ngdialog ngdialog-theme-default order-confirmation',
                scope: $scope
            });
        };

        $scope.placeOrder = function() {
            console.log($scope.placeOrderForm.$valid);
            console.log($scope.order);

            // order only products where qty is greater than 0
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

            confirmOrder();
        };

    }]);
