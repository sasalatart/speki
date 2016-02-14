Template.questionFeed.rendered = function() {
  $('.dimmable').dimmer({ on: 'hover' });
};

Template.questionFeed.helpers({
  author: function() {
    return Meteor.users.findOne({ _id: this.author });
  },
  dateWritten: function() {
    return getDate(this.createdAt);
  },
  parentCourse: function() {
    return Courses.findOne({ _id: this.courseID });
  }
});
