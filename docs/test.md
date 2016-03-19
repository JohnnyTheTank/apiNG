---
title: "What is apiNG?"
excerpt: ""
---
[block:image]
{
  "images": [
    {
      "image": [
        "https://www.filepicker.io/api/file/DvhQ16oOTleXgeMY82cB",
        "aping-logo.png",
        "320",
        "186",
        "#c44544",
        ""
      ]
    }
  ]
}
[/block]

[block:embed]
{
  "html": false,
  "url": "https://ghbtns.com/github-btn.html?user=JohnnyTheTank&repo=apiNG&type=star&count=true&size=large",
  "title": null,
  "favicon": null,
  "iframe": true,
  "width": "160px",
  "height": "30p"
}
[/block]
**apiNG** is an AngularJS directive that enables you to receive and display data from one or more sources. The data can be aggregated, limited and ordered. The complete setup is dead simple, just by adding data-attributes to your html.

There are two level of usage: _basic_ and _advanced_
* The _basic_ usage is focused on keeping it simple and easy, but with enough power for most use cases
* The _advanced_ usage turns apiNG into a plugin system for data-sources and designs, focused on re-usable modules
[block:api-header]
{
  "type": "basic",
  "title": "Basic Usage Demo"
}
[/block]

[block:callout]
{
  "type": "success",
  "body": "Basic usage: [plnkr.co/xmflhJ](http://plnkr.co/xmflhJ)",
  "title": "Plnkr demo (view & edit)"
}
[/block]
In this demo, we just want to receive and display data from random REST API. In this case, we need to use some built-in functionalities.
[block:code]
{
  "codes": [
    {
      "code": "<h1>Unstyled, one result</h1>\n<aping aping-jsonloader=\"[{ 'path': 'https://randomuser.me/api/' }]\">\n    <pre>{{results | json}}</pre>\n</aping>\n\n<hr>\n\n<h1>Styled, but two results</h1>\n<aping\n    template-url=\"template.html\"\n    aping-jsonloader=\"[{'path':'https://randomuser.me/api'}, {'path':'https://randomuser.me/api'}]\">\n</aping>",
      "language": "html"
    }
  ]
}
[/block]
Result:
[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/JohnnyTheTank/apiNG/master/demos/jsonloader/",
  "title": "apiNG Demo",
  "favicon": "https://rawgit.com/favicon.ico",
  "iframe": true,
  "height": "1100px"
}
[/block]

[block:api-header]
{
  "type": "basic",
  "title": "Advanced Usage Demo"
}
[/block]

[block:callout]
{
  "type": "success",
  "title": "Plnkr demo (view & edit)",
  "body": "Social Wall: [plnkr.co/dz3Dru](http://plnkr.co/dz3Dru)"
}
[/block]
In this demo, we request some social media platforms and display a **social wall**. In this case, we need to use some plugins and one design for apiNG.
[block:code]
{
  "codes": [
    {
      "code": "<aping\n  \ttemplate-url=\"social_template.html\"\n  \titems=\"3\"\n  \tmodel=\"social\"\n  \torder-by=\"timestamp\"\n  \torder-reverse=\"true\"\n  \taping-youtube=\"[{'channelId':'UCuGcxogeiX5DbfzBMTl_aZQ'}]\"\n    aping-instagram=\"[{'userId':'416104304', 'items':2}]\"\n    aping-facebook=\"[{'page':'BreakingBad'}]\"\n    aping-codebird=\"[{'user':'adidas', 'showAvatar':false}]\"\n    aping-dailymotion=\"[{'userId':'electropose'}]\"\n    aping-tumblr=\"[{'page':'davidhinga'}]\"\n    aping-rss=\"[{'path':'http://blog.hackerearth.com/feed'}]\"\n    aping-vimeo=\"[{'channel':'worldhd'}]\">\n</aping>",
      "language": "html"
    }
  ]
}
[/block]
Result, displayed in [`social_template.html`](https://rawgit.com/JohnnyTheTank/apiNG/master/demo2/social_template.html):
[block:embed]
{
  "html": false,
  "url": "https://rawgit.com/JohnnyTheTank/apiNG/master/demos/socialwall/",
  "title": "apiNG Demo",
  "favicon": "https://rawgit.com/favicon.ico",
  "iframe": true,
  "height": "6000"
}
[/block]