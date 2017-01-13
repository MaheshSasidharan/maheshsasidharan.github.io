MSPortfolio
.factory('SharedProperties', ['Factory_CommonRoutines', 'Factory_Constants', 'Factory_DataService','$timeout', '$interval', SharedProperties])

function SharedProperties(CommonRoutines, Constants, DataService, timeout, interval) {
    var oSP = {
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
        CR: CommonRoutines,
        Con: Constants,
        DS: DataService,
        Timeout: timeout,
        Interval: interval,
        OnDirectOnLanding: null,
        UpdateBackground: null
    }
    return oSP;
}