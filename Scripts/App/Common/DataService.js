MSPortfolio
.factory('Factory_DataService', ['$http', 'Factory_Constants', 'Factory_CommonRoutines', DataService])

function DataService($http, Constants, CommonFactory) {
    var Helper = {
        //app: "https://maheshportfolio.herokuapp.com/",
        app: "http://128.255.84.48:3000/",
        MSPortfolio: {
            controller: "users/",
            UA: function (oSaveItem) {
                return $http.post(Helper.app + Helper.MSPortfolio.controller + 'ua', {oSaveItem: oSaveItem})
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
                //CommonFactory.Notification.ShowNotification(true, Constants.Miscellaneous.SomethingWentWrong, Constants.Miscellaneous.Notification.Type.Danger);
            }
        }
    }

    var oService = {
        UA: Helper.MSPortfolio.UA
    }
    return oService;
}