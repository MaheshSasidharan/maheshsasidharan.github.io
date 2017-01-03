MSPortfolio
.controller('EducationCtrl', ['SharedProperties', EducationCtrl])

function EducationCtrl(SP) {

    var ed = this;

    ed.arrEducation = SP.Con.MSPortfolio.Education
}