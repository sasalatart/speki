Template.landingPage.helpers({
  recentQuestions: function() {
    return Questions.find({}, { sort: { createdAt : -1 } });
  }
});
