'use strict';

/**
 * @ngdoc function
 * @name filmwebFrontApp.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller of the filmwebFrontApp
 */
angular.module('supermiodek')
    .controller('ConfigCtrl', ['$scope', 'configService', function ($scope, configService) {
        configService.get(function(res) {
            $scope.config = res.data;
        });

        $scope.removeStatus = function (idx) {
            $scope.config.statuses.splice(idx, 1);
        };

        $scope.addStatus = function () {
            $scope.config.statuses.push({name: ''});
        };

        $scope.removeShipmentMethod = function (idx) {
            $scope.config.shipmentMethods.splice(idx, 1);
        };

        $scope.addShipmentMethod = function () {
            $scope.config.shipmentMethods.push({name: '', price: null});
        };

        $scope.saveConfig = function () {
            configService.update({id: $scope.config._id}, $scope.config, function(res) {
                alert(res.message);
            });
        };
    }]);
