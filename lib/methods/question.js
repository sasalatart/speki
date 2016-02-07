Meteor.methods({
  updateQuestion: function(questionID, text) {
    check(questionID, String);
    check(text, String);

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

    Questions.remove(questionID);
  },
  addAnswer: function(questionID, courseID, text) {
    check(questionID, String);
    check(courseID, String);
    check(text, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'Debes iniciar sesión para hacer esto.');
    }

    Answers.insert({
      questionID: questionID,
      courseID: courseID,
      author: Meteor.userId(),
      text: text,
      agrees: [],
      disagrees: [],
      createdAt: new Date()
    });
  }
});
