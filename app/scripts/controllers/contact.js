'use strict';

angular.module('supermiodek')
    .controller('ContactCtrl', ['$scope', 'contactService', function($scope, contactService) {
        $scope.contact = {
            email: '',
            name: '',
            subject: '',
            content: '',
            sendCopy: false
        };

        $scope.sendQuestion = function() {
            console.log($scope);

            contactService.send($scope.contact, function(res) {
                console.log('response', res);
            })
        };
    }]);
