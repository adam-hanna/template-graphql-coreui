require('dotenv').config()

import {
  host,
  port,
  dbConfig,
} from './config'
import { GraphQLServer } from './server'
import DB from './db'

const server = new GraphQLServer({
    httpPort: Number(port),
    httpHost: host,
})

;(async (): Promise<void> => {
  const db = DB.getInstance()
  await db.connect(dbConfig)
  await db.migrate()

  server.listen()
})().catch(e => {
  console.error("err starting server", e)
  throw e
});
