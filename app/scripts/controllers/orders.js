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
            console.log(response);
            $scope.orders = response.data;
        });
    }]);
