Template.navbar.rendered = function() {
  var messages = Messages.find({ receiver: Meteor.userId() });
  messages.observeChanges({
    added: function(id, message) {
      var course = Courses.findOne({ _id: message.courseID }).name;
      var notificator = Meteor.users.findOne({ _id: message.notificator }).profile.name;
      var text = notificator + ' ha escrito en la pregunta a la que te suscribiste en ``' + course + '´´';
      Notifications.info('Nueva respuesta.', text);
      Meteor.call('removeMessage', id);
    }
  });
}

Template.navbar.events({
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
