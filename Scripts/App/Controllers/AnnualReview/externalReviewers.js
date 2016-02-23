function ExternalReviewers($scope, $q, DataService, CommonFactory, Constants) {
    var vm = $scope;
    vm.DropdownConfigs = Constants.AnnualReview.CheckList.DropdownConfigs;
    vm.oExternalReviewer = {
        arrReviewers: [],
        AR_ID: null,
        ER_ID: null
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
    vm.EditItem = {};

    vm.SearchLNameFName = {
        sLName: null,
        sFName: null,
        arrResultSet: [],
        sDisplayMessage: Constants.AnnualReview.Notification.EnterSearchKeywords,
        SearchByCodeName: function () {
            if ((this.sLName === null || this.sLName.trim() === "") && (this.sFName === null || this.sFName.trim() === "")) {
                CommonFactory.Notification.ShowNotification(true, Constants.AnnualReview.Notification.InvalidCodeName, Constants.AnnualReview.Notification.Type.Warning);
            } else {
                CommonFactory.Notification.HideNotification();
                vm.oService.SearchByCodeName(this.sLName ? this.sLName : "", this.sFName ? this.sFName : "").then(function () {
                    vm.SearchLNameFName.sDisplayMessage = vm.oPeople.length ? "" : Constants.AnnualReview.Notification.NoRecordFound;
                });
            }
        }
    }

    vm.oService = {
        GetReviewers: function (nPersonID, sAR_Cycle) {
            vm.oExternalReviewer.arrReviewers = [];
            return DataService.GetReviewers(nPersonID, sAR_Cycle).then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    vm.oExternalReviewer.arrReviewers.push(new vm.Helper.ConstructorReviewers(data[i]));
                }
            })
        },
        SaveReview: function (oReview) {
            return DataService.SaveReview(oReview).then(function (data) {
                return data;
            })
        },
        SaveReviewer: function (oReviewer) {
            return DataService.SaveReviewer(oReviewer).then(function (data) {
                return data;
            })
        },
        DeleteReview: function () {
            return DataService.DeleteReview(vm.oExternalReviewer.ER_ID).then(function (data) {
                if (data) {
                    vm.oExternalReviewer.arrReviewers.splice(CommonFactory.FindItemInArray(vm.oExternalReviewer.arrReviewers, 'ER_ID', vm.oExternalReviewer.ER_ID, 'index'), 1);
                    vm.oExternalReviewer.ER_ID = null;
                    CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.Notification.Deleted, Constants.Miscellaneous.Notification.Type.Info);
                    vm.Popup.ShowPopup(false, null, null);
                }
            })
        },
        SearchByCodeName: function (sLName, sFName) {
            return DataService.SearchByCodeNameReviewer(sLName, sFName).then(function (data) {
                vm.oPeople = data;
            })
        }
    }

    vm.Helper = {
        ConstructorReviewers: function (oItem) {
            this.ER_ID = oItem.ER_ID,
            this.AR_ID = oItem.AR_ID,
            this.PERSON_ID = oItem.PERSON_ID,
            this.LNAME = oItem.LNAME,
            this.FNAME = oItem.FNAME,
            this.MNAME = oItem.MNAME,
            this.SUGGESTED_BY = oItem.SUGGESTED_BY,
            this.DD_APPROVED = oItem.DD_APPROVED,
            this.DEO_APPROVED = oItem.DEO_APPROVED,
            this.SELECTED = oItem.SELECTED,
            this.LETTER_REC = oItem.LETTER_REC,
            this.RESPONSE = oItem.RESPONSE,
            this.TITLE = oItem.TITLE,
            this.INSTITUTION = oItem.INSTITUTION,
            this.NOTES = oItem.NOTES,
            this.DEGREES = oItem.DEGREES,
            this.HOME_PHONE = oItem.HOME_PHONE,
            this.EMAIL_ADDRESS = oItem.EMAIL_ADDRESS

            this.DD_APPROVED_Val = oItem.DD_APPROVED ? (oItem.DD_APPROVED === "Y" ? true : false) : null;
            this.DEO_APPROVED_Val = oItem.DEO_APPROVED ? (oItem.DEO_APPROVED === "Y" ? true : false) : null;
            this.SELECTED_Val = oItem.SELECTED ? (oItem.SELECTED === "Y" ? true : false) : null;
            this.LETTER_REC_Val = oItem.LETTER_REC ? (oItem.LETTER_REC === "Y" ? true : false) : null;

            vm.oExternalReviewer.AR_ID = vm.oExternalReviewer.AR_ID ? vm.oExternalReviewer.AR_ID : this.AR_ID;

            this.saved = null;
            this.SaveListItems = function (type) {
                this.DD_APPROVED = this.DD_APPROVED_Val ? "Y" : null;
                this.DEO_APPROVED = this.DEO_APPROVED_Val ? "Y" : null;
                this.SELECTED = this.SELECTED_Val ? "Y" : null;
                this.LETTER_REC = this.LETTER_REC_Val ? "Y" : null;
                this.SaveReviewItem(type);
            }
            this.SaveReviewItem = function (type) {
                var that = this;
                that.saved = 'saving';
                var Service = type === 'review' ? vm.oService.SaveReview : vm.oService.SaveReviewer;
                Service(that).then(function (data) {
                    if (data) {
                        that.saved = true;
                    } else {
                        that.saved = false;
                    }
                });
            }
            this.EditReviewItem = function () {
                vm.EditItem = this;
                vm.Popup.ShowPopup(true, 'new_edit', Constants.AnnualReview.Popup.Edit);
            }
            this.SaveChecklistNewEdit = function () {
                // If item is being edited
                if (this.AR_ID) {
                    var that = this;
                    that.saved = 'saving';
                    var promiseReview = vm.oService.SaveReview(that).then(function (data) {
                        if (data && typeof (data) === "number") { // if new review, then ER_ID is returned, if existing review, then true is returned
                            that.ER_ID = data;
                        }
                    });
                    var promiseReviewer = vm.oService.SaveReviewer(that).then(function (data) {
                        if (data && typeof (data) === "number") { // if new person, then Person_ID is returned, if existing person, then true is returned
                            that.PERSON_ID = data;
                        }
                    });
                    $q.all([promiseReview, promiseReviewer]).then(function () {
                        that.saved = true;
                        vm.Popup.ShowPopup(false, null, null);
                    });
                } else { // If item is being created
                    var that = this;
                    that.saved = 'saving';
                    vm.oService.SaveReviewer(that).then(function (data) {
                        if (data) {
                            that.AR_ID = vm.oExternalReviewer.AR_ID;
                            that.PERSON_ID = data;
                            vm.oService.SaveReview(that).then(function (data) {
                                if (data) {
                                    that.ER_ID = data;
                                    that.saved = true;
                                    vm.oExternalReviewer.arrReviewers.push(that);
                                    vm.Popup.ShowPopup(false, null, null);
                                } else {
                                    that.saved = false;
                                }
                            });
                        } else {
                            // Something went wrong
                        }
                    });
                }
            }
            this.DeleteReview = function () {
                vm.oExternalReviewer.ER_ID = this.ER_ID;
                vm.Popup.ShowPopup(true, 'delete', Constants.AnnualReview.Popup.Delete);
            }
            return this;
        },
        GetReviewers: function () {
            if (vm.oAnnualReview && vm.oAnnualReview.oPerson && vm.oAnnualReview.oARCycle) {                
                vm.oService.GetReviewers(vm.oAnnualReview.oPerson.PERSON_ID, vm.oAnnualReview.oARCycle.AR_CYCLE);
            }
            //if (vm.oAnnualReview && vm.oAnnualReview.oARCycle) {
            //    var temp = 67683085; //3430
            //    vm.oService.GetReviewers(temp, vm.oAnnualReview.oARCycle.AR_CYCLE);
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
        ShowPopupSearchCodeName: function (type, item) {
            if (type === "search") {
                vm.SearchLNameFName.sLName = null;
                vm.SearchLNameFName.sFName = null;
                vm.SearchLNameFName.arrResultSet = null;
                vm.SearchLNameFName.sDisplayMessage = Constants.AnnualReview.Notification.EnterSearchKeywords;
                vm.Popup.ShowPopup(true, 'searchCodeName', Constants.AnnualReview.Popup.SearchLNameFName);
                return;
            } else if (type === "selected") {
                item.AR_ID = vm.oExternalReviewer.AR_ID;
                var updatedItem = new vm.Helper.ConstructorReviewers(item);
                vm.oExternalReviewer.arrReviewers.push(updatedItem);
                updatedItem.SaveChecklistNewEdit();
            }
            vm.oPeople = [];
            vm.Popup.ShowPopup(false, null, null);
        },
        CreateReviewItem: function () {
            vm.EditItem = new vm.Helper.ConstructorReviewers({});            
            vm.Popup.ShowPopup(true, 'new_edit', Constants.AnnualReview.Popup.New);
        }
    }

    $scope.$on('person:updated', function (event, data) {
        vm.oAnnualReview = data;
        vm.Helper.GetReviewers();
    });

    vm.Helper.GetReviewers();
}