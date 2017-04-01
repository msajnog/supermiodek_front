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
    function($scope, orderService) {
        orderService.get(function(response) {
            $scope.orders = response.data;
        });

        $scope.remove = function(id, idx) {
            if(confirm('Czy jesteś pewny?')) {
                orderService.remove({id: id}, function(res) {
                    $scope.orders.splice(idx, 1);
                    alert(res.message);
                });
            }
        };
    }]);
