import { queries } from './queries'
import { mutations } from './mutations'

export const resolvers = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Query: {
          ...queries,
      },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Mutation: {
        ...mutations,
    },
}
