Meteor.publish('users', () => {
  var options = {
    fields: {
      _id: 1,
      'profile.name': 1,
      'profile.picture': 1,
    }
  };
  return Meteor.users.find({}, options);
});

Meteor.publish('courses', () => {
  return Courses.find({});
});
