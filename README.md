# Cloud Bot

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