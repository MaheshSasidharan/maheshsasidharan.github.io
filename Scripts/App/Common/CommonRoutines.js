AnnualReview

.factory('Factory_CommonRoutines', [CommonRoutines])

function CommonRoutines() {
    var $timeout = null;
    var Constants = null;

    var oCommonRoutine = {
        FindItemInArray: function (array, keyName, keyVal, returnType) {
            if (undefined === keyVal || null === keyVal) {
                return null;
            }
            for (var i in array) {
                if (array[i][keyName] === keyVal) {
                    break;
                }
            }
            if (returnType === "index") {
                return i;
            } else {
                return array[i];
            }
        },
        ConvertDateToString: function (date) {
            return date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
        },
        FormatDate: function (value) {
            if (value) {
                var sDate = new Date(+value.replace(/\/Date\((\d+)\)\//, '$1'));
                var sFormattedDate = this.ConvertDateToString(sDate);
                if ("NaN-NaN-NaN" == sFormattedDate || "Invalid Date" === sDate) {
                    sFormattedDate = Constants.Miscellaneous.InvalidDate;
                }
                return [sDate, sFormattedDate];
            } else {
                return null;
            }
        },
        Log: function (msg, color) {
            color = color || "black";
            bgc = "White";
            switch (color) {
                case "success": color = "Green"; bgc = "LimeGreen"; break;
                case "info": color = "DodgerBlue"; bgc = "Turquoise"; break;
                case "error": color = "Red"; bgc = "Black"; break;
                case "start": color = "OliveDrab"; bgc = "PaleGreen"; break;
                case "warning": color = "Tomato"; bgc = "Black"; break;
                case "end": color = "Orchid"; bgc = "MediumVioletRed"; break;
                default: color = color;
            }

            if (typeof msg == "object") {
                console.log(msg);
            } else if (typeof color == "object") {
                console.log("%c" + msg, "color: PowderBlue;font-weight:bold; background-color: RoyalBlue;");
                console.log(color);
            } else {
                console.log("%c" + msg, "color:" + color + ";font-weight:bold; background-color: " + bgc + ";");
            }
        },
        Notification: {
            sTitle: "",
            bShow: false,
            sType: "",
            ShowNotification: function (bShow, sTitle, sType) {
                this.HideNotification(); // Clear previous notification and show 
                var that = this;
                $timeout(function () {
                    that.sTitle = sTitle;
                    that.bShow = bShow;
                    that.sType = sType;
                }, 10);
            },
            HideNotification: function () {
                this.sTitle = "";
                this.bShow = false;
                this.sType = "";
            }
        },
        Popup: {
            bShow: false,
            sType: null,
            sTitle: null,
            ShowPopup: function (bShow, sType, sTitle) {
                this.bShow = bShow;
                this.sType = sType;
                this.sTitle = sTitle;
            }
        },
        Init: function (oTimeout, oConstants) {
            $timeout = oTimeout;
            Constants = oConstants;
        }
    }

    return oCommonRoutine;
}