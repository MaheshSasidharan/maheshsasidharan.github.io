MSPortfolio

.factory('Factory_DataService', ['$rootScope', '$http', 'Factory_Constants', 'Factory_CommonRoutines', DataService])

function DataService($rootScope, $http, Constants, CommonFactory) {
    var Helper = {
        app: "/MS/",
        MSPortfolio: {
            controller: "MSPortfolio/",
            GetARCycle: function () {
                return $http.get(Helper.app + Helper.MSPortfolio.controller + 'GetARCycle')
                .then(
                Helper.Miscellaneous.ReturnDataDotData,
                Helper.Miscellaneous.FailedInService)
            }
        },
        Miscellaneous: {
            oMSPortfolio: null,
            ReturnDataDotData: function (data) {
                return data.data;
            },
            FailedInService: function () {
                CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.SomethingWentWrong, Constants.Miscellaneous.Notification.Type.Danger);
            }
        }
    }

    var oService = {
    }
    return oService;
}