MSPortfolio
.controller('ContactCtrl', ['SharedProperties', ContactCtrl])

function ContactCtrl(SP) {

    var co = this;

    co.arrContacts = SP.Con.MSPortfolio.Contacts.SocialMedia;
    co.arrCV = SP.Con.MSPortfolio.Contacts.CV;
}