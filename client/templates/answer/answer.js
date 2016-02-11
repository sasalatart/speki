Template.answer.events({
  'click .edit-answer': function(event) {
    Session.set('editingAnswer', this._id);
    Session.set('answerLength', this.text.length);
  },
  'submit .edit-answer-form': function(event) {
    event.preventDefault();
    Meteor.call('updateAnswer', this._id, event.target.text.value, errorCallback);
    Session.set('editingAnswer', null);
  },
  'keyup .edit-answer-form textarea': function(event) {
    Session.set('answerLength', event.target.value.length);
  },
  'click .edit-answer-cancel': function(event) {
    event.preventDefault();
    Session.set('editingAnswer', null);
  },
  'click .remove-answer': function(event) {
    Meteor.call('removeAnswer', this._id, errorCallback);
  },
  'click .agree': function(event) {
    Meteor.call('agree', this._id, errorCallback);
  },
  'click .disagree': function(event) {
    Meteor.call('disagree', this._id, errorCallback);
  }
});

Template.answer.helpers({
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
    return Session.equals('editingAnswer', this._id);
  },
  agrees: function() {
    return this.agrees.length;
  },
  disagrees: function() {
    return this.disagrees.length;
  },
  canAgree: function() {
    return this.agrees.indexOf(Meteor.userId()) === -1;
  },
  canDisagree: function() {
    return this.disagrees.indexOf(Meteor.userId()) === -1;
  },
  length: function() {
    return Session.get('answerLength') || 0;
  },
  illegalLength: function() {
    return Session.get('answerLength') > 1000;
  }
});
