MSPortfolio

.factory('Factory_CommonRoutines', [CommonRoutines])

function CommonRoutines() {
    var oCommonRoutine = {
        FindItemInArray: function(array, keyName, keyVal, returnType) {
            if (undefined === keyVal || null === keyVal) {
                return null;
            }
            var bFound = false;
            for (var i in array) {
                if (array[i][keyName] === keyVal) {
                    bFound = true;
                    break;
                }
            }
            if (!bFound) {
                console.log(keyVal);
                return null;
            }
            if (returnType === "index") {
                return i;
            } else {
                return array[i];
            }
        },
        ConvertDateToString: function(date) {
            return date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
        },
        FormatDate: function(value) {
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
        Log: function(msg, color) {
            color = color || "black";
            bgc = "White";
            switch (color) {
                case "success":
                color = "Green";
                bgc = "LimeGreen";
                break;
                case "info":
                color = "DodgerBlue";
                bgc = "Turquoise";
                break;
                case "error":
                color = "Red";
                bgc = "Black";
                break;
                case "start":
                color = "OliveDrab";
                bgc = "PaleGreen";
                break;
                case "warning":
                color = "Tomato";
                bgc = "Black";
                break;
                case "end":
                color = "Orchid";
                bgc = "MediumVioletRed";
                break;
                default:
                color = color;
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
        GetParameterByName: function(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        ScrollTo: function(eID) {
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 50) {
                scrollTo(0, stopY);
                return;
            }
            var speed = Math.round(distance / 50);
            if (speed >= 20) speed = 10;
            var step = Math.round(distance / 12);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
                return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }
        },
        GetStyle: function(){
            var nDelay = Math.random() * 2;
            var animDelay = nDelay + "s";
            var x = {
                "animation-delay" : animDelay,
                "-webkit-animation-delay": animDelay
            }
            return x;
        },
        GetCharStyleObject: function(sTitle){
            return sTitle.split('').map(function(sChar){
                return {
                    sChar: sChar,
                    oStyle: oCommonRoutine.GetStyle()
                }
            });
        }
    }

    return oCommonRoutine;
}
