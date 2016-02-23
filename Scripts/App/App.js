var AnnualReview = angular.module('AnnualReview', ['ui.bootstrap', 'ngRoute']);

AnnualReview
.controller('LayoutPage', ['$scope', '$timeout', 'Factory_CommonRoutines', 'Factory_Constants', LayoutPage])

function LayoutPage($scope, $timeout, CommonFactory, Constants) {
    CommonFactory.Init($timeout, Constants);
    $scope.Notification = CommonFactory.Notification;
}

