Meteor.methods({
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

    Testimonies.remove(testimonyID);
  }
});
