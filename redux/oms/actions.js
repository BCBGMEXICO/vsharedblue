import * as Services from './services'
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
  CLEAR_ORDERS,
  CLEAR_MY_ORDERS,
  CLEAR_ORDER_FORM
} from './types'

export function updateOrderForm(orderForm, cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: UPDATE_ORDERFORM,
        payload: orderForm,
      })

      cb(false, orderForm)
    } catch (e) {
      cb(true)
      console.log(e)
    }
  }
}

export function getOrderForm(loja, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getOrderForm(loja)
      const { data } = response
      console.log("GET ORDERFORM", response);
      dispatch({
        type: GET_ORDER_FORM,
        payload: data.orderFormId,
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function clearOrderForm(cb) {
  return async (dispatch, state) => {
    try {
      console.log("CLEAR ORDER FORM");
      dispatch({
        type: CLEAR_ORDER_FORM
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function addItemToOrderForm(
  loja,
  orderFormId,
  productId,
  qty,
  sellerId,
  cb,
) {
  return async (dispatch, state) => {
    try {
      const response = await Services.orderAddItem(
        loja,
        orderFormId,
        productId,
        qty,
        sellerId,
      )
      const { data } = response

      dispatch({
        type: UPDATE_ORDERFORM,
        payload: data,
      })
      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}

export function removeItemOrderForm(loja, orderFormId, index, qty, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.orderRemoveItem(
        loja,
        orderFormId,
        index,
        qty,
      )
      const { data } = response

      dispatch({
        type: UPDATE_ORDERFORM,
        payload: data,
      })
      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}

export function removeCupomOrderForm(store, orderFormId, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.removeCoupon(store, orderFormId)
      const { data } = response

      dispatch({
        type: REMOVE_COUPON,
        payload: {
          data: data.totalizers,
        },
      })
      cb()
    } catch (e) {
      cb()
    }
  }
}

export function getPostalCode(cep, loja, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getPostalCode(cep, loja)
      const { data } = response
      dispatch({
        type: GET_POSTAL_CODE,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function getDeliverys(orderFormId, loja, postalCode, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.addShippingData(
        orderFormId,
        loja,
        postalCode,
      )
      const { data } = response
      dispatch({
        type: GET_DELIVERYS,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function selectDeliveryOption(
  orderFormId,
  loja,
  dataDeliveryOption,
  cb,
) {
  return async (dispatch, state) => {
    try {
      const response = await Services.selectDeliveryOption(
        orderFormId,
        loja,
        dataDeliveryOption,
      )
      const { data, status } = response

      dispatch({
        type: SELECT_DELIVERY,
        payload: {
          data,
          totalizers: data.totalizers,
          paymentData: data.paymentData,
          value: data.value,
        },
      })

      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function setCoupon(store, orderFormId, text, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.setCoupon(store, orderFormId, text)
      const { data } = response
      dispatch({
        type: UPDATE_ORDERFORM,
        payload: data,
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function cleanDeliverySelected() {
  return dispatch => {
    dispatch({
      type: CLEAN_DELIVERY_SELECTED,
      payload: undefined,
    })
  }
}

export function addItemGift(loja, orderformId, giftId, items, callback) {
  return async (dispatch, state) => {
    try {
      const response = await Services.addGift(loja, orderformId, giftId, items)
      const { data } = response

      dispatch({
        type: ADD_GIFT,
        payload: {
          store: loja,
          data,
        },
      })
      callback(true, data)
    } catch (e) {
      callback(false)
      console.log('erro AQUIS', e)
    }
  }
}

export function saveSearchRecent(
  numbersSearch,
  search,
  keySearch,
  stateSearch,
  cb,
) {
  return async (dispatch, state) => {
    const searchs = stateSearch
    if (stateSearch.length >= numbersSearch) {
      searchs.shift()

      searchs.push({
        id: keySearch,
        item: search,
      })
    } else {
      searchs.push({
        id: keySearch,
        item: search,
      })
    }
    try {
      dispatch({
        type: SAVE_SEARCH,
        payload: {
          data: searchs,
        },
      })

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function clearSearchRecent(cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: SAVE_SEARCH,
        payload: {
          data: [],
        },
      })

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function getMyOrders(loja, email, pageNumber, pageSize, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getMyOrders(
        loja,
        email,
        pageNumber,
        pageSize,
      )
      const { data } = response
      dispatch({
        type: MY_ORDERS,
        payload: {
          data: data.list,
        },
      })
      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function getMyOrdersV2(store, pageNumber, pageSize, token, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getMyOrdersV2(
        store,
        pageNumber,
        pageSize,
        token,
      )
      const { data } = response
      dispatch({
        type: MY_ORDERS,
        payload: {
          data: data.list,
        },
      })
      cb(false, response)
    } catch (e) {
      cb(true)
    }
  }
}

export function clearOrders(cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: CLEAR_ORDERS,
        payload: {
          data: [],
        },
      })
      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function clearMyOrders(cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: CLEAR_MY_ORDERS,
      })

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function setCouponMessage(store, orderFormId, textfield, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.setCouponMessage(
        store,
        orderFormId,
        textfield,
      )
      const { data } = response

      dispatch({
        type: UPDATE_ORDERFORM,
        payload: data,
      })
      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}
