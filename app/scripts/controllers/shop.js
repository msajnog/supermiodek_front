'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('ShopCtrl', ['$scope', 'productService', 'orderService', 'ngDialog', '$timeout', 'RESOURCES',
     function($scope, productService, orderService, ngDialog, $timeout, RESOURCES) {
        $scope.domain = RESOURCES.domain;
        $scope.shipmentMethods = [
            {
                _id: '1',
                name: 'Kurier',
                price: 13.00
            },
            {
                _id: '2',
                name: 'Poczta Polska',
                price: 8.50
            }
        ];

        $scope.submitSuccess = false;

        $scope.$watch('submitSuccess', function() {
            $timeout(function() {
                $scope.submitSuccess = false;
            }, 10000);
        });

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


            if ($scope.order.shipment && Object.keys($scope.order.shipment).length) {
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
            $scope.shipmentInvalid = false;
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
        };

        var openConfirmPopup = function () {
            ngDialog.open({
                template: 'shopConfirm',
                className: 'ngdialog ngdialog-theme-default order-confirmation',
                scope: $scope
            });
        };

        $scope.confirmOrder = function() {
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

            openConfirmPopup();
        };

        $scope.placeOrder = function () {
            $scope.successMessage = false;
            if(!$scope.order.shipment) {
                $scope.shipmentInvalid = true;
                return;
            }

            orderService.save($scope.order, function(response) {
                if (response.status) {
                    $scope.order.client = {};
                    $scope.order.products = [];
                    $scope.order.shipment = {};
                    $scope.order.total = 0;
                    $scope.order.productsTotal = 0;
                    $scope.products.forEach(function(product) {
                        product.quantity = 0;
                    });
                    $scope.placeOrderForm.$setPristine();
                    $scope.submitSuccess = true;
                    $scope.successMessage = response.message;
                    ngDialog.close();
                }
            });
        };
    }]);
