Meteor.methods({
  addAnswer: function(questionID, courseID, text) {
    check(questionID, String);
    check(courseID, String);
    checkNonEmptyString(text, 'La respuesta', 1, 1000);
    checkLoggedIn();

    question = Questions.findOne({ _id: questionID });

    Answers.insert({
      questionID: questionID,
      courseID: courseID,
      author: Meteor.userId(),
      text: text,
      agrees: [],
      disagrees: [],
      createdAt: new Date()
    });

    question.subscribers.forEach(function(subscriber) {
      if (Meteor.userId() !== subscriber) {
        Messages.insert({
          courseID: courseID,
          notificator: Meteor.userId(),
          receiver: subscriber
        });
      }
    });
  },
  updateAnswer: function(answerID, text) {
    check(answerID, String);
    checkNonEmptyString(text, 'La respuesta', 1, 1000);

    var answer = Answers.findOne({ _id: answerID });

    if (Meteor.userId() !== answer.author) {
      throw new Meteor.Error(403, 'No eres el autor de esta respuesta.');
    }

    Answers.update({ _id: answerID }, { $set: { text: text } });
  },
  removeAnswer: function(answerID) {
    check(answerID, String);

    var answer = Answers.findOne({ _id: answerID });

    if (Meteor.userId() !== answer.author && !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para eliminar esta respuesta.');
    }

    Messages.remove({ questionID: answer.courseID });
    Answers.remove({ _id: answerID });
  },
  agree: function(answerID) {
    check(answerID, String);
    checkLoggedIn();

    var answer = Answers.findOne({ _id: answerID });

    if (answer.agrees.indexOf(Meteor.userId()) === -1) {
      Answers.update({ _id: answerID }, { $addToSet: { agrees: Meteor.userId() }});

      if (answer.disagrees.indexOf(Meteor.userId()) !== -1) {
        Answers.update({ _id: answerID }, { $pull: { disagrees: Meteor.userId() }});
      }
    } else {
      Answers.update({ _id: answerID }, { $pull: { agrees: Meteor.userId() }});
    }
  },
  disagree: function(answerID) {
    check(answerID, String);
    checkLoggedIn();

    var answer = Answers.findOne({ _id: answerID });

    if (answer.disagrees.indexOf(Meteor.userId()) === -1) {
      Answers.update({ _id: answerID }, { $addToSet: { disagrees: Meteor.userId() }});

      if (answer.agrees.indexOf(Meteor.userId()) !== -1) {
        Answers.update({ _id: answerID }, { $pull: { agrees: Meteor.userId() }});
      }
    } else {
      Answers.update({ _id: answerID }, { $pull: { disagrees: Meteor.userId() }});
    }
  }
});
