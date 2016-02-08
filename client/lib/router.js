var subs = new SubsManager({
  cacheLimit: 20, // only 20 most recent subscriptions will be cached
  expireIn: 10 // any subscription will expire after 10 minutes of inactivity
});

var OnBeforeActions = {
  adminRequired: function() {
    if (Meteor.userId() && Meteor.user().admin) {
      this.next();
    } else {
      Router.go('/');
    }
  }
};

Router.configure({
  layoutTemplate: 'appLayout'
});

Router.route('/', {
  template: 'landingPage'
});

Router.route('/courses/new', {
  name: 'newCoursePage',
  template: 'newCourse'
});

Router.route('/courses/:_id', {
  name: 'coursePage',
  template: 'course',
  data: function() {
    return Courses.findOne({ _id: this.params._id });
  },
  waitOn: function() {
    subs.subscribe('course', this.params._id);
    subs.subscribe('testimonies', this.params._id);
    subs.subscribe('questions', this.params._id);
    subs.subscribe('answers', this.params._id);
  }
});

Router.route('/users', {
  name: 'usersPage',
  template: 'users'
});

Router.onBeforeAction(OnBeforeActions.adminRequired, {
  only: ['newCoursePage', 'usersPage']
});
