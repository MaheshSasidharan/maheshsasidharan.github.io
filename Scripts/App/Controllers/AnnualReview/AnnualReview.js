AnnualReview.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/checklist', {
        templateUrl: 'Templates/checklist.html',
        controller: Checklist,
        resolve: {
            DataService: "Factory_DataService",
            CommonFactory: "Factory_CommonRoutines",
            Constants: "Factory_Constants"
        }
    }).
    when('/externalReviewers', {
        templateUrl: 'Templates/externalReviewers.html',
        controller: ExternalReviewers,
        resolve: {
            DataService: "Factory_DataService",
            CommonFactory: "Factory_CommonRoutines",
            Constants: "Factory_Constants"
        }
    }).
    when('/rankHistory', {
        templateUrl: 'Templates/rankHistory.html',
        controller: RankHistory,
        resolve: {
            DataService: "Factory_DataService",
            CommonFactory: "Factory_CommonRoutines",
            Constants: "Factory_Constants"
        }
    }).
    when('/reviewHistory', {
        templateUrl: 'Templates/reviewHistory.html',
        controller: ReviewHistory,
        resolve: {
            DataService: "Factory_DataService",
            CommonFactory: "Factory_CommonRoutines",
            Constants: "Factory_Constants"
        }
    }).
    otherwise({ redirectTo: '/checklist' });
}]);

AnnualReview
.controller('AnnualReviewCtrl', ['$scope', '$filter', '$location', 'Factory_DataService', 'Factory_CommonRoutines', 'Factory_Constants', AnnualReviewCtrl])

function AnnualReviewCtrl($scope, $filter, $location, DataService, CommonFactory, Constants) {

    var vm = $scope;
    vm.tabs = Constants.AnnualReview.Tabs;

    vm.oAnnualReview = {
        oARCycle: null,
        oPerson: null
    }
    vm.oPeople = [];
    vm.oARCycles = [];
    vm.Popup = vm.Popup = CommonFactory.Popup;
    vm.SearchCodeName = {
        sLName: null,
        sFName: null,
        arrResultSet: [],
        sDisplayMessage: Constants.AnnualReview.Notification.EnterSearchKeywords,
        SearchByCodeName: function (sLName, sFName) {
            if (sLName || sFName) {
                vm.Helper.ShowPopupSearchCodeName('search');
            }
            this.sLName = sLName ? sLName : this.sLName;
            this.sFName = sFName ? sFName : this.sFName;
            if ((this.sLName === null || this.sLName.trim() === "") && (this.sFName === null || this.sFName.trim() === "")) {
                CommonFactory.Notification.ShowNotification(true, Constants.AnnualReview.Notification.InvalidCodeName, Constants.AnnualReview.Notification.Type.Warning);
            } else {
                CommonFactory.Notification.HideNotification();
                vm.oService.SearchByCodeName(this.sLName ? this.sLName : "", this.sFName ? this.sFName : "").then(function () {
                    vm.SearchCodeName.sDisplayMessage = vm.oPeople.length ? "" : Constants.AnnualReview.Notification.NoRecordFound;
                });
            }
        }
    }

    vm.oService = {
        SearchByCodeName: function (sLName, sFName) {
            return DataService.SearchByCodeName(sLName, sFName).then(function (data) {
                vm.oPeople = data;
            })
        },
        GetARCycle: function () {
            DataService.GetARCycle().then(function (data) {
                vm.oARCycles = vm.Helper.FormatARCycles(data);
                if (data) {
                    vm.oAnnualReview.oARCycle = vm.oARCycles[0];
                }
            })
        }
    }

    vm.Helper = {
        GetCurrentTabOnLoad: function (oDefaultTab) {
            if ($location.$$url.indexOf("/") >= 0) {
                var sTab = $location.$$url.split("/")[1];
                if (sTab) {
                    sTab = sTab.toLowerCase();
                } else {
                    return oDefaultTab;
                }
                for (var i = 0; i < vm.tabs.length; i++) {
                    if (sTab === vm.tabs[i].link.toLowerCase().split("/")[1]) {
                        return vm.tabs[i];
                    }
                };
                return oDefaultTab;
            } else {
                return oDefaultTab;
            }
        },
        ShowPopupSearchCodeName: function (type, item) {
            if (type === "search") {
                vm.SearchCodeName.sLName = null;
                vm.SearchCodeName.sFName = null;
                vm.SearchCodeName.arrResultSet = null;
                vm.SearchCodeName.sDisplayMessage = Constants.AnnualReview.Notification.EnterSearchKeywords;
                vm.Popup.ShowPopup(true, 'searchCodeName', Constants.AnnualReview.Popup.SearchLNameFName);
                return;
            } else if (type === "selected") {
                vm.oAnnualReview.oPerson = item;
                this.BroadCastAnnualReview();
            }
            vm.oPeople = [];
            vm.Popup.ShowPopup(false, null, null);
        },
        BroadCastAnnualReview: function () {
            DataService.BroadCastOnPerson(vm.oAnnualReview);
        },
        TabClass: function (tab) {
            if (vm.selectedTab == tab) {
                return "active";
            } else {
                return "";
            }
        },
        SetSelectedTab: function (tab) {
            vm.selectedTab = tab;
        },
        FormatARCycles: function (arrData) {
            var arrTempARCycle = [];
            for (var i = 0; i < arrData.length; i++) {
                arrTempARCycle.push({
                    AR_CYCLE: arrData[i].AR_CYCLE,
                    AR_CYCLE_Formatted: arrData[i].AR_CYCLE.split('-')[0],
                });
            }
            return $filter('orderBy')(arrTempARCycle, 'AR_CYCLE_Formatted', true);
        }
    }

    vm.selectedTab = vm.Helper.GetCurrentTabOnLoad(vm.tabs[0]);
    vm.oService.GetARCycle();
}