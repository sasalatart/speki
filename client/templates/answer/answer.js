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
  }
});

Template.answer.helpers({
  author: function() {
    return Meteor.users.findOne({ _id: this.author });
  },
  isOwner: function() {
    return this.author === Meteor.userId();
  },
  dateWritten: function() {
    return this.createdAt.toDateString();
  },
  isEditing: function() {
    return Session.equals('editingAnswer', this._id);
  }
});
