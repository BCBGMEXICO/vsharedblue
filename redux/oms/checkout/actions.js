import * as Services from './services'
import {
  GET_USER,
  GET_POSTAL_CODE,
  POST_ADD_SHIPPING_DATA,
  SELECT_DELIVERY_OPTION,
  GET_PAYMENT_METHODS,
  CREATE_ORDER, CLEAR_CHECKOUT,
  GET_CURRENT_ORDER,
  ACTIVE_ANOTHER_ADDRESS,
} from './types'

import * as omsActions from '../actions'
import createActionsMiddleware from '../../../utils/createActionsMiddleware'

export function clearCheckout(cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: CLEAR_CHECKOUT,
      })

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

// MyData

export function identifyUser(store, orderFormId, email, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)
      const response = await Services.identifyUser(store, email, orderFormId)

      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function identifyUserV3(store, orderFormId, email, identifyUserHeader, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)
      const response = await Services.identifyUserV3(store, email, orderFormId, identifyUserHeader)

      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function addClientProfile(store, orderFormId, clientProfileData, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)
      const response = await Services.addClientProfile(
        store,
        orderFormId,
        clientProfileData,
      )
      console.log("UPDAING CLIENT PROFILE", response);
      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function setAppDiscount(orderFormId, platform, appName, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)
      const response = await Services.onlyAppPromo(
        orderFormId,
        platform,
        appName,
      )

      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function setAppDiscountAnimale(orderFormId, platform, appName, coupon, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)
      const response = await Services.onlyAppPromoAnimale(
        orderFormId,
        platform,
        appName,
        coupon,
      )

      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function getUser(store, email, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getUser(store, email)

      const { data } = response

      dispatch({
        type: GET_USER,
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

export function getPostalCode(store, postalCode, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getPostalCode(store, postalCode)

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

export function addShippingData(store, orderFormId, postalCode, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.addShippingData(
        store,
        orderFormId,
        postalCode,
      )

      const { data } = response

      dispatch({
        type: POST_ADD_SHIPPING_DATA,
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

export function addShippingDataV3(store, orderFormId, postalCode, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.addShippingDataV3(
        store,
        orderFormId,
        postalCode,
      )

      const { data } = response

      dispatch({
        type: POST_ADD_SHIPPING_DATA,
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

//TODO
export function selectDeliveryOption(store, orderFormId, deliveryOption, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)

      console.log("DELIVERY OPTION", deliveryOption);
      const response = await Services.selectDeliveryOption(
        store,
        orderFormId,
        deliveryOption,
      )

      const { data } = response

      console.log("RESPONSE ADDRESS", response);

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function getPaymentMethods(store, orderFormId, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getPaymentMethods(store, orderFormId)

      const { data } = response

      dispatch({
        type: GET_PAYMENT_METHODS,
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

// Payment

/**
 *
 * @param {*} store
 * @param {*} orderFormId
 * @param {*} cb
 */
export function sendPaymentMethod(store, orderFormId, paymentData, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)
      const response = await Services.sendPaymentMethod(
        store,
        orderFormId,
        paymentData,
      )

      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

export function sendPaymentMethodV3(store, orderFormId, paymentData, cb) {
  return async (dispatch, state) => {
    try {
      const { actions } = createActionsMiddleware(dispatch, omsActions)

      const response = await Services.sendPaymentMethodV3(
        store,
        orderFormId,
        paymentData,
      )

      const { data } = response

      actions.updateOrderForm(data, (err, orderForm) => cb(false, orderForm))
    } catch (e) {
      cb(true)
    }
  }
}

/**
 *
 * @param {*} store
 * @param {*} orderFormId
 * @param {*} cb
 */
export function createOrder(store, orderFormId, paymentData, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.createOrder(
        store,
        orderFormId,
        paymentData,
      )
      console.log("RESPONSE DE ORDEN", response);
      const { data } = response

      dispatch({
        type: CREATE_ORDER,
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

/**
 *
 * @param {*} store
 * @param {*} orderFormId
 * @param {*} cb
 */
export function createPayment(store, orderFormId, paymentData, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.createPayment(
        store,
        orderFormId,
        paymentData,
      )

      const { data } = response

      console.log(data)

      // dispatch({
      //   type: GET_PAYMENT_METHODS,
      //   payload: {
      //     data,
      //   },
      // })

      cb(false, data)
    } catch (e) {
      cb(true)
      console.log(e)
    }
  }
}

export function createPaymentV4(store, orderFormId, paymentData, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.createPaymentV4(
        store,
        orderFormId,
        paymentData,
      )

      const { data } = response

      console.log(data)

      // dispatch({
      //   type: GET_PAYMENT_METHODS,
      //   payload: {
      //     data,
      //   },
      // })

      cb(false, data)
    } catch (e) {
      cb(true)
      console.log(e)
    }
  }
}

/**
 *
 * @param {*} store
 * @param {*} orderFormId
 * @param {*} cb
 */
export function getOrder(store, orderGroup, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getOrder(store, orderGroup)

      const { data } = response

      dispatch({
        type: CREATE_ORDER,
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

/**
 *
 * @param {*} orderFormId
 * @param {*} cb
 */
export function getOneOrder(orderId, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getOneOrder(orderId)

      const { data } = response

      dispatch({
        type: GET_CURRENT_ORDER,
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

export function activeAnotherAddress(value) {
  return async (dispatch, state) => {
    dispatch({
      type: ACTIVE_ANOTHER_ADDRESS,
      payload: value,
    })
  }
}
