subs = new SubsManager({
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
  loadingTemplate: 'loadingTemplate',
  waitOn: function() {
    Meteor.subscribe('courses');
    Meteor.subscribe('users');
    Tracker.autorun(function() {
      Meteor.subscribe('messages', Meteor.userId(), {
        onReady: function() {
          var messages = Messages.find({ receiver: Meteor.userId() });
          messages.observeChanges({
            added: function(id, message) {
              if (!message.read) {
                var text = Meteor.users.findOne({ _id: message.notificator }).profile.name;
                text += ' ha escrito en ';
                text += Courses.findOne({ _id: message.courseID }).name;
                Notifications.info('Nueva respuesta', text);
              }
            }
          });
        }
      });
    });
  }
});

Router.route('/', {
  name: 'landingPage',
  template: 'landingPage',
  fastRender: true,
  waitOn: function() {
    return subs.subscribe('recent-questions');
  }
});

Router.route('/courses/new', {
  name: 'newCoursePage',
  template: 'newCourse',
  fastRender: true
});

Router.route('/courses/:_id', {
  name: 'coursePage',
  template: 'course',
  fastRender: true,
  data: function() {
    return Courses.findOne({ _id: this.params._id });
  },
  waitOn: function() {
    subs.subscribe('course', this.params._id);
    subs.subscribe('testimonies', this.params._id);
    subs.subscribe('questions', this.params._id);
    return subs.subscribe('answers', this.params._id);
  },
  onAfterAction: function() {
    Session.set('reading', 'questions');
    Session.set('newTestimonyLength', 0);
    Session.set('newQuestionLength', 0);
    if (Meteor.userId()) {
      Meteor.call('removeCourseMessages', this.params._id, errorCallback);
    }
  }
});

Router.route('/users', {
  name: 'usersPage',
  template: 'users',
  fastRender: true
});

Router.route('/notificationMessages', {
  name: 'notificationMessagesPage',
  template: 'notificationMessages',
  fastRender: true,
  waitOn: function() {
    return Meteor.subscribe('messages-answers');
  }
});

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['messagesPage']
});

Router.onBeforeAction(OnBeforeActions.adminRequired, {
  only: ['newCoursePage', 'usersPage']
});
