Meteor.methods({
  addTestimony: (courseID, text) => {
    check(courseID, String)
    check(text, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error(403, 'Debes iniciar sesión para hacer esto.');
    }

    Testimonies.insert({
      courseID: courseID,
      author: Meteor.userId(),
      text: text
    });
  }
});
