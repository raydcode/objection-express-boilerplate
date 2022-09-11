# Express Boilerplate with Objection ORM wrapped with Postgraphile (Graphql)


Start Server
```bash 
npm start 
```

For Development  uses nodemon

```bash 
npm run dev

```

Debugging

```bash 
npm run debug

```

# Database configuration

Here We Using knex.js for database connection configuration and migration

  # migration

To run migrations
```bash
npx knex migrate:latest  --knexfile ./db/knexfile.js

```

To make  migration

```bash
npx knex migrate:make 'table_name'  --knexfile ./db/knexfile.js
```

References:

https://knexjs.org <br />
https://vincit.github.io/objection.js <br />
https://www.graphile.org/postgraphile


Happy Coding ✨ !
