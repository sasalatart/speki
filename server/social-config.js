configureFacebook = function(config) {
  ServiceConfiguration.configurations.remove({
    service: "facebook"
  });

  ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: process.env.SPEKI_FB_CLIENT_ID,
    secret: process.env.SPEKI_FB_SECRET
  });
};

configureFacebook(Meteor.settings.facebook);

Accounts.onCreateUser((options, user) => {
  if (options.profile) {
    user.admin = false;
    user.name = options.profile.name;
    user.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=normal";
  }

  return user;
});
