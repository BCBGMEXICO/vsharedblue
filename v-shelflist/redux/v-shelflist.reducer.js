export const GET_PRODUCTS = 'GET_PRODUCTS'

const INITIAL = {
    products: []
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.data,
            }
        default:
            return state;
    }
}