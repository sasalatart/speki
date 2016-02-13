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

    return { header: new Date().toLocaleString(), text: 'Pregunta agregada.' }
  },
  updateQuestion: (questionID, text) => {
    check(questionID, String);
    checkNonEmptyString(text, 'La pregunta');

    var question = Questions.findOne({ _id: questionID });

    if (Meteor.userId() !== question.author) {
      throw new Meteor.Error(403, 'No eres el autor de esta pregunta.');
    }

    Questions.update({ _id: questionID }, { $set: { text: text } });

    return { header: new Date().toLocaleString(), text: 'Pregunta editada.' }
  },
  removeQuestion: questionID => {
    check(questionID, String);

    var question = Questions.findOne({ _id: questionID });

    if (Meteor.userId() !== question.author && !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para eliminar esta pregunta.');
    }

    Answers.remove({ questionID: questionID });
    Messages.remove({ questionID: questionID });
    Questions.remove({ _id: questionID });

    return { header: new Date().toLocaleString(), text: 'Pregunta eliminada.' }
  },
  toggleSubscription: questionID => {
    check(questionID, String);
    checkLoggedIn();

    question = Questions.findOne({ _id: questionID });

    var subscriptionIndex = question.subscribers.indexOf(Meteor.userId());
    if (subscriptionIndex === -1) {
      Questions.update({ _id: questionID }, { $addToSet: { subscribers: Meteor.userId() } });
      return { header: new Date().toLocaleString(), text: 'Suscrito para recibir notificaciones de la pregunta.' }
    } else {
      Questions.update({ _id: questionID }, { $pull: { subscribers: Meteor.userId() } });
      return { header: new Date().toLocaleString(), text: 'Ya no estás suscrito para recibir notificaciones de la pregunta.' }
    }
  }
});
