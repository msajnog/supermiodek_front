'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
.controller('ProductsCtrl', ['$scope', 'productService', 'FileUploader', 'MEDIA', function ($scope, productService, FileUploader, MEDIA) {
    $scope.media_path = MEDIA.url;
    $scope.product = {};

    productService.get(function(response) {
        if (response.data) {
            $scope.products = response.data;
        }
    });

    $scope.uploader = new FileUploader({
        queueLimit: 1
    });

    $scope.saveProduct = function () {
        console.log($scope.product);

        if (!$scope.addProductForm.$valid) {
            $scope.formInvalid = true;
            return;
        } else {
            $scope.formInvalid = false;
        }
    };

}]);
