Meteor.methods({
  addTestimony: (courseID, text) => {
    check(courseID, String);
    checkNonEmptyString(text, 'El testimonio');
    checkLoggedIn();

    Testimonies.insert({
      courseID: courseID,
      author: Meteor.userId(),
      text: text,
      createdAt: new Date()
    });

    return { header: new Date(), text: 'Testimonio agregado.' }
  },
  updateTestimony: (testimonyID, text) => {
    check(testimonyID, String);
    checkNonEmptyString(text, 'El testimonio');

    var testimony = Testimonies.findOne({ _id: testimonyID });

    if (Meteor.userId() !== testimony.author) {
      throw new Meteor.Error(403, 'No eres el autor de este testimonio.');
    }

    Testimonies.update({ _id: testimonyID }, { $set: { text: text } });

    return { header: new Date(), text: 'Testimonio editado.' }
  },
  removeTestimony: testimonyID => {
    check(testimonyID, String);

    var testimony = Testimonies.findOne({ _id: testimonyID });

    if (Meteor.userId() !== testimony.author && !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para eliminar este testimonio.');
    }

    Testimonies.remove({ _id: testimonyID });

    return { header: new Date(), text: 'Testimonio eliminado.' }
  }
});
