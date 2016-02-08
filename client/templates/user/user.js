Template.user.events({
  'click .admin-toggler': function(event) {
    Meteor.call('toggleAdmin', this._id);
  }
});

Template.user.helpers({
  admin: function() {
    return Meteor.user().admin
  },
  notAdmin: function() {
    return !this.admin;
  }
});
