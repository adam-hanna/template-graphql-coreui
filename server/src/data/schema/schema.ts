import { buildSchema } from 'graphql';
import { readFileSync } from 'fs'
import { makeExecutableSchema } from "graphql-tools"
import { resolvers } from '../../server/resolvers'

const data = readFileSync(`${__dirname}/schema.graphql`, 'utf8')
export const schema = buildSchema(data)

export const execSchema = makeExecutableSchema({
  typeDefs: data,
  resolvers,
})
