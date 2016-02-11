Meteor.methods({
  'removeCourseMessages': courseID => {
    checkLoggedIn();

    Messages.remove({ courseID: courseID, receiver: Meteor.userId() });
  },
  'readAllMessages': userID => {
    checkLoggedIn();

    if (userID !== Meteor.userId()) {
      throw new Meteor.Error(403, 'No eres el dueño de estos mensajes.');
    }

    Messages.update({ receiver: userID }, { $set: { read: true } }, { multi: true });
  }
});
