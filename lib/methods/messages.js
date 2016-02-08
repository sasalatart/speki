Meteor.methods({
  'removeMessage': messageID => {
    Messages.remove({ _id: messageID });
  }
});
