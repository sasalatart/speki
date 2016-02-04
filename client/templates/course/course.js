Template.course.onCreated(() => {
  Meteor.subscribe('course', currentCourse);
});
