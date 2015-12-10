_**Note:** apiNG is under development and not ready for public usage. **Release in early 2016**_

# apiNG

**apiNG** is an AngularJS directive for receiving and displaying data from any source, like REST APIs, JSON files or just simple JavaScript arrays.

## Demos
- [Social Wall](http://johnnythetank.github.io/apiNG/#demo) (default design)
- [Image Gallery](https://rawgit.com/JohnnyTheTank/apiNG-design-xgallerify/master/demo/) (xgallerify design)
- [Youtube Video Player](https://rawgit.com/JohnnyTheTank/apiNG-design-deadwood/master/demo/) (deadwood design)

## How it works

apiNG works as plugin platform:
 1. **_plugins_** commit any data to  **apiNG**
 2. **apiNG** commits the data to **_designs_**
 3. **_designs_** display the data

everybody can create **_plugins_** and **_designs_**

## Current status

### Plugins (sources)
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
     - [x] **Vine** ([apiNG-plugin-vine](https://github.com/JohnnyTheTank/apiNG-plugin-vine))
        - converts to this models: `social`, `video`
     - [ ] [Google+](https://developers.google.com/+/web/api/rest/latest/), [Flickr](https://www.flickr.com/services/api/), [Dailymotion](https://developer.dailymotion.com/api), [Tumblr](https://www.tumblr.com/docs/en/api/v2), [Vk](http://vk.com/dev), [Pinterest](https://developers.pinterest.com/docs/getting-started/introduction/), [500px](https://github.com/500px/api-documentation), [Picasa](https://developers.google.com/picasa-web/docs/2.0/reference) ([Blogger](https://developers.google.com/blogger/docs/3.0/using), [Delicious](https://github.com/SciDevs/delicious-api), [Skyrock](http://www.skyrock.com/developer/documentation/))
 - **OTHER REST API SOURCES**
     - [x] **GitHub** ([apiNG-plugin-github](https://github.com/JohnnyTheTank/apiNG-plugin-github))
        - converts to this models: `repo`
     - [ ] [Spotify](https://developer.spotify.com/web-api/),
     [iTunes](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html),
     [Soundcloud](https://developers.soundcloud.com/docs),
     [BandsInTown](https://www.bandsintown.com/api/overview),
     [Eventbrite](http://developer.eventbrite.com/),
     [Wunderlist](https://developer.wunderlist.com/documentation),
     [Amazon Wishlists](https://github.com/doitlikejustin/amazon-wish-lister),
     [Wetter.com](http://www.wetter.com/apps_und_mehr/website/api/),
     [Weather Underground](http://www.wunderground.com/weather/api/),
     [OpenWeatherMap](http://openweathermap.org/api),
     [Faroo](http://www.faroo.com/hp/api/api.html#json),
     [HackerNews](https://github.com/HackerNews/API),
     [New York Times](http://developer.nytimes.com/docs/read/times_newswire_api),
     ([EventFul](http://api.eventful.com/docs/formats),
     [Gigulate](http://gigulate.com/api/),
     [OpenLigaDB](http://www.openligadb.de/Help),
     [Wikipedia/Wikimedia](https://www.mediawiki.org/wiki/API:Main_page/de)
     [Yahoo](https://developer.yahoo.com/boss/search/),
     [Bing](http://www.bing.com/developers/s/APIBasics.html),
     [EchoNest](http://developer.echonest.com/docs/v4),
     [GettyImages](http://developers.gettyimages.com/api/docs/),
     [Rdio](http://www.rdio.com/developers/docs/),
     [Rhapsody](https://developer.rhapsody.com/api))
 - **OTHER DYNAMIC SOURCES**
    - [ ] [RSS feeds](http://cyber.law.harvard.edu/rss/rss.html)
 - **FILE SOURCES**
    - [x] **JSON file** ([apiNG-plugin-jsonloader](https://github.com/JohnnyTheTank/apiNG-plugin-jsonloader))
        - supports any model
    - [ ] XML file
 - **OTHER STATIC SOURCES**
    - [x] **JavaScript array** ([apiNG-plugin-ngArray](https://github.com/JohnnyTheTank/apiNG-plugin-ngArray))
        - supports any model
 - _and much more coming ..._
    
### Models
 - [x] `social`
 - [x] `video`
 - [x] `image`
 - [x] `event`
 - [x] `repo`
 - [ ] `post`, `news`, `link`, `product`, `activity`, `match`, `rank`, `task`, `weather`
 - _and much more coming ..._
    
### Designs
 - [x] **[default](https://github.com/JohnnyTheTank/apiNG-design-default)** (masonry layout)
    - displays this models: `social`, `image`, `event`
 - [x] **[xgallerify](https://github.com/JohnnyTheTank/apiNG-design-xgallerify)** (xGallerify layout)
    - displays this models: `image`
 - [x] **[deadwood](https://github.com/JohnnyTheTank/apiNG-design-deadwood)** (youtube player)
    - displays this models: `video`
        - only from youtube
 - _and much more coming ..._

### Documentation
_Full documentation coming soon ..._

# Community
create your own **_plugins_** or **_designs_** by this samples:
- [apiNG-plugin-sample](https://github.com/JohnnyTheTank/apiNG-plugin-sample)
- [apiNG-design-sample](https://github.com/JohnnyTheTank/apiNG-design-sample)

# Contributors
- Jonathan Hornung ([JohnnyTheTank](https://github.com/JohnnyTheTank))
    - core system
