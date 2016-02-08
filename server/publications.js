Meteor.publish('users', () => {
  var options = {
    fields: {
      _id: 1,
      'profile.name': 1,
      'profile.picture': 1,
      admin: 1
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
  return Courses.find({ _id: _id });
});

Meteor.publish('testimonies', courseID => {
  return Testimonies.find({ courseID: courseID });
});

Meteor.publish('questions', courseID => {
  return Questions.find({ courseID: courseID });
});

Meteor.publish('answers', courseID => {
  return Answers.find({ courseID: courseID });
});

Meteor.publish('messages', function() {
  return Messages.find({ receiver: this.userId });
});
