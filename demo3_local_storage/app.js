angular.module('app', ['jtt_aping'])
    .run(function (apingLocalStorage) {
        var testArray = [
            {
                "platform": "youtube",
                "blog_name": "KenDuchamp",
                "timestamp": 1438275608200,
                "intern_id": "bMIlblUhRn8",
                "caption": "CHEATING GIRLFRIEND PRANK!! (BOYFRIEND GETS WILD!) GIRLFRIEND CAUGHT CHEATING PRANK!",
                "text": "CHEATING GIRLFRIEND PRANK!! (BOYFRIEND GETS WILD!) GIRLFRIEND CAUGHT CHEATING PRANK! SUBSCRIBE For More: http://bit.ly/1zlZVcP ...",
                "img_url": "https://img.youtube.com/vi/bMIlblUhRn8/hqdefault.jpg",
                "thumb_url": "https://img.youtube.com/vi/bMIlblUhRn8/default.jpg",
                "markup": "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/bMIlblUhRn8?rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>",
                "aping_id": "youtubebMIlblUhRn8"
            },
            {
                "platform": "youtube",
                "blog_name": "riskyrobtv",
                "timestamp": 1438273884200,
                "intern_id": "QWI_TENv-kA",
                "caption": "Cheating Girlfriend Gold Digger Prank!",
                "text": "Cheating Girlfriend Gold Digger Prank SUBSCRIBE www.youtube.com/riskyrobtv In this public prank and social experiment, I approached a hot and sexy girl ...",
                "img_url": "https://img.youtube.com/vi/QWI_TENv-kA/hqdefault.jpg",
                "thumb_url": "https://img.youtube.com/vi/QWI_TENv-kA/default.jpg",
                "markup": "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/QWI_TENv-kA?rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>",
                "aping_id": "youtubeQWI_TENv-kA"
            },
            {
                "platform": "youtube",
                "blog_name": "KenDuchamp",
                "timestamp": 1437926868200,
                "intern_id": "zvPTUnqRZtI",
                "caption": "HOW TO ANNOY YOUR BOYFRIEND PRANK!! (REVENGE PRANK) ANNOYING GIRLFRIEND PRANK!",
                "text": "HOW TO ANNOY YOUR BOYFRIEND PRANK!! (REVENGE PRANK) ANNOYING GIRLFRIEND PRANK! SUBSCRIBE For More: http://bit.ly/1zlZVcP SUBSCRIBE ...",
                "img_url": "https://img.youtube.com/vi/zvPTUnqRZtI/hqdefault.jpg",
                "thumb_url": "https://img.youtube.com/vi/zvPTUnqRZtI/default.jpg",
                "markup": "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/zvPTUnqRZtI?rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>",
                "aping_id": "youtubezvPTUnqRZtI"
            },
            {
                "platform": "youtube",
                "blog_name": "riskyrobtv",
                "timestamp": 1437504933200,
                "intern_id": "r7EMaiPhPMg",
                "caption": "Hot Girls Sex For Money Prank!",
                "text": "Hot Girls Sex For Money Prank SUBSCRIBE www.youtube.com/riskyrobtv In this public prank and social experiment, I approached hot and sexy girls and asked ...",
                "img_url": "https://img.youtube.com/vi/r7EMaiPhPMg/hqdefault.jpg",
                "thumb_url": "https://img.youtube.com/vi/r7EMaiPhPMg/default.jpg",
                "markup": "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/r7EMaiPhPMg?rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>",
                "aping_id": "youtuber7EMaiPhPMg"
            },
            {
                "platform": "youtube",
                "blog_name": "JoeySalads",
                "timestamp": 1437411501200,
                "intern_id": "WlklIB4RRRs",
                "caption": "Bashing Friends TV Prank - It's Bashing Time - Funny Pranks",
                "text": "TwinzTV prank on me https://www.youtube.com/watch?v=hw3LZd6oSnw PLEASE SHARE AND LIKE IF YOU ENJOYED THIS. Subscribe for new videos every ...",
                "img_url": "https://img.youtube.com/vi/WlklIB4RRRs/hqdefault.jpg",
                "thumb_url": "https://img.youtube.com/vi/WlklIB4RRRs/default.jpg",
                "markup": "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/WlklIB4RRRs?rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>",
                "aping_id": "youtubeWlklIB4RRRs"
            },
            {
                "platform": "youtube",
                "blog_name": "JoeySalads",
                "timestamp": 1436289913200,
                "intern_id": "oEBnuJA_KKc",
                "caption": "Crazy Driver Prank - Scare Prank",
                "text": "Crazy Driver Prank - Scare Prank PLEASE SHARE AND LIKE IF YOU ENJOYED THIS. Subscribe for new videos every Week!! Subscribe to ...",
                "img_url": "https://img.youtube.com/vi/oEBnuJA_KKc/hqdefault.jpg",
                "thumb_url": "https://img.youtube.com/vi/oEBnuJA_KKc/default.jpg",
                "markup": "<iframe width=\"1280\" height=\"720\" src=\"https://www.youtube.com/embed/oEBnuJA_KKc?rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>",
                "aping_id": "youtubeoEBnuJA_KKc"
            }
        ];

        apingLocalStorage.set("apingTest", testArray)

    });
