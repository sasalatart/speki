Template.login.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, err => {
      if (err) { throw new Meteor.Error("Facebook login failed"); }
    });
  },

  'click #logout': function(event) {
    Meteor.logout(err => {
      if (err) { throw new Meteor.Error("Logout failed"); }
    });
  }
});
