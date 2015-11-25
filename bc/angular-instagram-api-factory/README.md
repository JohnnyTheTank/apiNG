**angular-instagram-api-factory** is an angularjs module with a instagram api factory.

Author: Jonathan Hornung ([JohnnyTheTank](https://github.com/JohnnyTheTank))


## Usage

1. Install via [bower](http://bower.io/) :
    1. `bower install --save angular-instagram-api-factory`
2. Add `jtt_instagram` to your application's module dependencies.
3. Include dependencies in your HTML.
    1. When using bower:

    ```html
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-instagram-api-factory/src/angular-instagram-api-factory.js"></script>
    ```

4. Use the factory `instagramFactory`.


### factory methods

#### getPosts


```js
instagramFactory.getPostsFromUserById({
    userId: "<USER_ID>",
    count: "<COUNT>", // (optional) default: 20
    min_id: "<MIN_ID>", // (optional)
    max_id: "<MAX_ID>", // (optional)
    min_timestamp: "<MIN_TIMESTAMP>", // (optional)
    max_timestamp: "<MAX_TIMESTAMP>", // (optional)
    access_token: "<YOUR_ACCESS_TOKEN>",
    client_id: "<YOUR_CLIENT_ID>",
}).success(function (_data) {
    //on success
}).error(function (_data) {
    //on error
});
```

```js
instagramFactory.getPostsByTag({
    tag: "<TAG>",
    count: "<COUNT>", // (optional) default: 20
    min_tag_id: "<MIN_TAG_ID>", // (optional)
    max_tag_id: "<MAX_TAG_ID>", // (optional)
    min_timestamp: "<MIN_TIMESTAMP>", // (optional)
    max_timestamp: "<MAX_TIMESTAMP>", // (optional)
    access_token: "<YOUR_ACCESS_TOKEN>",
    client_id: "<YOUR_CLIENT_ID>",
}).success(function (_data) {
    //on success
}).error(function (_data) {
    //on error
});
```


#### getUser
```js
instagramFactory.getUserById({
    userId: "<USER_ID>",
    access_token: "<YOUR_ACCESS_TOKEN>",
    client_id: "<YOUR_CLIENT_ID>",
}).success(function (_data) {
    //on success
}).error(function (_data) {
    //on error
});
```


## Instagram JSONP API

* Doku: https://instagram.com/developer/endpoints/
* Api Console: https://apigee.com/console/instagram
* Username Converter: http://jelled.com/instagram/lookup-user-id


## License

MIT