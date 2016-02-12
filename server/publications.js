Meteor.publish('courses', function() {
  var options = { fields: { _id: 1, 'initials': 1, 'name': 1 } };
  return Courses.find({}, options);
});

Meteor.publish('users', function() {
  var options = { fields: { _id: 1, 'profile.name': 1, 'profile.picture': 1, admin: 1 } };
  return Meteor.users.find({}, options);
});

Meteor.publish('course', function(_id) {
  return Courses.find({ _id: _id });
});

Meteor.publish('testimonies', function(courseID) {
  return Testimonies.find({ courseID: courseID });
});

Meteor.publish('questions', function(courseID) {
  return Questions.find({ courseID: courseID });
});

Meteor.publish('answers', function(courseID) {
  return Answers.find({ courseID: courseID });
});

Meteor.publish('messages', function() {
  return Messages.find({ receiver: this.userId });
});

Meteor.publish('messages-answers', function() {
  var mySubscribedQuestions = Questions.find({ subscribers: this.userId })
    .fetch()
    .map(question => question._id);

  return Answers.find({ questionID: { $in: mySubscribedQuestions } });
});

Meteor.publish('recent-questions', function() {
  var options = { sort: { createdAt : -1 }, limit: 20 };
  return Questions.find({}, options);
});
