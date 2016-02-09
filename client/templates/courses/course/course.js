Template.course.onCreated(function() {
  Session.set('reading', 'questions');
});

Template.course.events({
  'click .remove-course': function(event) {
    Meteor.call('removeCourse', this._id, errorCallback);
  },
  'click .edit-course': function(event) {
    $('.ui.modal').modal('show');
  },
  'click #testimonies': function(event) {
    Session.set('reading', 'testimonies');
  },
  'click #questions': function(event) {
    Session.set('reading', 'questions');
  },
  'submit .new-testimony': function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call('addTestimony', this._id, text, errorCallback);
    event.target.text.value = "";
  },
  'submit .new-question': function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call('addQuestion', this._id, text, errorCallback);
    event.target.text.value = "";
  }
});

Template.course.helpers({
  'getInformation': function() {
    if (this.information === '0') {
      return 'Descripción no disponible para este ramo.'
    } else {
      return this.information;
    }
  },
  'testimoniesActive': function() {
    return Session.equals('reading', 'testimonies');
  },
  'questionsActive': function() {
    return Session.equals('reading', 'questions');
  },
  'testimonies': function() {
    return Testimonies.find({ courseID: this._id });
  },
  'questions': function() {
    return Questions.find({ courseID: this._id });
  }
});
