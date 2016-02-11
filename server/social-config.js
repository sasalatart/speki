configureFacebook = function(config) {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

 ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: config.clientId,
    secret: config.secret
  });
};

if (Meteor.settings.facebook) {
  configureFacebook(Meteor.settings.facebook);
}

Accounts.onCreateUser((options, user) => {
  user.admin = (Meteor.users.find().count() === 0);

  if (options.profile) {
    options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=normal";
    user.profile = options.profile;
  }
  return user;
});
