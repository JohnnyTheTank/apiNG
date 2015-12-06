_**Note:** apiNG is under development and not ready for public usage_

# apiNG

**apiNG** is an AngularJS directive for receiving and displaying data from any source, like REST APIs, JSON files or just simple JavaScript arrays.

# Demo
[Simple demo](http://johnnythetank.github.io/apiNG/#demo) (social wall)

## How it works?

apiNG works as plugin platform.
 - **_plugins_** receive and covert some data to any **_model_** and commit the result to **apiNG**
 - **_designs_** receive the result from **apiNG** and display the **_model's_** data

everybody can create **_plugins_**, **_models_** and **_designs_**

## Current status

### Plugins (sources)
 - **REST API SOURCES (Social Media)**
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
     - [ ] [Google+](https://developers.google.com/+/web/api/rest/latest/), [Flickr](https://www.flickr.com/services/api/), [Dailymotion](https://developer.dailymotion.com/api), [Tumblr](https://www.tumblr.com/docs/en/api/v2), [Vine](https://github.com/starlock/vino/wiki/API-Reference), [Vk](http://vk.com/dev) ([Blogger](https://developers.google.com/blogger/docs/3.0/using))
 - **REST API SOURCES (Other)**
     - [ ] [Spotify](https://developer.spotify.com/web-api/), [GitHub](https://developer.github.com/v3/), [BandsInTown](https://www.bandsintown.com/api/overview), [Wunderlist](https://developer.wunderlist.com/documentation), [Amazon Wishlists](https://github.com/doitlikejustin/amazon-wish-lister), [Wetter.com](http://www.wetter.com/apps_und_mehr/website/api/), [OpenWeatherMap](http://openweathermap.org/api), [Faroo](http://www.faroo.com/hp/api/api.html#json), [HackerNews](https://github.com/HackerNews/API), [New York Times](http://developer.nytimes.com/docs/read/times_newswire_api), ([EventFul](http://api.eventful.com/docs/formats), [Gigulate](http://gigulate.com/api/), [OpenLigaDB](http://www.openligadb.de/Help), [Wikipedia/Wikimedia](https://www.mediawiki.org/wiki/API:Main_page/de), [Yahoo](https://developer.yahoo.com/boss/search/))
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
 - [x] **social**
 - [x] **video**
 - [x] **image**
 - [x] **event**
 - [ ] post, news, link, product, activity, match, rank, task, weather
 - _and much more coming ..._
    
### Designs
 - [x] **[default](https://github.com/JohnnyTheTank/apiNG-design-default)** (masonry layout)
    - displays this models: `social`, `image`, `event`
 - [x] **[deadwood](https://github.com/JohnnyTheTank/apiNG-design-deadwood)** (youtube player)
    - displays this models: `video`
        - only from youtube
 - _and much more coming ..._
 
# Community
create your own **_plugins_** or **_designs_** by this samples:
- [apiNG-plugin-sample](https://github.com/JohnnyTheTank/apiNG-plugin-sample)
- [apiNG-design-sample](https://github.com/JohnnyTheTank/apiNG-design-sample)

# Contributors
- Jonathan Hornung ([JohnnyTheTank](https://github.com/JohnnyTheTank))
    - core system
