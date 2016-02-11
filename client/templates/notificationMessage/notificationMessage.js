Template.notificationMessage.rendered = function() {
  $('.dimmable').dimmer({ on: 'hover' });
};

Template.notificationMessage.helpers({
  notificator: function() {
    return Meteor.users.findOne({ _id: this.notificator });
  },
  course: function() {
    return Courses.findOne({ _id: this.courseID });
  },
  answer: function() {
    return Answers.findOne({ _id: this.answerID });
  },
  url: function() {
    return '/courses/' + this.courseID + '#' + this.answerID;
  }
});
