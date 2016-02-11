Template.testimony.events({
  'click .edit-testimony': function(event) {
    Session.set('editingTestimony', this._id);
    Session.set('testimonyLength', this.text.length);
  },
  'submit .edit-testimony-form': function(event) {
    event.preventDefault();
    Meteor.call('updateTestimony', this._id, event.target.text.value, errorCallback);
    Session.set('editingTestimony', null);
  },
  'keyup .edit-testimony-form textarea': function(event) {
    Session.set('testimonyLength', event.target.value.length);
  },
  'click .edit-testimony-cancel': function(event) {
    event.preventDefault();
    Session.set('editingTestimony', null);
  },
  'click .remove-testimony': function(event) {
    Meteor.call('removeTestimony', this._id, errorCallback);
  }
});

Template.testimony.helpers({
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
    return Session.equals('editingTestimony', this._id);
  },
  length: function() {
    return Session.get('testimonyLength') || 0;
  },
  illegalLength: function() {
    return Session.get('testimonyLength') > 1000;
  }
});
