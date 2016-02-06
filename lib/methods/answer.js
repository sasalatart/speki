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

    if (Meteor.userId() !== answer.author) {
      throw new Meteor.Error(403, 'No eres el autor de esta respuesta.');
    }

    Answers.remove(answerID);
  }
});
