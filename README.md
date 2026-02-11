# eve-esi-client

Modern TypeScript EVE ESI API wrapper. Makes getting data from the ESI much easier, avoids cluttering your code with HTTP requests, and is small and powerful.

This is a maintained, typescript alternative to outdated esiJS libraries. Many thanks go to the original creators of these tools, on which this work depends.

## Installing

```bash
npm install eve-esi-client
```

## Usage

```js
const ESIJS = require('eve-esi-client')
const esi = new ESIJS({})

// Use all functions like this:
esi.status.status()
    .then(response => {
        let headers = response.headers
        let data = response.data

        console.log(`${data.players} players online`)
    })
    .catch(error => {
        console.error('Error:', error.message)
    })

// Or with async/await:
try {
    let response = await esi.universe.regions.regions()
    console.log(`Found ${response.data.length} regions`)
} catch(error) {
    console.error('Error:', error.message)
}
```

## Authentication

For endpoints requiring authentication, provide your access token:

```js
const esi = new ESIJS({
    token: 'your-esi-access-token-here'
})

// Now you can access authenticated endpoints
const wallet = await esi.wallet.character.balance(characterId)
const skills = await esi.skills.skills(characterId)
```

## Available Modules

- `alliance` - Alliance information
- `character` - Character data, assets, contacts, mail, etc.
- `corporation` - Corporation information and member data
- `universe` - Static universe data (regions, systems, types, etc.)
- `market` - Market orders and pricing data
- `wallet` - Wallet operations
- `skills` - Character skills and training queue
- `mail` - Mail system
- `location` - Character location and ship info
- `status` - Server status
- `wars` - War information
- And more...

## Features

- Full TypeScript support with type definitions
- Automatic ETag caching to reduce API calls
- Comprehensive endpoint coverage
- Modern async/await support
- Error handling

## TypeScript

```typescript
import ESIJS from 'eve-esi-client'

const esi = new ESIJS()
const response = await esi.character.info(123456789)
console.log(response.data.name) // Fully typed
```