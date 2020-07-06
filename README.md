# Cloud Bot
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Simple Twitch Bot for Frank's Twitch Stream, build with [Comfy.JS](https://github.com/instafluff/ComfyJS). 

![cloudbot logo](medias/cloudbot_logo.png)

First it was a pretext to learn (or refresh) my JavaScript knowledge, but it became quickly fun to add more and more feature to it. Have a look customize it. make suggestion... this is pure fun. :)

Currently Available Commands
----------------------------

- !stats: Display current user stats
- !scores: (only broadcaster) display table of highest scores
- !clean: (only broadcaster) hide/ clean all previous text in the screen


Upcomming Available Commands
----------------------------

- lift
- etc.

How to use it
-------------

You just need to have the files `index.html`,  `chatbot.js`, and `secret.js` accessible (ex: locally, in an Azure Blob storage,etc.)

Make a new browser source overlay into your streaming tools (ex: OBS, StreamLabs OBS) and connect it to `index.html`.

Create a file `secret.js` with the following code in it: 

```js
const authToken = "oauth:xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```

Replace the token by the value found on: https://twitchapps.com/tmi/

Finally replace fboucheros by the name of your Twitch Channel on the last line. 

```js
 ComfyJS.Init( "fboucheros", authToken );
```

~ Have fun!
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://cloud5mins.com"><img src="https://avatars3.githubusercontent.com/u/2404846?v=4" width="100px;" alt=""/><br /><sub><b>Frank Boucher</b></sub></a><br /><a href="https://github.com/FBoucher/CloudBot/commits?author=FBoucher" title="Documentation">📖</a> <a href="https://github.com/FBoucher/CloudBot/commits?author=FBoucher" title="Code">💻</a> <a href="#ideas-FBoucher" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!