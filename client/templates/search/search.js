Template.search.destroyed = function() {
  delete Session.keys['searchCourseText'];
};

Template.search.events({
  'keyup .search-input': function(event) {
    Session.set('searchCourseText', event.target.value);
  }
});

Template.search.helpers({
  courses: function() {
    var searchText = Session.get('searchCourseText');
    if (searchText) {
      $('.feed').slideUp();
      var parts = searchText.trim().split(/[\-\:]+/);
      var regExp = new RegExp("\^(" + parts.join('|') + ")", "ig");
      var selector = {
        $or: [{ initials: regExp }, { name: regExp }]
      };
      var options = { limit: 15 };

      return Courses.find(selector, options).fetch();
    } else {
      $('.feed').slideDown('slow');
    }
  }
});
