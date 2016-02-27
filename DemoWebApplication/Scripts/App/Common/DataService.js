AnnualReview

.factory('Factory_DataService', ['$rootScope', '$http', 'Factory_Constants', 'Factory_CommonRoutines', DataService])

function DataService($rootScope, $http, Constants, CommonFactory) {
    var Helper = {
        app: "/DemoApp/",
        AnnualReview: {
            controller: "AnnualReview/",
            SearchByCodeName: function (sLName, sFName) {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'SearchByCodeName?sLName=' + sLName + '&sFName=' + sFName)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            GetARCycle: function () {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'GetARCycle')
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            // Checklist
            GetChecklist: function (nPersonID, sAR_Cycle) {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'GetChecklist?nPersonID=' + nPersonID + '&sAR_Cycle=' + sAR_Cycle)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SaveChecklist: function (oChecklist) {
                return $http.post(Helper.app + Helper.AnnualReview.controller + 'SaveChecklist', { oSaveItem: oChecklist })
                  .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SaveChecklistDetail: function (oChecklist) {
                return $http.post(Helper.app + Helper.AnnualReview.controller + 'SaveChecklistDetail', { oSaveItem: oChecklist })
                  .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            DeleteChecklist: function (nActionID) {
                return $http.delete(Helper.app + Helper.AnnualReview.controller + 'DeleteChecklist?nActionID=' + nActionID)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            // External reviewers
            GetReviewers: function (nPersonID, sAR_Cycle) {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'GetReviewers?nPersonID=' + nPersonID + '&sAR_Cycle=' + sAR_Cycle)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            DeleteReview: function (nERID) {
                return $http.delete(Helper.app + Helper.AnnualReview.controller + 'DeleteReview?nERID=' + nERID)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SaveReview: function (oReview) {
                return $http.post(Helper.app + Helper.AnnualReview.controller + 'SaveReview', { oSaveItem: oReview })
                  .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SaveReviewer: function (oReviewer) {
                return $http.post(Helper.app + Helper.AnnualReview.controller + 'SaveReviewer', { oSaveItem: oReviewer })
                  .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SearchByCodeNameReviewer: function (sLName, sFName) {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'SearchByCodeNameReviewer?sLName=' + sLName + '&sFName=' + sFName)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            // Rank History
            GetRankHistory: function (nPersonID) {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'GetRankHistory?nPersonID=' + nPersonID)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
            SaveAppointmentHistory: function (oAppointmentHistory) {
                return $http.post(Helper.app + Helper.AnnualReview.controller + 'SaveAppointmentHistory', { oSaveItem: oAppointmentHistory })
                  .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },// Review History
            GetReviewHistory: function (nPersonID) {
                return $http.get(Helper.app + Helper.AnnualReview.controller + 'GetReviewHistory?nPersonID=' + nPersonID)
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            },
        },
        Miscellaneous: {
            oAnnualReview: null,
            BroadCastOnPerson: function (data) {
                this.oAnnualReview = data;
                $rootScope.$broadcast('person:updated', data);
            },
            ReturnDataDotData: function (data) {
                return data.data;
            },
            FailedInService: function () {
                CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.SomethingWentWrong, Constants.Miscellaneous.Notification.Type.Danger);
            }
        }
    }

    var oService = {
        // Annual Review
        oAnnualReview: Helper.Miscellaneous.oAnnualReview,
        SearchByCodeName: Helper.AnnualReview.SearchByCodeName,
        BroadCastOnPerson: Helper.Miscellaneous.BroadCastOnPerson,
        GetARCycle: Helper.AnnualReview.GetARCycle,
        GetChecklist: Helper.AnnualReview.GetChecklist,
        SaveChecklist: Helper.AnnualReview.SaveChecklist,
        SaveChecklistDetail: Helper.AnnualReview.SaveChecklistDetail,
        DeleteChecklist: Helper.AnnualReview.DeleteChecklist,
        GetReviewers: Helper.AnnualReview.GetReviewers,
        DeleteReview: Helper.AnnualReview.DeleteReview,
        SaveReview: Helper.AnnualReview.SaveReview,
        SaveReviewer: Helper.AnnualReview.SaveReviewer,
        SearchByCodeNameReviewer: Helper.AnnualReview.SearchByCodeNameReviewer,
        GetRankHistory: Helper.AnnualReview.GetRankHistory,
        SaveAppointmentHistory: Helper.AnnualReview.SaveAppointmentHistory,
        GetReviewHistory: Helper.AnnualReview.GetReviewHistory
    }
    return oService;
}