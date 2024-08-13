# GraphQL

## Installation

```bash
yarn add graphql @apollo/client @graphql-codegen/cli @graphql-codegen/client-preset @graphql-codegen/introspection -D
```

## Setup

Create `index.ts` in your `/libs/{cms}` folder.

```typescript
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});

export default client;
```

## Codegen

Create `codegen.ts` in project root:

```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.GRAPHQL_ENDPOINT,
    generates: {
        './types/': {
            preset: 'client',
            plugins: [],
        },
        './libs/{cms}/graphql.json': {
            plugins: ['introspection'],
        },
    },
};

export default config;
```

### Script

Add this to the `package.json` scripts:

```bash
"codegen": "graphql-codegen --require dotenv/config --config codegen.ts dotenv_config_path=.env.local && yarn format"
```

### WebStorm/PhpStorm config file

Create `.graphqlconfig` and `graphql.json` files in your `/libs/{cms}` folder:

```json
{
    "name": "GQL schema",
    "schemaPath": "graphql.json"
}
```
