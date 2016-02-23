function ReviewHistory($scope, DataService, CommonFactory, Constants) {
    var vm = $scope;

    vm.oReviewHistory = {
        arrReviewHistory: []
    }
    vm.oAnnualReview = DataService.oAnnualReview;

    vm.oService = {
        GetReviewHistory: function (nPersonID) {
            vm.oReviewHistory.arrReviewHistory = [];
            return DataService.GetReviewHistory(nPersonID).then(function (data) {
                vm.oReviewHistory.arrReviewHistory = data;
            })
        }
    }

    vm.Helper = {
        GetReviewHistory: function () {
            if (vm.oAnnualReview && vm.oAnnualReview.oPerson && vm.oAnnualReview.oARCycle) {
                vm.oService.GetReviewHistory(vm.oAnnualReview.oPerson.PERSON_ID);
            }
            //if (vm.oAnnualReview && vm.oAnnualReview) {
            //    var temp = 67683085; //3430
            //    vm.oService.GetReviewHistory(temp);
            //}
        },
    }

    $scope.$on('person:updated', function (event, data) {
        vm.oAnnualReview = data;
        vm.Helper.GetReviewHistory();
    });

    vm.Helper.GetReviewHistory();
}
