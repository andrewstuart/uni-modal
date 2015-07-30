/**
 * @ngdoc directive
 * @name uniModal.directive:modal
 * @param {Boolean} shown Whether or not the modal dialog should be hidden via the
 * "hidden" class. Implementation of this class is up to the consumer.
 * @param {Function} [modalHide] An optional method to be called any time the modal dialog is
 * hidden
 * @param {Function} [modalShow] An optional method to be called any time the modal dialog is
 * unhidden
 * @description
 * Appends a global hider with class 'modal-hider' (style it yourself) and
 * shows the content inside the `<modal>` element
 */
angular.module('uni', [])
.directive('modal', function ($document) {
    'use strict';

    return {
        template: '<ng-transclude></ng-transclude>',
        transclude: true,
        restrict: 'E',
        scope: {
            shown: '=',
            modalHide: '&?',
            modalShow: '&?'
        },
        link: function postLink($scope, iEle) {
            iEle.addClass('hidden');
            var modalHider = angular.element('<div class="modal-hider"></div>');

            var hasBeenShown;

            $scope.$watch('shown', function(shown) {

                if(shown) {
                    hasBeenShown = true;

                    iEle.removeClass('hidden');
                    modalHider.on('click', function() {
                        //Apparently $scope.$apply can't wrap the function passed to on()
                        $scope.$apply(function() {
                            $scope.shown = !$scope.shown;
                        });
                    });

                    angular.element($document.body).append(modalHider);

                    if($scope.modalShow) {
                        $scope.modalShow();
                    }
                } else {
                    iEle.addClass('hidden');

                    if(hasBeenShown && $scope.modalHide) {
                        $scope.modalHide();
                    }

                    if(modalHider) {
                        modalHider.remove();
                    }
                }
            });
        }
    };
});
