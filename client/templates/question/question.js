Template.question.helpers({
  author: function() {
    return Meteor.users.findOne({ _id: this.author });
  },
  isOwner: function() {
    return this.author === Meteor.userId();
  },
  isEditing: function() {
    return Session.equals('editingQuestion', this._id);
  },
  dateWritten: function() {
    return this.createdAt.toDateString();
  }
});

Template.question.events({
  'click .edit-question': function(event) {
    Session.set('editingQuestion', this._id);
  },
  'submit .edit-question-form': function(event) {
    event.preventDefault();
    Meteor.call('updateQuestion', this._id, event.target.text.value);
    Session.set('editingQuestion', null);
  },
  'click .edit-question-cancel': function(event) {
    event.preventDefault();
    Session.set('editingQuestion', null);
  },
  'click .remove-question': function(event) {
    Meteor.call('removeQuestion', this._id);
  }
});
