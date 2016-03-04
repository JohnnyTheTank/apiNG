"use strict";

angular.module('jtt_aping').config(['$provide', function ($provide) {

    $provide.value("apingDefaultSettings", {
        //templateUrl: "../src/aping_design_default_social.html",
        //items: 20, //items per request
        //maxItems: 100, //max items per aping
        //orderBy: "timestamp",
        //orderReverse: "true",
        //model: "social",
        apingApiKeys: {
            youtube: [
                {'apiKey': 'AIzaSyARYVuV6dho71EMZI6j6-sDEgo8OOnFygM'},
                {'apiKey': 'AIzaSyAWefsde_uI339DamA1Q88K_1gf9gzWFBk'},
                {'apiKey': 'AIzaSyBYHItur3CU4xMlnE8q6Lqs9EWu2bHxCoI'},
            ],
            instagram: [
                {'access_token': '3283222.a492704.6c2d53acdc3e47e695dff5c89368597d'},
            ],
            facebook: [
                {'access_token': 'CAAMC6AyvDH0BAChyXyiSXINl6nAZCaOP0nXS1T67ngaZA0svefRAJyWx3Y5bzic47wE4iZAMHCAAoQCvhUMZB3SQufDyio9g4vZAj5BgQXuMVDjVvqDrajfm7IEvN0U1O2JfC1FA2VfqpnYgRa9fF5ZAQBW4vHc6ZAmXryyJvzPQd5TkIdqUC4n'},
                {'access_token': '1739743719594435|trN6PJoujEA5y0yjj-7xJYSKZYw'}
            ],
            twitter: [
                {'bearer_token': 'AAAAAAAAAAAAAAAAAAAAACs3iwAAAAAA%2BH8LdT7YfKIzk8fvQvqKvoePuxo%3DMKfXX2ojtacGL8aOLAhlBDUrEFpy0DUuiyebet22Wa2YVrX7cc'},
                {'bearer_token': 'AAAAAAAAAAAAAAAAAAAAAMzktwAAAAAADOjiwPVsXlzKQSo4s%2FHGJBOgFLY%3DKT4isgacAM2doH8WHFmyYOJ58x4M95WVrrtA3b9pEsWBQJRNtQ'},
                {'bearer_token': 'AAAAAAAAAAAAAAAAAAAAALohjgAAAAAA2I2NKaljOFOCVvI0wxF6pcL6jMY%3D5dt8TBHusrHQiG7SntIsIYoiSqQxTDmiadTsyjNsSDOMpb9wwA'}
            ],
            vimeo: [
                {'access_token': '1e53b10910c18adf97682d12e01e60d6'},
                {'access_token': 'ea345d82cd76223342082f620d42cb72'},
                {'access_token': 'a2f074ead8216f9aa4fd77629ffc572f'}
            ],
            'tumblr': [
                {'api_key': 'lINWJaOl0lu3ajBn5tdqJgs8IFisHu5GJ8hBYzR41f4BHEl9E6'},
            ],
            'bandsintown': [
                {'app_id': 'apiNG-default-design-demo'},
            ]
        }
    });

}]);