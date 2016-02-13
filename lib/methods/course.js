Meteor.methods({
  addCourse: (initials, name, school, information) => {
    checkNonEmptyString(initials, 'La sigla', 4, 12);
    checkNonEmptyString(name, 'El nombre', 2, 100);
    checkNonEmptyString(school, 'La unidad', 4, 75);
    checkNonEmptyString(information, 'La descripción', 1, 1000);
    checkAdmin();

    Courses.insert({
      initials: initials,
      name: name,
      school: school,
      information: information
    });

    return { header: new Date().toLocaleString(), text: 'Ramo agregado (' + name + ').' }
  },
  updateCourse: (courseID, initials, name, school, information) => {
    check(courseID, String);
    checkNonEmptyString(initials, 'La sigla', 4, 12);
    checkNonEmptyString(name, 'El nombre', 2, 100);
    checkNonEmptyString(school, 'La unidad', 4, 75);
    checkNonEmptyString(information, 'La descripción', 1, 1000);
    checkAdmin();

    Courses.update({ _id: courseID }, { $set: { initials: initials,
                                                name: name,
                                                school: school,
                                                information: information} });

    return { header: new Date().toLocaleString(), text: 'Ramo editado (' + name + ').' }
  },
  removeCourse: courseID => {
    check(courseID, String);
    checkAdmin();

    Testimonies.remove({ courseID: courseID });
    Questions.remove({ courseID: courseID });
    Answers.remove({ courseID: courseID });
    Messages.remove({ courseID: courseID });
    Courses.remove({ _id: courseID });

    return { header: new Date().toLocaleString(), text: 'Ramo eliminado.' }
  }
});
