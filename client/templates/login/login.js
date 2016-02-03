Template.login.events({
  'click #facebook-login': event => {
    Meteor.loginWithFacebook({}, err => {
      if (err) { throw new Meteor.Error("Facebook login failed"); }
    });
  },

  'click #logout': event => {
    Meteor.logout(err => {
      if (err) { throw new Meteor.Error("Logout failed"); }
    });
  }
});
