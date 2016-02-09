Meteor.methods({
  addQuestion: (courseID, text) => {
    check(courseID, String);
    checkNonEmptyString(text, 'La pregunta');
    checkLoggedIn();

    Questions.insert({
      courseID: courseID,
      author: Meteor.userId(),
      text: text,
      subscribers: [Meteor.userId()],
      createdAt: new Date()
    });
  },
  updateQuestion: function(questionID, text) {
    check(questionID, String);
    checkNonEmptyString(text, 'La pregunta');

    var question = Questions.findOne({ _id: questionID });

    if (Meteor.userId() !== question.author) {
      throw new Meteor.Error(403, 'No eres el autor de esta pregunta.');
    }

    Questions.update({ _id: questionID }, { $set: { text: text } });
  },
  removeQuestion: function(questionID) {
    check(questionID, String);

    var question = Questions.findOne({ _id: questionID });

    if (Meteor.userId() !== question.author && !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para eliminar esta pregunta.');
    }

    Answers.remove({ questionID: questionID });
    Questions.remove({ _id: questionID });
  },
  'toggleSubscription': function(questionID) {
    check(questionID, String);
    checkLoggedIn();

    question = Questions.findOne({ _id: questionID });

    var subscriptionIndex = question.subscribers.indexOf(Meteor.userId());
    if (subscriptionIndex === -1) {
      Questions.update({ _id: questionID }, { $addToSet: { subscribers: Meteor.userId() } });
    } else {
      Questions.update({ _id: questionID }, { $pull: { subscribers: Meteor.userId() } });
    }
  }
});
