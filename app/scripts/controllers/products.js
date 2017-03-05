'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
  .controller('ProductsCtrl', ['$scope', function ($scope) {
    $scope.products = [
        {
            id: 1,
            name: 'Akacjowo-Malinowy',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            price: 19.99,
            image: 'product1.jpg'
        },
        {
            id: 2,
            name: 'Lipowo-Spadziowy',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            price: 18.99,
            image: 'product2.jpg'
        },
        {
            id: 3,
            name: 'Spadź liściasta',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            price: 17.99,
            image: 'product1.jpg'
        },
        {
            id: 4,
            name: 'Wielokwiatowy',
            shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit,',
            price: 16.99,
            image: 'product2.jpg'
        },
    ];
}]);
