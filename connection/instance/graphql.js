import ApolloClient from 'apollo-boost'
import config from '../../../../scale.config'

export const vtexAnimale = new ApolloClient({
  uri: `${config?.instances?.graphql?.baseURL}/_v/segment/graphql/v1`,
})
