import {
  GET_USER, GET_POSTAL_CODE, POST_ADD_SHIPPING_DATA, SELECT_DELIVERY_OPTION, GET_PAYMENT_METHODS, CREATE_ORDER, CLEAR_CHECKOUT, GET_CURRENT_ORDER, ACTIVE_ANOTHER_ADDRESS,
} from './types'

const INITIAL = {
  postalCode: {},
  shippingData: {},
  paymentMethods: {},
  order: {},
  currentOrder: {},
  isActiveAnotherAddress: true,
}

export default (state = INITIAL, action) => {
  switch (action.type) {
    case CLEAR_CHECKOUT:
      return {
        postalCode: {},
        shippingData: {},
        paymentMethods: {},
        order: {},
      }
    case GET_USER:
      return {
        ...state,
        order: action.payload.data,
      }
    case GET_POSTAL_CODE:
      return {
        ...state,
        postalCode: action.payload.data,
      }
    case POST_ADD_SHIPPING_DATA:
      return {
        ...state,
        shippingData: action.payload.data,
      }
    case GET_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: action.payload.data,
      }
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload.data,
      }
    case GET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload.data,
      }
    case ACTIVE_ANOTHER_ADDRESS:
      return {
        ...state,
        isActiveAnotherAddress: action.payload,
      }
    default:
      return state
  }
}
