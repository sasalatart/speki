ServiceConfiguration.configurations.remove({
  service: 'facebook'
});

ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: process.env.SPEKI_FB_ID,
  secret: process.env.SPEKI_FB_SECRET
});

Accounts.onCreateUser((options, user) => {
  user.admin = (Meteor.users.find().count() === 0);

  if (options.profile) {
    options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=normal";
    user.profile = options.profile;
  }
  return user;
});
