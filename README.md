# Speki

> Write your own UC course experiences, ask questions about them, answer your friends', and rate these answers.

> Credits to [Patricio López](https://github.com/mrpatiwi) for his *Buscacursos UC Scraper*.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Docker Automated build](https://img.shields.io/docker/automated/jrottenberg/ffmpeg.svg)](sasalatart/speki)
[![](https://images.microbadger.com/badges/version/sasalatart/speki.svg)](https://microbadger.com/images/sasalatart/speki)
[![](https://images.microbadger.com/badges/image/sasalatart/speki.svg)](https://microbadger.com/images/sasalatart/speki)

## Setup

In order to enable logging in with Facebook, register your app at [Developers.Facebook](https://developers.facebook.com/) and get your corresponding `clientId` and `secret`, and complete the requested configuration.

Then, make sure you export the following environment variables:

```sh
$ export FB_CLIENT_ID=your-Facebook-Client-ID
$ export FB_SECRET=your-Facebook-Client-Secret
```

#### Development

- Run `meteor run`
- You may interact with the database by opening another shell instance and running `meteor mongo`.

#### Docker

```sh
# Build
$ docker-compose build

# Run
$ docker-compose up -d
```

The server's machine should now be redirecting its port 80 to the container's port 80.

To stop:
```sh
$ docker-compose stop
```
