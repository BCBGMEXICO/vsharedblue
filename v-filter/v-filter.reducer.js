export const FILTER_LIST = 'FILTER_LIST'

const INITIAL = {
    filtredList: []
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case FILTER_LIST:
            return {
                ...state,
                filtredList: action.payload.data,
            }
        default:
            return state;
    }
}