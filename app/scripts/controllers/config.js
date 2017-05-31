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

        $scope.config = {
            statuses: [
                { name: 'Nowe'},
                { name: 'Przyjęte' },
                { name: 'W trakcie realizacji' },
                { name: 'Zakończone'}
            ],
            shipmentMethods: [
                {
                    name: 'Kurier',
                    price: 13.00
                },
                {
                    name: 'Poczta Polska',
                    price: 8.50
                }
            ],
            payment: {
                name: 'Jan Kowalski',
                address: {
                    street: 'Warszawska',
                    buildingNumber: '23',
                    flatNumber: '12',
                    postalCode: '22-600',
                    city: 'Lublin'
                },
                account: '1234 1234 1234 1234 1234'
            }
        };

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

        $scope.logChanged = function () {
            console.log('statuses', $scope.config.statuses);
            console.log('shipmentMethods', $scope.config.shipmentMethods);
        };

        $scope.saveConfig = function () {
            console.log('saveConfig');
            configService.save($scope.config, function (response) {
                console.log('save response', response);
            });
        };
    }]);
