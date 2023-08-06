import { getProducts } from './v-shelflist.services'
import { GET_PRODUCTS } from './v-shelflist.reducer'

export function getProductsList(cb) {
  return async (dispatch, state) => {
    try {
      const response = await getProducts()

      const { data } = response
      dispatch({
        type: GET_PRODUCTS,
        payload: {
          data,
        },
      })
      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}
