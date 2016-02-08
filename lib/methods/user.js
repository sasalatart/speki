Meteor.methods({
  'toggleAdmin': function(userID) {
    check(userID, String);

    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error(403, 'Debes ser administrador para realizar esto.');
    }

    if (Meteor.userId() === userID) {
      throw new Meteor.Error(403, 'No puedes cambiar tu propio estado de administrador.');
    }

    var user = Meteor.users.findOne({ _id: userID });
    Meteor.users.update({ _id: userID }, { $set: { admin: !user.admin } });
  }
});
