Meteor.methods({
  toggleAdmin: userID => {
    check(userID, String);
    checkAdmin();

    if (Meteor.userId() === userID) {
      throw new Meteor.Error(403, 'No puedes cambiar tu propio estado de administrador.');
    }

    var user = Meteor.users.findOne({ _id: userID });
    Meteor.users.update({ _id: userID }, { $set: { admin: !user.admin } });

    if (!user.admin) {
      return { header: new Date().toLocaleString(), text: user.name + ' ahora es administrador.' }
    } else {
      return { header: new Date().toLocaleString(), text: user.name + ' dejó de ser administrador.' }
    }
  }
});
