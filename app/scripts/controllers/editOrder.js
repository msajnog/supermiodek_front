'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:EditOrderCtrl
 * @description
 * # EditOrderCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('EditOrderCtrl', ['$scope', 'orderService', '$stateParams',
    function($scope, orderService, $stateParams) {
        $scope.product = {};

        orderService.getOne({id: $stateParams.id}, function(response) {
            if (response.data) {
                $scope.order = response.data;
            }
        });

    }]);
