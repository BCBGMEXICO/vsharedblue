import * as Services from './services'
import {
  GET_INFO,
  GET_HOME_INFO,
  GET_CATEGORIES_BANNERS,
  GET_SPOTLIGHT_BANNERS,
  GET_INFO_BY_GEOLOCATION,
  GET_SHOPPING_LIST,
  CLEAR_SHOPPING_LIST,
  SET_USER,
  GET_STORES,
  VERIFY_USER_EMAIL,
  CLEAR_USER,
  LOGIN_USER,
  POST_SEND_EMAIL,
} from './types'

export function getInfo (cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getInfo()

      const {data} = response

      dispatch({
        type: GET_INFO,
        payload: {
          data,
        },
      })

      cb(false, data)
    } catch (e) {
      console.log('admin get info', e)
      cb(true)
    }
  }
}

export function getHomeInfos (cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getHomeInfos()

      const {data} = response

      dispatch({
        type: GET_HOME_INFO,
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

export function sendEmail (name, email, id, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.sendEmail(name, email, id)
      const {data} = response
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function getCategoriesBanners (cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getCategoriesBanners()

      const {data} = response
      dispatch({
        type: GET_CATEGORIES_BANNERS,
        payload: {data},
      })
      cb(false)
    } catch (e) {
      console.log('admin get categories banners', e)
      cb(true)
    }
  }
}

export function getSpotlightBanners (cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getSpotlightBanners()

      const {data} = response
      dispatch({
        type: GET_SPOTLIGHT_BANNERS,
        payload: {data},
      })
      cb(false)
    } catch (e) {
      console.log('admin get spotlight banners', e)
      cb(true)
    }
  }
}

export function getStoreByGeolocation (
  lat,
  lon,
  id,
  quantity,
  seller,
  postalCode,
  country,
  store,
  cb,
) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getInfoByGeolocation(
        lat,
        lon,
        id,
        quantity,
        seller,
        postalCode,
        country,
        store,
      )

      const {data} = response
      dispatch({
        type: GET_INFO_BY_GEOLOCATION,
        payload: {data},
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

/**
 * Limpa o state do shoppingList
 * @param {*} cb callback da action
 */
export function clearShoppingList (cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: CLEAR_SHOPPING_LIST,
      })

      cb(false)
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * Pega uma lista de compras
 * @param {*} userId id do usuário
 * @param {*} store id da loja
 * @param {*} cb callback da action
 */
export function getShoppingList (userId, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getShoppingList(userId, store)

      const {data} = response

      await dispatch({
        type: CLEAR_SHOPPING_LIST,
        payload: {data},
      })

      dispatch({
        type: GET_SHOPPING_LIST,
        payload: {data},
      })

      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * Inseri um item na lista de compras
 * @param {*} shoppingListId id da lista de compras
 * @param {*} skuId id do item
 * @param {*} name nome do item
 * @param {*} store id da loja
 * @param {*} cb callback da action
 */
export function insertItemShoppingList (
  userId,
  shoppingListId,
  skuId,
  name,
  store,
  cb,
) {
  return async (dispatch, getState) => {
    try {
      await Services.insertItemShoppingList(shoppingListId, skuId, name, store)

      dispatch(
        getShoppingList(userId, store, (err, data) => {
          cb(false, data)
        }),
      )
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * Remove um item da lista de compras
 * @param {*} shoppingListId id da lista de compras
 * @param {*} skuId id do item
 * @param {*} store id da loja
 * @param {*} cb callback da action
 */
export function removeItemShoppingList (
  userId,
  shoppingListId,
  skuId,
  store,
  cb,
) {
  return async (dispatch, getState) => {
    try {
      await Services.removeItemShoppingList(shoppingListId, skuId, store)

      dispatch(
        getShoppingList(userId, store, (err, data) => {
          cb(false, data)
        }),
      )
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * manda o codigo para logar codigo por email
 * @param {*} email email da pessoa
 * @param {*} store loja
 */
export function getCodeUser (email, store, cb) {
  return async (dispatch, state) => {
    try {
      await Services.getCodeUser(email, store)
      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

/**
 * tras as lojas
 * @param {*} stores loja
 */
export function getStores (store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getStores(store)
      const {data} = response
      dispatch({
        type: GET_STORES,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}

/**
 * tras as lojas com geocode <lojas mais proximas>
 * @param {*} stores loja
 * @param {*} lat latitude
 * @param {*} lon longitude
 */
export function getStoresWithGeolocation (store, lat, lon, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getStoresWithGeolocation(store, lat, lon)
      const {data} = response
      dispatch({
        type: GET_STORES,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}

/**
 * tras as lojas
 * @param {*} stores loja
 * @param {*} text texto para search de loja
 */
export function searchForStore (store, text, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchForStore(store, text)
      const {data} = response
      dispatch({
        type: GET_STORES,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}
