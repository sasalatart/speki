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
  var options = {
    fields: {
      _id: 1,
      'initials': 1,
      'name': 1,
      'school': 1
    }
  }

  return Courses.find({}, options);
});

Meteor.publish('course', _id => {
  var options = {
    fields: {
      _id: 1,
      'initials': 1,
      'name': 1,
      'school': 1,
      'information': 1
    }
  }

  return Courses.find({ _id: _id }, options);
})
