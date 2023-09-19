import { filterProducts } from './v-filter.service'
import { FILTER_LIST } from './v-filter.reducer'

export function filterList(order, cb) {
    return async (dispatch, state) => {
        try {
            const response = await filterProducts(order)

            const { data } = response
            dispatch({
                type: FILTER_LIST,
                payload: {
                    data
                },
            })
            cb(false, data)
        } catch (e) {
            cb(true)
        }
    }
}