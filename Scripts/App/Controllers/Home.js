AnnualReview
.controller('Home', ['$scope', '$window', '$location', Home])

function Home($scope, $window, $location) {

    var vm = $scope;

    vm.GoToView = function (sController) {
        $window.location.href = '/DemoApp/' + sController;
    }
}