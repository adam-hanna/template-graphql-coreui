import { createServer as createHTTPServer, Server } from 'http';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors'

import { schema } from '../../../data/schema';
import { resolvers } from '../../resolvers';

const app = express()
app.use(cors())

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: {
      ...resolvers.Query,
      ...resolvers.Mutation,
    },
    graphiql: true,
    pretty: true,
  }),
);

// setup health check
app.use(
    '/health',
    (_req, res, next) => {
        res.sendStatus(200);
        next();
    }
)

export type HTTPServers = {
    httpServer?: Server;
}

export type CreateHTTPServersProps = {}

export const createHTTPServers = (
    { }: CreateHTTPServersProps
): HTTPServers => {
    const httpServer: Server | undefined = createHTTPServer(app);

    return {
        httpServer,
    }
}
