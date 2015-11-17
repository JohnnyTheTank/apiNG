# note

apiNG is under development and not ready for public usage

# apiNG

apiNG is an AngularJS directive for getting some data from REST API's and displays it in various designs.

## how does it work?

apiNG works as plugin platform.
 - **`plugin`**: receive some data (from REST API's) and converted this to any `model` and send the result to **apiNG**
 - **`design`**: receive the result from **apiNG** and display the `model's` data

everybody can create plugins, models and designs (themes)

## current status

### plugins (sources/platforms)
 - [x] **Youtube** ([apiNG-plugin-youtube](https://github.com/JohnnyTheTank/apiNG-plugin-youtube))
    - mappings for `social`, `video`
 - [x] **Instagram** ([apiNG-plugin-instagram](https://github.com/JohnnyTheTank/apiNG-plugin-instagram))
    - mappings for `social`, `video`, `image`
 - [ ] Twitter
 - [ ] Facebook
 - [ ] Google+
 - [ ] Flickr
 - [ ] Vimeo
 - [ ] Tumblr
 - [ ] Vine
 - [ ] Spotify
 - [ ] GitHub
 - [ ] BandsInTown
 - maybe: EventFul (http://api.eventful.com/docs/formats)
 - maybe: Gigulate (http://gigulate.com/api/)
 - maybe: OpenLigaDB (http://www.openligadb.de/Help)
 - and much more coming soon ...
    
### models
 - [x] **social**
 - [x] **video**
 - [x] **image**
 - [ ] post
 - [ ] event
 - [ ] news
 - [ ] product
 - [ ] activity
 - [ ] match
 - [ ] rank
 - and much more coming soon ...
    
### designs
 - [x] **[default](https://github.com/JohnnyTheTank/apiNG-design-default)**
 - [x] **[deadwood](https://github.com/JohnnyTheTank/apiNG-design-deadwood)** (youtube video design)
 - much more coming ...