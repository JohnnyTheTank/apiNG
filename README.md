_**Note:** apiNG is currently under development and not ready yet for public use. **Release in January 2016**_

[logo]: http://aping.io/logo/320/aping-logo.png "apiNG"
![apiNG][logo]

[![Join the chat at https://gitter.im/JohnnyTheTank/apiNG](https://badges.gitter.im/JohnnyTheTank/apiNG.svg)](https://gitter.im/JohnnyTheTank/apiNG?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Stories in Ready](https://badge.waffle.io/JohnnyTheTank/apiNG.svg?label=ready&title=Ready)](http://waffle.io/JohnnyTheTank/apiNG)
[![Code Climate](https://codeclimate.com/github/JohnnyTheTank/apiNG/badges/gpa.svg)](https://codeclimate.com/github/JohnnyTheTank/apiNG)

**apiNG** is an AngularJS directive for receiving and displaying data from any source, like REST APIs, JSON files or just simple JavaScript objects.

## How apiNG works
**apiNG** works as extendable platform, composed of three components:
 1. **_plugins_** pass various data on to **apiNG**
 2. **apiNG** passes the data on to **_designs_**
 3. **_designs_** display the data

Users can collaborate to create new **_plugins_** and **_designs_**

## Demos
- [Social Wall](http://aping.io/#demo) (default design)
- [Image Gallery](https://rawgit.com/JohnnyTheTank/apiNG-design-xgallerify/master/demo/) (xgallerify design)
- [Youtube Video Player](https://rawgit.com/JohnnyTheTank/apiNG-design-deadwood/master/demo/) (deadwood design)

## References
- [Sonymusic.de/videos](https://sonymusic.de/videos) (Youtube video playlist & player) based on apiNG

## Documentation
**Full documentation comes up at [aping.readme.io](https://aping.readme.io)**

## Plugins
- **SOCIAL MEDIA SOURCES**
     - [x] **Youtube** ([apiNG-plugin-youtube](https://github.com/JohnnyTheTank/apiNG-plugin-youtube))
        - converts to this models: `social`, `video`
     - [x] **Instagram** ([apiNG-plugin-instagram](https://github.com/JohnnyTheTank/apiNG-plugin-instagram))
        - converts to this models: `social`, `video`, `image`
     - [x] **Facebook** ([apiNG-plugin-facebook](https://github.com/JohnnyTheTank/apiNG-plugin-facebook))
        - converts to this models: `social`, `video`, `image`, `event`
     - [x] **Twitter** ([apiNG-plugin-codebird](https://github.com/JohnnyTheTank/apiNG-plugin-codebird))
        - converts to this models: `social`, `image`
     - [x] **Vimeo** ([apiNG-plugin-vimeo](https://github.com/JohnnyTheTank/apiNG-plugin-vimeo))
        - converts to this models: `social`, `video`
     - [x] **Flickr** ([apiNG-plugin-flickr](https://github.com/JohnnyTheTank/apiNG-plugin-flickr))
        - converts to this models: `social`, `image`
     - [x] **Dailymotion** ([apiNG-plugin-dailymotion](https://github.com/JohnnyTheTank/apiNG-plugin-dailymotion))
        - converts to this models: `social`, `video`
     - [x] **Tumblr** ([apiNG-plugin-tumblr](https://github.com/JohnnyTheTank/apiNG-plugin-tumblr))
        - converts to this models: `social`, `video`, `image`
 - **OTHER REST API SOURCES**
     - [x] **GitHub** ([apiNG-plugin-github](https://github.com/JohnnyTheTank/apiNG-plugin-github))
        - converts to this models: `repo`
     - [x] **OpenWeatherMap** ([apiNG-plugin-openweathermap](https://github.com/JohnnyTheTank/apiNG-plugin-openweathermap))
        - converts to this models: `weather`
     - [x] **BandsInTown** ([apiNG-plugin-bandsintown](https://github.com/JohnnyTheTank/apiNG-plugin-bandsintown))
        - converts to this models: `event`
 - **OTHER DYNAMIC SOURCES**
    - [x] **RSS feeds** ([apiNG-plugin-rss](https://github.com/JohnnyTheTank/apiNG-plugin-rss))
        - converts to this models: `social`, `native`
 - **FILE SOURCES**
    - [x] **JSON file** ([apiNG-plugin-jsonloader](https://github.com/JohnnyTheTank/apiNG-plugin-jsonloader))
        - supports any model
 - **OTHER STATIC SOURCES**
    - [x] **JavaScript array** ([apiNG-plugin-ngArray](https://github.com/JohnnyTheTank/apiNG-plugin-ngArray))
        - supports any model
 - _and much more coming ..._

## Designs
- [x] **[default](https://github.com/JohnnyTheTank/apiNG-design-default)** (masonry layout)
    - displays this models: `social`, `video`, `image`, `event`, `repo`
- [x] **[xgallerify](https://github.com/JohnnyTheTank/apiNG-design-xgallerify)** (xGallerify layout)
    - displays this models: `image`
- [x] **[deadwood](https://github.com/JohnnyTheTank/apiNG-design-deadwood)** (youtube player)
    - displays this models: `video`
        - only from youtube
- _and much more coming ..._

# Contributors
- Jonathan Hornung ([JohnnyTheTank](https://github.com/JohnnyTheTank))
    - Core, Plugins, Designs, Docs
- Daniel Moon ([teadragon](https://github.com/teadragon))
    - Logos