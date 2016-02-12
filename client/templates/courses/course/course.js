Template.course.events({
  'click .remove-course': function(event) {
    Meteor.call('removeCourse', this._id, errorCallback);
  },
  'click .edit-course': function(event) {
    $('.ui.modal').modal('show');
  },
  'click #testimonies': function(event) {
    Session.set('reading', 'testimonies');
    Session.set('newTestimonyLength', 0);
  },
  'click #questions': function(event) {
    Session.set('reading', 'questions');
    Session.set('newQuestionLength', 0);
  },
  'submit .new-testimony': function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call('addTestimony', this._id, text, errorCallback);
    event.target.text.value = "";
    Session.set('newTestimonyLength', 0);
  },
  'keyup #testimony-input': function(event) {
    Session.set('newTestimonyLength', event.target.value.length);
  },
  'submit .new-question': function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    Meteor.call('addQuestion', this._id, text, errorCallback);
    event.target.text.value = "";
    Session.set('newQuestionLength', 0);
  },
  'keyup #question-input': function(event) {
    Session.set('newQuestionLength', event.target.value.length);
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
  'activeTab': function(tabName) {
    return Session.equals('reading', tabName);
  },
  'testimonies': function() {
    return Testimonies.find({ courseID: this._id }, { sort: { createdAt: -1 } });
  },
  'questions': function() {
    return Questions.find({ courseID: this._id }, { sort: { createdAt: -1 } });
  },
  length: function(key) {
    return Session.get(key);
  },
  illegalLength: function(key, length) {
    return Session.get(key) > length;
  }
});
