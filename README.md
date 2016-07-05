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
  "kadira": {
    "appId": your-kadira-appID,
    "appSecret": your-kadira-appSecret
 }
}
```

as well as exporting the following environment variables:

```sh
$ export SPEKI_FB_CLIENT_ID=your-Facebook-Client-ID
$ export SPEKI_FB_SECRET=your-Facebook-Client-Secret
```

##### Development

1. Make sure that at least [Meteor](https://www.meteor.com/install) and
[MongoDB](https://www.mongodb.org/) are installed.
2. Run `meteor --settings private/settings.json`.

You may interact with the database by opening another shell instance and running
`meteor mongo`.

##### Docker

```sh
# Build
$ docker-compose build

# Run
$ docker-compose up -d
```

The server's machine should now be redirecting its port 80 to the container's
port 80.

To stop:
```sh
$ docker-compose stop
```
