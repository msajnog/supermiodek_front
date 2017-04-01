'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:EditOrderCtrl
 * @description
 * # EditOrderCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('EditOrderCtrl', ['$scope', 'orderService', 'productService', '$stateParams', 'RESOURCES',
    function($scope, orderService, productService, $stateParams, RESOURCES) {
        $scope.product = {};
        $scope.domain = RESOURCES.domain;

        productService.get(function(response) {
            if (response.data) {
                $scope.products = response.data;

                orderService.getOne({id: $stateParams.id}, function(response) {
                    if (response.data) {
                        $scope.order = response.data;

                        $scope.products.forEach(function(product) {
                            $scope.order.products.forEach(function(orderProduct) {
                                if (product._id === orderProduct.id) {
                                    product.quantity = orderProduct.quantity;
                                }
                            });
                        });
                    }
                });
            }
        });

        
    }]);
