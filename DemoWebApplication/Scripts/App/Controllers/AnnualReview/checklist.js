function Checklist($scope, DataService, CommonFactory, Constants) {
    var vm = $scope;
    vm.DropdownConfigs = Constants.AnnualReview.CheckList.DropdownConfigs;
    vm.oChecklists = {
        arrChecklists: [],
        oAnnualReviewDetails: {
            AR_ID: null,
            COMM_ACTION: null,
            CV_WEBSITE: null,
            NEW_RANK: null,
            NEW_RANK_EFFECTIVE: null,
            NOTE: null,
            PERSON_ID: null,
            AR_CYCLE: null
        },
        showAddChecklist: false,
        ACTION_ID: null,
        nMaxNumberOfActions: 2
    }
    vm.oAnnualReview = DataService.oAnnualReview;
    vm.Popup = {
        bShow: false,
        sType: null,
        sTitle: null,
        ShowPopup: function (bShow, sType, sTitle) {
            this.bShow = bShow;
            this.sType = sType;
            this.sTitle = sTitle;
        }
    };

    vm.oService = {
        GetChecklist: function (nPersonID, sAR_Cycle) {
            vm.oChecklists.arrChecklists = [];
            return DataService.GetChecklist(nPersonID, sAR_Cycle).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    vm.oChecklists.arrChecklists.push(new vm.Helper.ConstructorChecklist(data[i]));
                }
                vm.Helper.UpdateAnnualReview(data && data[0] ? data[0] : {});
                vm.Helper.ShowHideAddNewChecklist();
            })
        },
        SaveChecklist: function (oChecklist) {
            return DataService.SaveChecklist(oChecklist).then(function (data) {
                return data;
            })
        },
        SaveChecklistDetail: function () {
            return DataService.SaveChecklistDetail(vm.oChecklists.oAnnualReviewDetails).then(function (data) {
                return data;
            })
        },
        DeleteChecklist: function () {
            return DataService.DeleteChecklist(vm.oChecklists.ACTION_ID).then(function (data) {
                if (data) {
                    vm.oChecklists.arrChecklists.splice(CommonFactory.FindItemInArray(vm.oChecklists.arrChecklists, 'ACTION_ID', vm.oChecklists.ACTION_ID, 'index'), 1);
                    vm.oChecklists.ACTION_ID = null;
                    CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.Notification.Deleted, Constants.Miscellaneous.Notification.Type.Info);
                    vm.Helper.ShowHideAddNewChecklist();
                    vm.Popup.ShowPopup(false, null, null);
                }
            })
        }
    }

    vm.Helper = {
        ConstructorChecklist: function (oItem) {
            this.AR_ID = oItem.AR_ID;
            this.ACTION_ID = oItem.ACTION_ID;
            this.ACTION_TYPE = oItem.ACTION_TYPE;
            this.REVIEW_TYPE = oItem.REVIEW_TYPE;
            this.TERM = oItem.TERM;
            this.VOTE_FOR = oItem.VOTE_FOR;
            this.VOTE_AGAINST = oItem.VOTE_AGAINST;
            this.VOTE_ABSTAIN = oItem.VOTE_ABSTAIN;
            this.APVL_DEPT = oItem.APVL_DEPT;
            this.APVL_DEAN = oItem.APVL_DEAN;
            this.APVL_PROVOST = oItem.APVL_PROVOST;
            this.SELF_ELECTED = oItem.SELF_ELECTED;
            this.SELF_ELECTED_Val = oItem.SELF_ELECTED ? (oItem.SELF_ELECTED === "Y" ? true : false) : null;
            var tempDate = CommonFactory.FormatDate(oItem.EFFECTIVE_DATE);
            this.EFFECTIVE_DATE = tempDate ? tempDate[1] : null;

            this.oActionType = vm.Helper.FormatCheckListDropdown('actionType', this.ACTION_TYPE);
            this.oReviewType = vm.Helper.FormatCheckListDropdown('reviewType', this.REVIEW_TYPE);
            this.oApvlDept = vm.Helper.FormatCheckListDropdown('apvlDept', this.APVL_DEPT);
            this.oApvlDean = vm.Helper.FormatCheckListDropdown('apvlDept', this.APVL_DEAN);
            this.oApvlProvost = vm.Helper.FormatCheckListDropdown('apvlDept', this.APVL_PROVOST);

            this.saved = null;

            this.SaveListItems = function () {
                this.ACTION_TYPE = this.oActionType ? this.oActionType.val : this.oActionType;
                this.REVIEW_TYPE = this.oReviewType ? this.oReviewType.val : this.oReviewType;
                this.APVL_DEPT = this.oApvlDept ? this.oApvlDept.val : this.oApvlDept;
                this.APVL_DEAN = this.oApvlDean ? this.oApvlDean.val : this.oApvlDean;
                this.APVL_PROVOST = this.oApvlProvost ? this.oApvlProvost.val : this.oApvlProvost;
                this.SELF_ELECTED = this.SELF_ELECTED_Val ? "Y" : null;
                this.EFFECTIVE_DATE = this.EFFECTIVE_DATE ? this.EFFECTIVE_DATE : null;

                this.SaveCheckList();
            }
            this.SaveCheckList = function () {
                if (!this.AR_ID) {
                    if (vm.oChecklists.oAnnualReviewDetails.AR_ID){// && typeof(this.AR_ID) !== "number") {
                        this.AR_ID = vm.oChecklists.oAnnualReviewDetails.AR_ID;
                    } else { // Entry in Annual Review does not exists for person_id and ar_cycle
                        //if (vm.oAnnualReview && vm.oAnnualReview.oPerson && vm.oAnnualReview.oARCycle) {
                        if (vm.oAnnualReview && vm.oAnnualReview && vm.oAnnualReview.oARCycle) {
                            vm.oChecklists.oAnnualReviewDetails.PERSON_ID = 67683085;// vm.oAnnualReview.oPerson.PERSON_ID;
                            vm.oChecklists.oAnnualReviewDetails.AR_CYCLE = vm.oAnnualReview.oARCycle.AR_CYCLE;
                            var that = this;
                            vm.oService.SaveChecklistDetail().then(function (data) {
                                if (data && typeof (data) === "number") {
                                    that.AR_ID = data;
                                    that.SaveCheckList();
                                }
                            })
                        }
                        return;
                    }
                }
                var that = this;
                that.saved = 'saving';
                vm.oService.SaveChecklist(that).then(function (data) {
                    if (data) { // if new Action, then Action_ID is returned, if existing person, then true is returned
                        if (typeof (data) === "number") {
                            that.ACTION_ID = data;
                        }
                        that.saved = true;
                    } else {
                        that.saved = false;
                    }
                });
            }
            this.DeleteChecklist = function () {
                if (this.ACTION_ID) {
                    vm.oChecklists.ACTION_ID = this.ACTION_ID;
                    vm.Popup.ShowPopup(true, 'delete', Constants.AnnualReview.Popup.Delete);
                } else {
                    vm.oChecklists.ACTION_ID = undefined;
                    vm.oChecklists.arrChecklists.splice(vm.oChecklists.arrChecklists.length - 1, 1);
                    CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.Notification.Removed, Constants.Miscellaneous.Notification.Type.Info);
                    vm.Helper.ShowHideAddNewChecklist();
                }
            }
            return this;
        },
        UpdateAnnualReview: function (oItem) {
            vm.oChecklists.oAnnualReviewDetails.AR_ID = oItem.AR_ID;
            vm.oChecklists.oAnnualReviewDetails.COMM_ACTION = oItem.COMM_ACTION;
            vm.oChecklists.oAnnualReviewDetails.CV_WEBSITE = oItem.CV_WEBSITE;
            vm.oChecklists.oAnnualReviewDetails.NEW_RANK = oItem.NEW_RANK;
            vm.oChecklists.oAnnualReviewDetails.NOTE = oItem.NOTE;
            vm.oChecklists.oAnnualReviewDetails.AR_CYCLE = oItem.AR_CYCLE;
            vm.oChecklists.oAnnualReviewDetails.PERSON_ID = oItem.PERSON_ID;

            var tempDate = CommonFactory.FormatDate(oItem.NEW_RANK_EFFECTIVE);
            vm.oChecklists.oAnnualReviewDetails.NEW_RANK_EFFECTIVE = tempDate ? tempDate[1] : null;
        },
        GetChecklist: function () {
            vm.oChecklists.showAddChecklist = false;
            if (vm.oAnnualReview && vm.oAnnualReview.oPerson && vm.oAnnualReview.oARCycle) {                
                vm.oService.GetChecklist(vm.oAnnualReview.oPerson.PERSON_ID, vm.oAnnualReview.oARCycle.AR_CYCLE);
            }
            //if (vm.oAnnualReview && vm.oAnnualReview.oARCycle) {
            //    var temp = 67683085; //3430
            //    vm.oService.GetChecklist(temp, vm.oAnnualReview.oARCycle.AR_CYCLE);
            //}
        },
        FormatCheckListDropdown: function (type, val) {
            if (!val) {
                return { val: null };
            }
            var arrayOfOptions = [];
            if (type === 'reviewType') {
                arrayOfOptions = vm.DropdownConfigs.optionsReivewType;
            } else if (type === 'actionType') {
                arrayOfOptions = vm.DropdownConfigs.optionActionType;
            } else {
                arrayOfOptions = vm.DropdownConfigs.optionsApproval;
            }
            for (var i = 0; i < arrayOfOptions.length; i++) {
                if (val === arrayOfOptions[i].val) {
                    return arrayOfOptions[i];
                }
            }
        },
        ShowHideAddNewChecklist: function () {
            if (vm.oChecklists.arrChecklists && vm.oChecklists.arrChecklists.length <= vm.oChecklists.nMaxNumberOfActions) {
                vm.oChecklists.showAddChecklist = true;
            } else {
                vm.oChecklists.showAddChecklist = false;
            }
        },
        AddNewChecklist: function () {
            vm.oChecklists.arrChecklists.push(new vm.Helper.ConstructorChecklist({}));
            vm.Helper.ShowHideAddNewChecklist();
        }
    }

    $scope.$on('person:updated', function (event, data) {
        vm.oAnnualReview = data;
        vm.Helper.GetChecklist();
        //vm.oService.GetChecklist(67683085, vm.oAnnualReview.oARCycle.AR_CYCLE);
    });

    vm.Helper.GetChecklist();
}
