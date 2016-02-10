Meteor.subscribe('users');
Meteor.subscribe('courses');

Tracker.autorun(function() {
  Meteor.subscribe('messages', Meteor.userId(), {
    onReady: function() {
      var messages = Messages.find({ receiver: Meteor.userId() });
      messages.observeChanges({
        added: function(id, message) {
          if (!message.read) {
            var text = Meteor.users.findOne({ _id: message.notificator }).profile.name;
            text += ' ha escrito en ';
            text += Courses.findOne({ _id: message.courseID }).name;
            Notifications.info('Nueva respuesta', text);
          }
        }
      });
    }
  });
});
