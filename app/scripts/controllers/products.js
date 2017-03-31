'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('ProductsCtrl', ['$scope', 'productService', 'saveProductService', 'FileUploader', 'RESOURCES',
     function($scope, productService, saveProductService, FileUploader, RESOURCES) {
        $scope.product = {};
        $scope.domain = RESOURCES.domain;

        productService.get(function(response) {
            if (response.data) {
                $scope.products = response.data;
            }
        });

        $scope.remove = function(id, idx) {
            if(confirm('Czy jesteś pewny?')) {
                productService.remove({id: id}, function(res) {
                    $scope.products.splice(idx, 1);
                    alert(res.message);
                });
            }
        };

        $scope.uploader = new FileUploader({
            queueLimit: 1,
            url: RESOURCES.api + 'upload/',
        });

        $scope.removeItem = function() {
            $scope.uploader.queue[0].remove();
            angular.element("input[type='file']").val('');
        };

        $scope.saveProduct = function() {
            $scope.submitSuccess = false;
            var file = $scope.uploader.queue[0];

            if (!$scope.addProductForm.$valid) {
                $scope.formInvalid = true;
                return;
            } else {
                $scope.formInvalid = false;
            }

            if (file) {
                $scope.uploader.queue[0].upload();
                $scope.imageInvalid = false;
            } else {
                $scope.imageInvalid = true;
                return;
            }

            $scope.uploader.onError = function(err) {
                return;
            };

            $scope.uploader.onSuccessItem = function(item, response, status, headers) {
                if (response.status) {
                    $scope.product.image = response.path;

                    saveProductService.save($scope.product, function(response) {
                        $scope.product = {};
                        $scope.removeItem();

                        $scope.submitSuccess = true;
                        $scope.successMessage = response.message;
                        $scope.addProductForm.$setPristine();
                    });
                }
            };
        };
    }]);
