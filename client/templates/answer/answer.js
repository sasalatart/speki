Template.question.events({
  'click .edit-answer': function(event) {
    Session.set('editingAnswer', this._id);
  },
  'submit .edit-answer-form': function(event) {
    event.preventDefault();
    Meteor.call('updateAnswer', this._id, event.target.text.value);
    Session.set('editingAnswer', null);
  },
  'click .edit-answer-cancel': function(event) {
    event.preventDefault();
    Session.set('editingAnswer', null);
  },
  'click .remove-answer': function(event) {
    Meteor.call('removeAnswer', this._id);
  },
  'click .agree': function(event) {
    Meteor.call('agree', this._id);
  },
  'click .disagree': function(event) {
    Meteor.call('disagree', this._id);
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
    return this.agrees.indexOf(this.author) === -1;
  },
  canDisagree: function() {
    return this.disagrees.indexOf(this.author) === -1;
  }
});
