'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:EditProductCtrl
 * @description
 * # EditProductCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('EditProductCtrl', ['$scope', 'productService', 'FileUploader', '$stateParams', 'RESOURCES', function($scope, productService, FileUploader, $stateParams, RESOURCES) {
        $scope.product = {};
        $scope.domain = RESOURCES.domain;

        console.log($stateParams);

        productService.getOne({id: $stateParams.id}, function(response) {
            if (response.data) {
                $scope.product = response.data;

                console.log($scope.product);
            }
        });

        $scope.uploader = new FileUploader({
            queueLimit: 1,
            url: RESOURCES.api + 'upload/',
        });
    }]);
