MSPortfolio
.controller('ProjectCtrl', ['SharedProperties', ProjectCtrl])

function ProjectCtrl(SP) {

    var pj = this;
    pj.oTitle = SP.CR.GetCharStyleObject("Projects");
    pj.arrProjects = SP.Con.MSPortfolio.Projects;

    pj.arrProjects.forEach(function (oItem) {
        oItem.arrTechnology = [];
        var arrTechnologies = oItem.Technologies.split(",");
        arrTechnologies.forEach(function (sTechnology) {
            sTechnology = sTechnology.trim();
            oItem.arrTechnology.push(SP.CR.FindItemInArray(SP.Con.MSPortfolio.Technologies, "Title", sTechnology, "item"));
        });
    });
}