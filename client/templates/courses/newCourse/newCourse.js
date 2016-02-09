Template.newCourse.rendered = function(){
  $('select.dropdown').dropdown();
};

Template.newCourse.events({
  'submit .new-course': function(event) {
    event.preventDefault();
    var initials = event.target.initials.value;
    var name = event.target.name.value;
    var school = event.target.school.value;
    var information = event.target.information.value;

    Meteor.call('addCourse', initials, name, school, information, errorCallback);

    event.target.initials.value = "";
    event.target.name.value = "";
    event.target.school.value = "";
    event.target.information.value = "";
  }
});

Template.newCourse.helpers({
  schools: function() {
    var options = { sort: { school: 1 }, fields: { school: true } };
    return _.uniq(Courses.find({}, options)
            .map(function(course) { return course.school; }), true);
  }
});
