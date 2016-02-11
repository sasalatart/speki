# Speki

> Write your own UC course experiences, ask questions about them, answer your
friends', and rate these answers.

> Credits to [Patricio López](https://github.com/mrpatiwi) for his *Buscacursos
UC Scraper*.

### Setup

In order to monitor the app, make sure to have a [Kadira](https://kadira.io/)
account, register the app and get your `appId` and `appSecret`. In order to
enable logging in with Facebook, register your app at
[Developers.Facebook](https://developers.facebook.com/) and get your
corresponding `clientId` and `secret`, and complete the requested configuration.

Then, make sure to create and fill in `private/settings.json` with the following
JSON:

```javascript
{
  "facebook" : {
    "clientId": your-facebook-clientID,
    "secret": your-facebook-clientSecret
  },
  "kadira": {
    "appId": your-kadira-appID,
    "appSecret": your-kadira-appSecret
 }
}
```

##### Development

1. Make sure that at least [Meteor](https://www.meteor.com/install) and
[MongoDB](https://www.mongodb.org/) are installed.
2. Clone and cd into this repository
3. Run `meteor --settings private/settings.json`.

You may interact with the database by opening another shell instance and running
`meteor mongo`.

##### Production

1. Clone and cd into this repository
2. Run `meteor deploy any-domain.meteor.com --settings private/settings.json`
