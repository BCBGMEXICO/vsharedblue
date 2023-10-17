import {
  GET_ORDER_FORM,
  ADD_ITEM_TO_ORDER_FORM,
  REMOVE_ITEM_ORDER_FORM,
  GET_POSTAL_CODE,
  GET_DELIVERYS,
  SELECT_DELIVERY,
  SET_COUPON,
  REMOVE_COUPON,
  CLEAN_DELIVERY_SELECTED,
  UPDATE_ORDERFORM,
  ADD_GIFT,
  SAVE_SEARCH,
  MY_ORDERS,
  SAVE_CUPOM_PRICE,
  CLEAR_MY_ORDERS,
  CLEAR_ORDERS,
  CLEAR_ORDER_FORM
} from './types'

const INITIAL = {
  orderForm: {},
  postalCode: {},
  delivery: {},
  selectDelivery: undefined,
  searchRecent: [],
  myRequests: [],
}

export default (state = INITIAL, action) => {
  console.log("UPDATING ORDER FORM", action.payload);
  switch (action.type) {
    case UPDATE_ORDERFORM:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          ...action.payload,
        },
      }
    case GET_ORDER_FORM:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          orderFormId: action.payload,
        },
      }
    case ADD_ITEM_TO_ORDER_FORM:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          ...action.payload.data,
        },
      }
    case REMOVE_ITEM_ORDER_FORM:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          ratesAndBenefitsData: action.payload.data.ratesAndBenefitsData,
          totalizers: action.payload.data.totalizers,
          items: action.payload.data.items,
          selectableGifts: action.payload.data.selectableGifts,
        },
      }
    case CLEAR_ORDER_FORM:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          shippingData: {
            ...state.orderForm.shippingData,
            logisticsInfo: []
          },
          totalizers: [],
          items: [],
          selectableGifts: [],
        },
        postalCode: {},
        delivery: {},
        searchRecent: [],
        myRequests: [],
        totalizerFinalFrete: 0,
      }
    case GET_POSTAL_CODE:
      return {
        ...state,
        postalCode: action.payload.data,
      }
    case GET_DELIVERYS:
      return {
        ...state,
        delivery: action.payload.data,
      }
    case SELECT_DELIVERY:
      return {
        ...state,
        orderForm: action.payload.data,
        totalizerFinalFrete: action.payload.data.totalizers[1].value,
      }
    case CLEAN_DELIVERY_SELECTED:
      return {
        ...state,
        totalizerFinalFrete: action.payload,
      }
    case SET_COUPON:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          totalizers: action.payload.data.totalizers,
          ratesAndBenefitsData: action.payload.data.ratesAndBenefitsData,
          value: action.payload.value,
        },
      }
    case ADD_GIFT:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          totalizers: action.payload.data.totalizers,
          ratesAndBenefitsData: action.payload.data.ratesAndBenefitsData,
          selectableGifts: action.payload.data.selectableGifts,
          messagens:
            action.payload.data.messages.length > 0
              ? action.payload.data.messages[0].text
              : '',
          items: action.payload.data.items,
        },
      }
    case SAVE_SEARCH:
      return {
        ...state,
        searchRecent: action.payload.data,
      }
    case MY_ORDERS:
      return {
        ...state,
        myRequests: [...state.myRequests, ...action.payload.data],
      }
    case CLEAR_ORDERS:
      return {
        ...state,
        myRequests: action.payload.data,
      }
    case CLEAR_MY_ORDERS:
      return {
        ...state,
        myRequests: [],
      }
    case SAVE_CUPOM_PRICE:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          totalizers: action.payload.data,
        },
      }
    case REMOVE_COUPON:
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          totalizers: action.payload.data,
        },
      }
    default:
      return state
  }
}
