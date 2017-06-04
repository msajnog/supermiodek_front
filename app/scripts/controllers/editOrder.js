'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:EditOrderCtrl
 * @description
 * # EditOrderCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('EditOrderCtrl', ['$scope', 'orderService', 'productService', 'configService', '$stateParams', 'RESOURCES',
        function ($scope, orderService, productService, configService, $stateParams, RESOURCES) {
            $scope.product = {};
            $scope.domain = RESOURCES.domain;

            configService.get(function (res) {
                $scope.config = res.data;
                $scope.statuses = res.data.statuses;
                $scope.shipmentMethods = res.data.shipmentMethods;
            });

            productService.get(function (response) {
                if (response.data) {
                    $scope.products = response.data;

                    orderService.getOne({id: $stateParams.id}, function (response) {
                        if (response.data) {
                            $scope.order = response.data;

                            $scope.selectedStatus = $scope.order.status.filter(function (status) {
                                return status.selected === true;
                            })[0];

                            $scope.selectedShipment = $scope.order.shipments.filter(function (method) {
                                return method.selected === true;
                            })[0];

                            $scope.products.forEach(function (product) {
                                product.quantity = 0;

                                $scope.order.products.forEach(function (orderProduct) {
                                    if (product._id === orderProduct.id) {
                                        product.quantity = orderProduct.quantity;
                                    }
                                });
                            });
                        }
                    });
                }
            });

            $scope.statusChanged = function () {
                $scope.order.status.forEach(function (status) {
                    status.selected = status === $scope.selectedStatus;
                });
            };

            $scope.shipmentMethodChanged = function () {
                $scope.order.shipments.forEach(function (method) {
                    method.selected = method === $scope.selectedShipment;
                });
            };

            var calculateTotal = function () {
                $scope.order.total = 0;
                $scope.order.products.forEach(function (el) {
                    $scope.order.total += el.quantity * parseFloat(el.price);
                    $scope.order.productsTotal = $scope.order.total;
                });


                if ($scope.order.shipment && Object.keys($scope.order.shipment).length) {
                    $scope.order.total += $scope.order.shipment.price;
                }
            };

            var checkQty = function (id) {
                var product = $scope.products.find(function (product) {
                    return product._id === id;
                });

                if (product.quantity > product.availability) {
                    product.quantity = product.availability;
                }

                calculateTotal();
            };

            $scope.checkProducts = function (id) {
                $scope.productsRequired = true;

                $scope.order.products.forEach(function (element) {
                    if (element.quantity > 0) {
                        $scope.productsRequired = false;
                        return;
                    }
                });

                if (id) {
                    checkQty(id);
                }
            };

            $scope.increase = function (id) {
                var product = $scope.products.find(function (product) {
                    return product._id === id;
                });

                if (!product) {
                    return;
                }

                if (product.quantity < product.availability) {
                    product.quantity += 1;
                    $scope.checkProducts();
                }

                calculateTotal();
            };

            $scope.decrease = function (id) {
                var product = $scope.products.find(function (product) {
                    return product._id === id;
                });

                if (!product) {
                    return;
                }

                if (product.quantity > 0) {
                    product.quantity -= 1;
                }

                $scope.order.products = $scope.order.products.filter(function (item) {
                    return item.quantity > 0;
                });

                $scope.checkProducts();
                calculateTotal();
            };

            $scope.editOrder = function () {
                $scope.products.forEach(function (product) {
                    $scope.order.products.forEach(function (orderProduct) {
                        if (product._id === orderProduct.id) {
                            orderProduct.quantity = product.quantity;
                        }
                    });
                });

                orderService.update({id: $scope.order._id}, $scope.order, function (response) {
                    alert(response.message);
                });
            };
        }]);
