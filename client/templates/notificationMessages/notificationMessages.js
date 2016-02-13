Template.notificationMessages.helpers({
  anyMessage: function() {
    return Messages.find().count() !== 0;
  },
  messages: function() {
    return Messages.find();
  }
});
