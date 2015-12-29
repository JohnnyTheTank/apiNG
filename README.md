_**Note:** apiNG is currently under development and not ready yet for public use. **Release in Q1 2016**_

# apiNG

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
- [sonymusic.de/videos](https://sonymusic.de/videos) (youtube video playlist) based on apiNG

## Installation
You can choose your preferred method of installation:

* Via bower: `bower install apiNG --save`
* Download from github: [apiNG.zip](https://github.com/JohnnyTheTank/apiNG/zipball/master)

### Dependencies
Include all dependencies in your application
* jquery
* angular
* angular-sanitize

```html
<!-- dependencies for apiNG -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
```

### apiNG core
Create a new folder named **`js/apiNG/`** in your  application directory and copy
**`aping-config.js`** into it.
Include both **`aping.min.js`** and **`aping-config.js`** in your application.
```html
<!-- apiNG core and config -->
<script src="bower_components/apiNG/dist/aping.min.js"></script>
<script src="<YOUR_APP>/js/apiNG/aping.config.js"></script>
```
Configure the `apingDefaultSettings` in **`aping-config.js`**. This default settings could be overwritten by every aping instance via data-attributes.
```js
$provide.constant("apingDefaultSettings", {
    templateUrl : "<PATH_TO_YOUR_DEFAULT_DESIGN>",
    items : "<ITEMS_PER_REQUEST>", //items per request
    maxItems: "<MAX_ITEMS_PER_APING>", //max items per aping instance
    orderBy : "<ORDER_BY_PROPERTY>", // order result list by this object property. e.g. "timestamp", "position", ...
    orderReverse : "<ORDER_REVERSE_FLAG>", //"true" or "false"
    model: "<CHOSEN_DATA_MODEL>", //e.g. "social", "event", "video", "picture", ....
    getNativeData: false, // Use "true" for getting native data from plugins (no transformation to any model)
    removeDoubles: false, // Use "true" to remove identical objects
});
```

Add the module `jtt_aping` as a dependency to your app module:
```js
var app = angular.module('app', ['jtt_aping']);
```

### apiNG plugins
* Every **apiNG plugin** expects an array of **requests** as html attribute.
* Every **request** is defined as single API call or something like that.

_Full documentation for **plugins** coming soon ..._

### apiNG designs
_Documentation for **designs** coming soon ..._

## Usage
_Full usage documentation coming soon ..._

### Parameters
| Name | Type | Sample | Description |
|---|---|---|---|
| `template-url` | `string` | `template.html` | Path to template file (design) |
| `model` | `string`| `social` | Chosen data model for this **apiNG instance** |
| `get-native-data` | `boolean`| `false` | Use `true` for getting native data from plugins |
| `items` | `int` | `20` | Number of displayed items **per request** |
| `max-items` | `int` | `100` | Number of items of this **apiNG instance**<br>Use `-1` for no limitation |
| `order-by` | `string` | `timestamp` | Order result by this attribute<br>Use `$NONE` for no order<br>Use `$RANDOM` for random order |
| `order-reverse` | `boolean` | `false` | Use `true` for reverse order |
| `remove-doubles` | `boolean` | `false` | Use `true` to remove identical objects |
| `payload-json` | `json` | `{'key1':'value1'}` | Payload for design controller |

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
     - [x] **Flickr** ([apiNG-plugin-flickr](https://github.com/JohnnyTheTank/apiNG-plugin-flickr))
        - converts to this models: `social`, `image`
     - [x] **Dailymotion** ([apiNG-plugin-dailymotion](https://github.com/JohnnyTheTank/apiNG-plugin-dailymotion))
        - converts to this models: `social`, `video`
     - [x] **Tumblr** ([apiNG-plugin-tumblr](https://github.com/JohnnyTheTank/apiNG-plugin-tumblr))
        - converts to this models: `social`, `video`, `image`
     - [ ] [Google+](https://developers.google.com/+/web/api/rest/latest/),
     [Vk](http://vk.com/dev),
     [Pinterest](https://developers.pinterest.com/docs/getting-started/introduction/),
     [500px](https://github.com/500px/api-documentation),
     [Picasa](https://developers.google.com/picasa-web/docs/2.0/reference),
     [dribbble](http://developer.dribbble.com/v1/)
     ([Blogger](https://developers.google.com/blogger/docs/3.0/using),
     [Delicious](https://github.com/SciDevs/delicious-api),
     [Skyrock](http://www.skyrock.com/developer/documentation/))
 - **OTHER REST API SOURCES**
     - [x] **GitHub** ([apiNG-plugin-github](https://github.com/JohnnyTheTank/apiNG-plugin-github))
        - converts to this models: `repo`
     - [x] **OpenWeatherMap** ([apiNG-plugin-openweathermap](https://github.com/JohnnyTheTank/apiNG-plugin-openweathermap))
        - converts to this models: `weather`
     - [ ] [Spotify](https://developer.spotify.com/web-api/),
     [iTunes](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html),
     [Soundcloud](https://developers.soundcloud.com/docs),
     [Last.fm](http://www.last.fm/en/api),
     [IMDb](http://www.omdbapi.com/),
     [Meetup](http://www.meetup.com/de/meetup_api/),
     [BandsInTown](https://www.bandsintown.com/api/overview),
     [MusicBrainz](https://wiki.musicbrainz.org/Development/JSON_Web_Service),
     [Eventbrite](http://developer.eventbrite.com/),
     [Wunderlist](https://developer.wunderlist.com/documentation),
     [Evernote](https://dev.evernote.com/doc/),
     [Amazon Wishlists](https://github.com/doitlikejustin/amazon-wish-lister),
     [Faroo](http://www.faroo.com/hp/api/api.html#json),
     [HackerNews](https://github.com/HackerNews/API),
     [New York Times](http://developer.nytimes.com/docs/read/times_newswire_api),
     ([EventFul](http://api.eventful.com/docs/formats),
     [Gigulate](http://gigulate.com/api/),
     [OpenLigaDB](http://www.openligadb.de/Help),
     [Wikipedia/Wikimedia](https://www.mediawiki.org/wiki/API:Main_page/de),
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
 - [x] `weather`
 - [ ] `post`, `news`, `link`, `product`, `activity`, `match`, `rank`, `task`, `release`, `movie`
 - _and much more coming ..._
    
### Designs
 - [x] **[default](https://github.com/JohnnyTheTank/apiNG-design-default)** (masonry layout)
    - displays this models: `social`, `video`, `image`, `event`, `repo`
 - [x] **[xgallerify](https://github.com/JohnnyTheTank/apiNG-design-xgallerify)** (xGallerify layout)
    - displays this models: `image`
 - [x] **[deadwood](https://github.com/JohnnyTheTank/apiNG-design-deadwood)** (youtube player)
    - displays this models: `video`
        - only from youtube
 - _and much more coming ..._



# Community
create your own **_plugins_** by this samples:
- [apiNG-plugin-blanko](https://github.com/JohnnyTheTank/apiNG-plugin-blanko) (very clean sample)
- [apiNG-plugin-sample](https://github.com/JohnnyTheTank/apiNG-plugin-sample) (advanced sample)

create your own **_designs_** by this samples:
- [apiNG-design-blanko](https://github.com/JohnnyTheTank/apiNG-design-blanko)

# Contributors
- Jonathan Hornung ([JohnnyTheTank](https://github.com/JohnnyTheTank))
