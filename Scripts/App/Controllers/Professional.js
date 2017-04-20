MSPortfolio
.controller('ProfessionalCtrl', ['SharedProperties', ProfessionalCtrl])

function ProfessionalCtrl(SP) {

    var pr = this;
    pr.oTitle = SP.CR.GetCharStyleObject("Positions");
    pr.arrPositions = SP.Con.MSPortfolio.Positions;

    pr.arrPositions.forEach(function (oItem) {
        if (oItem.Technologies) {
            oItem.arrTechnology = [];
            var arrTechnologies = oItem.Technologies.split(",");
            arrTechnologies.forEach(function (sTechnology) {
                sTechnology = sTechnology.trim();
                oItem.arrTechnology.push(SP.CR.FindItemInArray(SP.Con.MSPortfolio.Technologies, "Title", sTechnology, "item"));
            });
        }
    });
}