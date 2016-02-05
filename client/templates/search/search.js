Template.landingPage.onDestroyed(() => {
  delete Session.keys['searchText'];
});

Template.search.events({
  'keyup .search-input': function(event) {
    Session.set('searchText', event.target.value);
  }
});

Template.search.helpers({
  courses: function() {
    var searchText = Session.get('searchText');
    if (searchText) {
      var parts = searchText.trim().split(/[\-\:]+/);
      var regExp = new RegExp("\^(" + parts.join('|') + ")", "ig");
      var selector = {
        $or: [{ initials: regExp }, { name: regExp }]
      };
      var options = { limit: 15 };

      return Courses.find(selector, options).fetch();
    } else {
      return;
    }
  }
});
