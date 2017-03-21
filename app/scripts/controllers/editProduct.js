'use strict';

/**
 * @ngdoc function
 * @name supermiodek.controller:EditProductCtrl
 * @description
 * # EditProductCtrl
 * Controller of the supermiodek
 */
angular.module('supermiodek')
    .controller('EditProductCtrl', ['$scope', 'productService', 'saveProductService', 'FileUploader', '$stateParams', 'RESOURCES',
    function($scope, productService, saveProductService, FileUploader, $stateParams, RESOURCES) {
        $scope.product = {};
        $scope.domain = RESOURCES.domain;

        productService.getOne({id: $stateParams.id}, function(response) {
            if (response.data) {
                $scope.product = response.data;
            }
        });

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

            if (!$scope.editProductForm.$valid) {
                $scope.formInvalid = true;
                return;
            } else {
                $scope.formInvalid = false;
            }

            var saveRequest = function () {
                console.log($scope.product);
                productService.update({id: $scope.product._id}, $scope.product, function(response) {
                    // $scope.product = {};
                    console.log(response);

                    $scope.submitSuccess = true;
                    $scope.successMessage = response.message;
                    $scope.editProductForm.$setPristine();
                });
            };

            $scope.uploader.onError = function(err) {
                return;
            };

            if (file) {
                $scope.uploader.queue[0].upload();
                $scope.uploader.onSuccessItem = function(item, response, status, headers) {
                    if (response.status) {
                        $scope.product.image = response.path;

                        saveRequest();
                        $scope.removeItem();
                    }
                };
            } else {
                saveRequest();
            }
        };
    }]);
