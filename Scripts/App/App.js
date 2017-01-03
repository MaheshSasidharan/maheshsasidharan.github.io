var MSPortfolio = angular.module('MSPortfolio', ['ui.router', 'ngAnimate']);

MSPortfolio
    .controller('LayoutPage', ['SharedProperties', LayoutPage]);

function LayoutPage(SP) {

    var lp = this;
    lp.bInitMode = false;
    lp.bgImg = null;
    lp.currentState = null;

    lp.Helper = {
        UpdateBackground: function (sState) {
            lp.currentState = sState;
            switch (sState) {
                case "landing":
                    lp.bgImg = "station.png";
                    break;
                case "ms.project":
                    lp.bgImg = "matrix.jpg";
                    break;
                case "ms.education":
                    lp.bgImg = "education.jpg";
                    break;
                case "ms.contact":
                    lp.bgImg = "contact.jpg";
                    break;
                case "ms.professional":
                    lp.bgImg = "blackred.jpg";
                    break;
            }
        },
        OnDirectOnLanding: function (bInitMode) {
            if (bInitMode) {
                lp.bInitMode = true;
                SP.Timeout(function () {
                    lp.bInitMode = false;
                }, 1000);
            } else {
                lp.bInitMode = false;
            }
        },
        UpdateTabActive: function (sType) {

        }
    }

    SP.UpdateBackground = lp.Helper.UpdateBackground;
    SP.OnDirectOnLanding = lp.Helper.OnDirectOnLanding;



    lp.arrIds = [1, 2, 3, 4, 5, 6, 7];
    lp.nIndex = -1;

    lp.Helper = {
        SmoothScroll: function (sType) {
            if (sType === 'p') {
                if (lp.nIndex > 0) {
                    SP.CR.ScrollTo(lp.arrIds[--lp.nIndex]);
                }
            }
            if (sType === 'n') {
                if (lp.nIndex < lp.arrIds.length - 1) {
                    SP.CR.ScrollTo(lp.arrIds[++lp.nIndex]);
                }
            }
        }
    }
}