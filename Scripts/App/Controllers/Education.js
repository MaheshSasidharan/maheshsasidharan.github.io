MSPortfolio
.controller('EducationCtrl', ['SharedProperties', EducationCtrl])

function EducationCtrl(SP) {

    var ed = this;
    ed.oTitle = SP.CR.GetCharStyleObject("Education");

    ed.arrEducation = SP.Con.MSPortfolio.Education;

    ed.GetStyle = SP.CR.GetStyle;
}