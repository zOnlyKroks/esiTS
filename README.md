# esiTS

esiTS is a updated module for the EVE Online ESI. It makes getting data from the ESI much easier, avoids cluttering your code with HTTP requests, and is small and powerful.

## This is a maintained, typescript alternative to the outdated https://github.com/0xf0xx0/esiJS. Many thanks go to the original creator of this tool, on which my work here depends.

# INSTALLING:

```bash
npm i esijs
```

# USAGE:

```js
const esiJS = require('esijs')
const esiClient = new esiJS({})
// Use all functions like this:
esiClient.group.<subgroup>.function()
    .then(r => {
        let headers = r.headers
        let data = r.data

        // do something with headers and data
    })
    .catch(e => { // .then/.catch is used when you don't await a function
        // whatever you want to do with errors
    })
// Or like this:
try {
    let data = await esiClient.group.<subgroup>.function()
} catch(e) { // try/catch is used when you await a function
    // Error? What error?
}
```

Please view the `docs/` directory for the documentation on each group.
