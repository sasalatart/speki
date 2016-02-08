Meteor.methods({
  addTestimony: (courseID, text) => {
    check(courseID, String);
    check(text, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'Debes iniciar sesión para hacer esto.');
    }

    Testimonies.insert({
      courseID: courseID,
      author: Meteor.userId(),
      text: text,
      createdAt: new Date()
    });
  },
  updateTestimony: function(testimonyID, text) {
    check(testimonyID, String);
    check(text, String);

    var testimony = Testimonies.findOne({ _id: testimonyID });

    if (Meteor.userId() !== testimony.author) {
      throw new Meteor.Error(403, 'No eres el autor de este testimonio.');
    }

    Testimonies.update({ _id: testimonyID }, { $set: { text: text } });
  },
  removeTestimony: function(testimonyID) {
    check(testimonyID, String);

    var testimony = Testimonies.findOne({ _id: testimonyID });

    if (Meteor.userId() !== testimony.author && !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para eliminar este testimonio.');
    }

    Testimonies.remove({ _id: testimonyID });
  }
});
