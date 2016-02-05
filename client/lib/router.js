Router.configure({
  layoutTemplate: 'appLayout'
});

Router.route('/', {
  template: 'landingPage'
});

Router.route('/courses/:_id', {
  name: 'coursePage',
  template: 'course',
  data: function() {
    currentCourse = this.params._id;
    return Courses.findOne({ _id: currentCourse });
  }
});
