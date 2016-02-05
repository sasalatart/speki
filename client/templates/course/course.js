Template.course.onCreated(() => {
  Meteor.subscribe('course', currentCourse);
  Meteor.subscribe('testimonies', currentCourse);
  Meteor.subscribe('questions', currentCourse);
  Session.set('reading', 'testimonies');
});

Template.course.events({
  'click #testimonies': function(event) {
    Session.set('reading', 'testimonies');
  },
  'click #questions': function(event) {
    Session.set('reading', 'questions');
  },
  'submit .new-testimony': function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call("addTestimony", currentCourse, text);
    event.target.text.value = "";
  },
  'submit .new-question': function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call("addQuestion", currentCourse, text);
    event.target.text.value = "";
  }
});

Template.course.helpers({
  'testimoniesActive': function() {
    return Session.equals('reading', 'testimonies');
  },
  'questionsActive': function() {
    return Session.equals('reading', 'questions');
  },
  'testimonies': function() {
    return Testimonies.find({ courseID: currentCourse });
  },
  'questions': function() {
    return Questions.find({ courseID: currentCourse });
  }
});
