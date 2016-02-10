var subs = new SubsManager({
  cacheLimit: 20, // only 20 most recent subscriptions will be cached
  expireIn: 10 // any subscription will expire after 10 minutes of inactivity
});

var OnBeforeActions = {
  loginRequired: function() {
    if (Meteor.userId()) {
      this.next();
    } else {
      Router.go('/');
      Notifications.error('No autorizado', 'Debes iniciar sesión para esto.');
    }
  },
  adminRequired: function() {
    if (Meteor.userId() && Meteor.user().admin) {
      this.next();
    } else {
      Router.go('/');
      Notifications.error('No autorizado', 'Debes ser administrador para esto.');
    }
  }
};

Router.configure({
  layoutTemplate: 'layoutTemplate',
  loadingTemplate: 'loadingTemplate'
});

Router.route('/', {
  template: 'landingPage',
  waitOn: function() {
    subs.subscribe('recent-questions');
  }
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
  },
  onAfterAction: function() {
    Session.set('reading', 'questions');
    Meteor.call('removeCourseMessages', this.params._id, errorCallback);
  }
});

Router.route('/users', {
  name: 'usersPage',
  template: 'users'
});

Router.route('/notificationMessages', {
  name: 'notificationMessagesPage',
  template: 'notificationMessages',
  waitOn: function() {
    subs.subscribe('answers');
  }
});

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['messagesPage']
});

Router.onBeforeAction(OnBeforeActions.adminRequired, {
  only: ['newCoursePage', 'usersPage']
});
