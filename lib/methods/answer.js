Meteor.methods({
  updateAnswer: function(answerID, text) {
    check(answerID, String);
    check(text, String);

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

    Answers.remove(answerID);
  },
  agree: function(answerID) {
    check(answerID, String);

    var answer = Answers.findOne({ _id: answerID });

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'Debes iniciar sesión para hacer esto.');
    }

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

    var answer = Answers.findOne({ _id: answerID });

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'Debes iniciar sesión para hacer esto.');
    }

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
