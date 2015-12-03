note: apiNG is under development and not ready for public usage

# apiNG

apiNG is an AngularJS directive for receiving and displaying data from different REST API's'.

# Demo
[very simple demo](http://johnnythetank.github.io/apiNG/#demo)

## how does it work?

apiNG works as plugin platform.
 - **`plugins`**: receive some data (from REST API's) and convert this to any `model` and send the result to **apiNG**
 - **`designs`**: receive the result from **apiNG** and display the `model's` data

everybody can create `plugins`, `models` and `designs`

## Current status

### Plugins (sources/platforms)
 - **REST API SOURCES (Social Media)**
     - [x] **Youtube** ([apiNG-plugin-youtube](https://github.com/JohnnyTheTank/apiNG-plugin-youtube))
        - converts to this models: `social`, `video`
     - [x] **Instagram** ([apiNG-plugin-instagram](https://github.com/JohnnyTheTank/apiNG-plugin-instagram))
        - converts to this models: `social`, `video`, `image`
     - [x] **Facebook** ([apiNG-plugin-facebook](https://github.com/JohnnyTheTank/apiNG-plugin-facebook))
        - converts to this models: `social`, `video`, `image`, `event`
     - [x] **Twitter** ([apiNG-plugin-codebird](https://github.com/JohnnyTheTank/apiNG-plugin-codebird))
        - converts to this models: `social`, `image`
     - [ ] [Google+](https://developers.google.com/+/web/api/rest/latest/)
     - [ ] [Flickr](https://www.flickr.com/services/api/)
     - [ ] [Vimeo](https://developer.vimeo.com/api/)
     - [ ] [Tumblr](https://www.tumblr.com/docs/en/api/v2)
     - [ ] [Vine](https://github.com/starlock/vino/wiki/API-Reference)
     - [ ] [Vk](http://vk.com/dev)
     - maybe: [Blogger](https://developers.google.com/blogger/docs/3.0/using)
 - **REST API SOURCES (Other)**
     - [ ] [Spotify](https://developer.spotify.com/web-api/)
     - [ ] [GitHub](https://developer.github.com/v3/)
     - [ ] [BandsInTown](https://www.bandsintown.com/api/overview)
     - [ ] [Wunderlist](https://developer.wunderlist.com/documentation)
     - [ ] [Wetter.com](http://www.wetter.com/apps_und_mehr/website/api/)
     - [ ] [OpenWeatherMap](http://openweathermap.org/api)
     - [ ] [Faroo](http://www.faroo.com/hp/api/api.html#json)
     - [ ] [HackerNews](https://github.com/HackerNews/API)
     - [ ] [New York Times](http://developer.nytimes.com/docs/read/times_newswire_api)
     - maybe: [EventFul](http://api.eventful.com/docs/formats), [Gigulate](http://gigulate.com/api/), [OpenLigaDB](http://www.openligadb.de/Help), [Wikipedia/Wikimedia](https://www.mediawiki.org/wiki/API:Main_page/de), [Yahoo](https://developer.yahoo.com/boss/search/)
 - **OTHER DYNAMIC SOURCES**
    - [ ] [RSS feeds](http://cyber.law.harvard.edu/rss/rss.html)
 - **FILE SOURCES**
    - [x] JSON file ([apiNG-plugin-jsonloader](https://github.com/JohnnyTheTank/apiNG-plugin-jsonloader))
        - supports any model
    - [ ] XML file
 - **OTHER STATIC SOURCES**
    - [ ] javascript array
 - and much more coming ...
    
### Models
 - [x] **social**
 - [x] **video**
 - [x] **image**
 - [x] **event**
 - [ ] post
 - [ ] news
 - [ ] link
 - [ ] product
 - [ ] activity
 - [ ] match
 - [ ] rank
 - [ ] task
 - [ ] weather
 - and much more coming ...
    
### Designs
 - [x] **[default](https://github.com/JohnnyTheTank/apiNG-design-default)** (masonry layout)
    - displays this models: `social`, `image`, `event`
 - [x] **[deadwood](https://github.com/JohnnyTheTank/apiNG-design-deadwood)** (youtube player)
    - displays this models: `video`
        - only from youtube
 - and much more coming ...
 
# Community
create your own `plugin` or `design` from this samples:
- [apiNG-plugin-sample](https://github.com/JohnnyTheTank/apiNG-plugin-sample)
- [apiNG-design-sample](https://github.com/JohnnyTheTank/apiNG-design-sample)

# Contributors
- Jonathan Hornung ([JohnnyTheTank](https://github.com/JohnnyTheTank))
    - core system
