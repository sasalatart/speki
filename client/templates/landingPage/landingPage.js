Template.landingPage.helpers({
  recentQuestions: function() {
    return Questions.find();
  }
});
