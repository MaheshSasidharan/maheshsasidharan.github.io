function RankHistory($scope, DataService, CommonFactory, Constants) {
    var vm = $scope;

    vm.oRankHistory = {
        arrRankHistory: [],
        arrAppointmentHistory: []
    }
    vm.oAnnualReview = DataService.oAnnualReview;

    vm.oService = {
        GetRankHistory: function (nPersonID) {
            vm.oRankHistory.arrRankHistory = [];
            vm.oRankHistory.arrAppointmentHistory = [];
            return DataService.GetRankHistory(nPersonID).then(function (data) {
                vm.oRankHistory.arrRankHistory = vm.Helper.FormatRankHistory(data.arrRankHistory);
                for (var i = 0; i < data.arrAppointmentHistory.length; i++) {
                    vm.oRankHistory.arrAppointmentHistory.push(new vm.Helper.ConstructorAppointmentHistory(data.arrAppointmentHistory[i]));
                }
            })
        },
        SaveAppointmentHistory: function (oAppointmentHistory) {
            return DataService.SaveAppointmentHistory(oAppointmentHistory).then(function (data) {
                return data;
            })
        }
    }

    vm.Helper = {
        ConstructorAppointmentHistory: function (oItem) {
            this.PERSON_ID = oItem.PERSON_ID;
            this.APPT_ID = oItem.APPT_ID;
            this.LENGTH = oItem.LENGTH;

            var tempDate = CommonFactory.FormatDate(oItem.WHEN_STARTED);
            this.WHEN_STARTED = tempDate ? tempDate[1] : null;
            tempDate = CommonFactory.FormatDate(oItem.WHEN_ENDED);
            this.WHEN_ENDED = tempDate ? tempDate[1] : null;

            this.EXTENSION = oItem.EXTENSION;
            this.EXTENSION_Val = oItem.EXTENSION ? (oItem.EXTENSION === "Y" ? true : false) : null;

            this.saved = null;

            this.SaveListItems = function () {
                this.EXTENSION = this.EXTENSION_Val ? "Y" : null;
                this.WHEN_STARTED = this.WHEN_STARTED ? this.WHEN_STARTED : null;
                this.WHEN_ENDED = this.WHEN_ENDED ? this.WHEN_ENDED : null;

                this.SaveCheckList();
            }

            this.SaveCheckList = function () {
                var that = this;
                that.saved = 'saving';
                vm.oService.SaveAppointmentHistory(that).then(function (data) {
                    if (data) {
                        that.saved = true;
                    } else {
                        that.saved = false;
                    }
                });
            }

            return this;
        },
        GetRankHistory: function () {
            if (vm.oAnnualReview && vm.oAnnualReview.oPerson && vm.oAnnualReview.oARCycle) {                
                vm.oService.GetRankHistory(vm.oAnnualReview.oPerson.PERSON_ID, vm.oAnnualReview.oARCycle.AR_CYCLE);
            }
            //if (vm.oAnnualReview && vm.oAnnualReview.oARCycle) {
            //    var temp = 67683085; //3430
            //    vm.oService.GetRankHistory(temp, vm.oAnnualReview.oARCycle.AR_CYCLE);
            //}
        },
        FormatRankHistory: function (arrRankHistory) {
            for (var i = 0; i < arrRankHistory.length; i++) {
                var tempDate = CommonFactory.FormatDate(arrRankHistory[i].WHEN_STARTED);
                arrRankHistory[i].WHEN_STARTED = tempDate ? tempDate[1] : null;
                tempDate = CommonFactory.FormatDate(arrRankHistory[i].WHEN_FINISHED);
                arrRankHistory[i].WHEN_FINISHED = tempDate ? tempDate[1] : null;
            }
            return arrRankHistory;
        }
    }

    $scope.$on('person:updated', function (event, data) {
        vm.oAnnualReview = data;
        vm.Helper.GetRankHistory();
        //vm.oService.GetChecklist(67683085, vm.oAnnualReview.oARCycle.AR_CYCLE);
    });

    vm.Helper.GetRankHistory();
}
