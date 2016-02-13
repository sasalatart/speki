Template.users.events({
  'keyup .search-input': function(event) {
    Session.set('searchUserText', event.target.value);
  }
});

Template.users.helpers({
  users: function() {
    var searchText = Session.get('searchUserText');
    if (searchText) {
      var parts = searchText.trim().split(/[\-\:]+/);
      var regExp = new RegExp("\^(" + parts.join('|') + ")", "ig");
      return Meteor.users.find({ 'name': regExp });
    } else {
      return Meteor.users.find();
    }
  }
});
