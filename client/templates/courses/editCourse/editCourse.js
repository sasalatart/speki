Template.editCourse.rendered = function(){
  $('select.dropdown').dropdown();
};

Template.editCourse.events({
  'submit .edit-course-form': function(event) {
    event.preventDefault();

    var initials = event.target.initials.value;
    var name = event.target.name.value;
    var school = event.target.school.value;
    var information = event.target.information.value;

    Meteor.call('updateCourse', this._id, initials, name, school, information, errorCallback);
    $('.ui.modal').modal('hide');
  }
});

Template.editCourse.helpers({
  schools: function() {
    var options = { sort: { school: 1 }, fields: { school: true } };
    return _.uniq(Courses.find({}, options).map(course => course.school), true);
  }
});
