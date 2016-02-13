Meteor.publish('users', function() {
  this.unblock();
  var usersOptions = { fields: { _id: 1, 'admin': 1, 'name': 1, 'picture': 1 } };
  return Meteor.users.find({}, usersOptions);
});

Meteor.publish('courses', function() {
  this.unblock();
  var coursesOptions = { fields: { _id: 1, 'initials': 1, 'name': 1, 'school': 1 } };
  return Courses.find({}, coursesOptions);
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
  var questionsQuery = { subscribers: this.userId };
  var subscribedQuestions = Questions.find(questionsQuery).fetch().map(question => question._id);

  var answersQuery = { questionID: { $in: subscribedQuestions } };
  return Answers.find(answersQuery);
});

Meteor.publish('recent-questions', function() {
  var recentQuestionsOptions = { sort: { createdAt : -1 }, limit: 20 };
  return Questions.find({}, recentQuestionsOptions);
});
