import {
  Environment,
  GraphQLResponse,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from 'relay-runtime'

import {
  API_URL,
} from '../../config'

export const fetchQuery = async (request: RequestParameters, variables: Variables): Promise<GraphQLResponse> => {
  const res = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify({
      query: request.text,
      variables
    })
  })

  return res.json()
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
})
