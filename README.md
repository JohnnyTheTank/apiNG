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
     - [ ] Google+
     - [ ] Flickr
     - [ ] Vimeo
     - [ ] Tumblr
     - [ ] Vine
 - **REST API SOURCES (Other)**
     - [ ] Spotify
     - [ ] GitHub
     - [ ] BandsInTown
     - [ ] Wunderlist
     - maybe: [EventFul](http://api.eventful.com/docs/formats), [Gigulate](http://gigulate.com/api/), [OpenLigaDB](http://www.openligadb.de/Help)
 - **OTHER DYNAMIC SOURCES**
    - [ ] RSS feeds
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
