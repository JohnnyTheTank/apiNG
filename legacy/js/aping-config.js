"use strict";

angular.module('jtt_aping')
    .config(['$provide', function ($provide) {

        $provide.value("apingDefaultSettings", {
            apingApiKeys: {
                youtube: [
                    {'apiKey': 'AIzaSyDs39ffw-eH7Wt4312nYBbWmugI8hj155U'},
                    {'apiKey': 'AIzaSyB18JO-CT2Ne_tcx-wGKLp6tzLa6sj1ViA'},
                    {'apiKey': 'AIzaSyBcF34Dc_CVEHaHM5AS33Cj_RjWzrXPuOw'},
                ],
                instagram: [
                    {'access_token': '3283222.a492704.6c2d53acdc3e47e695dff5c89368597d'},
                ],
                facebook: [
                    {'access_token': '904537676282922|9usYrLh7FzkHyaxcIbAuXtr8bTQ'},
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