# ***Squishbot*** | A Discord bot for Squishmallows
##### My girlfriend's first coding project! ᵔ ᵕ ᵔ

<img src="https://user-images.githubusercontent.com/42707243/214195526-ccb4374c-30bb-42f6-9fbf-f60bd29683bb.png" alt="Squishmallows!" width="300"/>


## Description
This is a discord bot intended to be an easy-access database for information on all squishmallows, and also act as a foundation for my girlfriend's programming skills. When she becomes a cloud dev and makes big money, she's gonna say *"yeah guys look at this, this was one of my first projects!"*

<br>

## Files
For now, in the `src/` folder you'll find:
| File | Status | Purpose |
| ---- | ------ | ------- |
| `squishbot.js` (front-end) | [Not started](https://github.com/Raymond-exe/squishbot/blob/master/src/squishbot.js) | Handler for all Discord interactions. Send messages, pictures, and Squishmallows from this file! |
| `squishfinder.js` (back-end) | [WIP](https://github.com/Raymond-exe/squishbot/blob/master/src/squishfinder.js) | This file finds information on squishmallows, for `squishbot.js` to tell users. |
| `?` | [?](https://www.youtube.com/watch?v=dQw4w9WgXcQ) | ? |

<br>

## Back-end functions 
##### squishfinder.js
| Name | Object type | Description |
| ---- | ----------- | ----------- |
| `MASTER_LIST` | array | An array containing all squishmallows in the format below this table.
| `updateMasterList()` | async function | Updates `MASTER_LIST` to contain all squishmallows currently listed [here](https://squishmallowsquad.fandom.com/wiki/Master_List).
| `getSquishmallowInfo()` | async function | Accepts a squishmallow object from `MASTER_LIST` and returns a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) containing the following fields: "title", "link", "img", "subtext", "Bio", and "Appearance". "Bio" & "Appearance" may not always be present, so check before accessing those fields.  |
### *Squishmallow objects*
```js
// objects in MASTER_LIST are formatted as:
{
    name: 'Cam'
    link: 'https://squishmallowsquad.fandom.com/wiki/Cam'
}
```


<br>

## Dependencies
The following [Node.js](https://nodejs.org) packages will have to be installed to run this bot:
- `discord.js` | Discord API
- `dotenv` | Access to environmental variables
- `node-fetch` | Allows HTTP requests to be executed
- `node-html-parser` | Allows easy parsing of HTML content

To install these packages after downloading Node, open a terminal and type in `npm install <package-name>`

<br>

---

## TODO
More features to come. She wants to add user-owned squish cards for card trading, so maybe in the future.


