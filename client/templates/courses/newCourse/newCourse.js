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

    Meteor.call('addCourse', initials, name, school, information, function(error, result) {
      if (error) {
        Notifications.error('Error' + error.error, error.reason);
      } else if (result) {
        Router.go('/');
        Notifications.success(name, 'Ramo agregado.');
      }
    });
  }
});

Template.newCourse.helpers({
  schools: function() {
    var options = { sort: { school: 1 }, fields: { school: true } };
    return _.uniq(Courses.find({}, options).map(course => course.school), true);
  }
});
