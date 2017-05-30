'use strict';

/**
 * @ngdoc function
 * @name filmwebFrontApp.controller:ConfigCtrl
 * @description
 * # ConfigCtrl
 * Controller of the filmwebFrontApp
 */
angular.module('supermiodek')
    .controller('ConfigCtrl', ['$scope', function ($scope) {

        $scope.statuses = ['Nowe', 'Przyjęte', 'W trakcie realizacji', 'Zakończone'];

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

        $scope.payment = {
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

    }]);
