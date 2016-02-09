Template.question.events({
  'click .edit-question': function(event) {
    Session.set('editingQuestion', this._id);
  },
  'submit .edit-question-form': function(event) {
    event.preventDefault();
    Meteor.call('updateQuestion', this._id, event.target.text.value, errorCallback);
    Session.set('editingQuestion', null);
  },
  'click .edit-question-cancel': function(event) {
    event.preventDefault();
    Session.set('editingQuestion', null);
  },
  'click .remove-question': function(event) {
    Meteor.call('removeQuestion', this._id, errorCallback);
  },
  'click .answer-question': function(event) {
    Session.set('answeringQuestion', this._id);
  },
  'submit .new-answer': function(event) {
    event.preventDefault();
    Meteor.call('addAnswer', this._id, this.courseID, event.target.text.value, errorCallback);
    Session.set('answeringQuestion', null);
  },
  'click .answer-question-cancel': function(event) {
    event.preventDefault();
    Session.set('answeringQuestion', null);
  },
  'click .toggle-subscription': function(event) {
    Meteor.call('toggleSubscription', this._id, errorCallback);
  }
});

Template.question.helpers({
  author: function() {
    return Meteor.users.findOne({ _id: this.author });
  },
  dateWritten: function() {
    return this.createdAt.toDateString();
  },
  isOwner: function() {
    return this.author === Meteor.userId();
  },
  hasPrivileges: function() {
    return this.author === Meteor.userId() || (Meteor.user() ? Meteor.user().admin : false);
  },
  isEditing: function() {
    return Session.equals('editingQuestion', this._id);
  },
  isAnswering: function() {
    return Session.equals('answeringQuestion', this._id);
  },
  hasAnswers: function() {
    return Answers.find({ questionID: this._id }).count() !== 0;
  },
  answers: function() {
    return Answers.find({ questionID: this._id });
  },
  subscribed: function() {
    return this.subscribers.indexOf(Meteor.userId()) !== -1;
  }
});
