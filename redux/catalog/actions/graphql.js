import { gql } from 'apollo-boost'
import { vtexAnimale } from '../../../connection/instance/graphql'

import {
  SEARCH_PRODUCTS_NAME,
} from '../types'

export function getProducts(variables, query, cb, type = SEARCH_PRODUCTS_NAME) {
  return async (dispatch, state) => {
    try {
      const q = gql`
        query Products ( $query: String, $from: Int, $to: Int, $collection: String, $map: String, $specificationFilters: [String], $orderBy: String) {
            products(
                query: $query, from:  $from, to: $to, collection: $collection, map: $map, specificationFilters: $specificationFilters, orderBy: $orderBy
            ) @context(provider: "vtex.search-graphql") {
               ${query}
            }
        }`

      const { data } = await vtexAnimale.query({ query: q, variables })

      dispatch({
        type,
        payload: {
          data: data.products,
        },
      })

      cb(false, data.products)
    } catch (e) {
      cb(true, null)
    }
  }
}
