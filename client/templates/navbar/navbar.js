Template.navbar.events({
  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, err => {
      if (err) { Notifications.error('Error', 'Facebook login failed'); }
    });
  },
  'click #logout': function(event) {
    Meteor.call('readAllMessages', Meteor.userId());
    Router.go('/');
    Meteor.logout(err => {
      if (err) { Notifications.error('Logout failed'); }
    });
  }
});

Template.navbar.helpers({
  'hasMessages': function() {
    return Messages.find().count() !== 0;
  },
  'messageCount': function() {
    return Messages.find().count();
  }
})
