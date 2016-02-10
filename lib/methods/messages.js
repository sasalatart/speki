Meteor.methods({
  'removeMessage': messageID => {
    checkLoggedIn();

    var message = Messages.findOne({ _id: messageID });
    if (message.receiver !== Meteor.userId()) {
      throw new Meteor.Error(403, 'No eres el dueño de este mensaje.');
    }

    Messages.remove({ _id: messageID });
  },
  'removeCourseMessages': courseID => {
    checkLoggedIn();

    Messages.remove({ courseID: courseID, receiver: Meteor.userId() });
  },
  'readAllMessages': userID => {
    checkLoggedIn();

    if (messageID !== Meteor.userId()) {
      throw new Meteor.Error(403, 'No eres el dueño de estos mensajes.');
    }

    Messages.update({ receiver: userID }, { $set: { read: true } }, { multi: true });
  }
});
