Template.user.events({
  'click .admin-toggler': function(event) {
    Meteor.call('toggleAdmin', this._id, errorCallback);
  }
});

Template.user.helpers({
  notAdmin: function() {
    return !this.admin;
  }
});
