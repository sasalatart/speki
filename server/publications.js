Meteor.publish('users', () => {
  var options = {
    fields: {
      _id: 1,
      'services.facebook.profile.name': 1,
      'services.facebook.profile.picture': 1,
    }
  };
  Meteor.users.find({}, options);
});
