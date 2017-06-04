'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('OrdersCtrl', ['$scope', 'orderService',
        function ($scope, orderService) {
            orderService.get(function (response) {
                $scope.orders = response.data;
            });

            $scope.propertyName = 'date';
            $scope.reverse = false;

            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };

            $scope.remove = function (id, idx) {
                if (confirm('Czy jesteś pewny?')) {
                    orderService.remove({id: id}, function (res) {
                        $scope.orders = $scope.orders.filter(function (product) {
                            return product._id !== id;
                        });
                    });
                }
            };
        }]);
