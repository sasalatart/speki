Meteor.methods({
  addCourse: (initials, name, school, information) => {
    check(initials, String);
    check(name, String);
    check(school, String);
    check(information, String);

    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para crear este ramo.');
    }

    Courses.insert({
      initials: initials,
      name: name,
      school: school,
      information: information
    });
  },
  updateCourse: (courseID, initials, name, school, information) => {
    check(courseID, String);
    check(initials, String);
    check(name, String);
    check(school, String);
    check(information, String);

    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para editar este ramo.');
    }

    Courses.update({ _id: courseID }, { $set: { initials: initials,
                                                name: name,
                                                school: school,
                                                information: information} });
  },
  removeCourse: courseID => {
    check(courseID, String);

    if (!Meteor.userId() || !Meteor.user().admin) {
      throw new Meteor.Error(403, 'No tienes permiso para eliminar este ramo.');
    }

    Testimonies.remove({ courseID: courseID });
    Questions.remove({ courseID: courseID });
    Answers.remove({ courseID: courseID });
    Courses.remove({ _id: courseID });
  }
});
