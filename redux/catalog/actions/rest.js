import * as Services from '../services'
import {
  SEARCH_PRODUCTS_NAME,
  CLEAR_SEARCH,
  SEARCH_PRODUCTS_CATEGORY_REDIRECT,
  GET_PRODUCTS_SIMILARS,
  SEARCH_PRODUCTS_AUTOCOMPLETE,
  SEARCH_PRODUCTS_NAME_MORE,
  GET_CATEGORIES,
  GET_FILTERS,
  SET_FILTER,
  CLEAN_FILTERS,
  GET_PRODUCT_BY_ID,
  CLEAN_PRODUCT_BY_ID,
  GET_PRODUCT_BY_CLUSTER_ID,
  TOGGLE_SELECTED_ITEM,
  CLEAR_SELECTED_ITEM,
  SAVE_SEARCH,
  CLEAR_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS_AUTOCOMPLETE,
  SET_SELECTED_FILTER,
  CLEAR_SELECTED_FILTERS,
  SET_SELECTED_FILTER_SIZE,
  POST_SEND_EMAIL,
  GET_PRODUCTS_LENGTH,
  GET_PRODUCT_OPINIONS,
  CLEAR_PRODUCT_OPINIONS,
} from '../types'

export function clearSearch (cb) {
  return async (dispatch, state) => {
    try {
      dispatch({type: CLEAR_SEARCH})

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}
export function clearSearchProducts (cb) {
  return async (dispatch, state) => {
    try {
      dispatch({type: CLEAR_SEARCH_PRODUCTS})

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function clearSearchProductsAutoComplete (cb) {
  return async (dispatch, state) => {
    try {
      dispatch({type: CLEAR_SEARCH_PRODUCTS_AUTOCOMPLETE})

      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

export function selectItemFilter (value, tag, lastSelected) {
  return dispatch => {
    dispatch({
      type: TOGGLE_SELECTED_ITEM,
      payload: {
        data: value,
        tag,
        lastSelected,
      },
    })
  }
}
export function clearItemFilters () {
  return dispatch => {
    dispatch({
      type: CLEAR_SELECTED_ITEM,
    })
  }
}

export function setFiltersBack (data, lastSelected, cb) {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: SET_FILTER,
        payload: {
          data,
          lastSelected,
        },
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function searchProductsName (store, name, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchProductsName(store, name)

      const {data} = response

      dispatch({
        type: SEARCH_PRODUCTS_NAME,
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

export function getProductById (id, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getProductById(id)

      const {data} = response

      dispatch({
        type: GET_PRODUCT_BY_ID,
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

export function getProductByClusterId (id, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getProductsByClusterId(id)

      const {data} = response

      dispatch({
        type: GET_PRODUCT_BY_CLUSTER_ID,
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

export function searchProductsNameWithParams (store, name, params, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchProductsNameParams(
        store,
        name,
        params,
      )

      const {data} = response

      dispatch({
        type: SEARCH_PRODUCTS_NAME,
        payload: {
          data,
          name,
        },
      })

      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function searchProductsNameWithParamsMore (store, name, params, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchProductsNameParams(
        store,
        name,
        params,
      )

      const {data} = response

      dispatch({
        type: SEARCH_PRODUCTS_NAME_MORE,
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

export function searchProductsCategoryRedirect (clusterRedirect, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchProductsCategoryRedirect(
        clusterRedirect,
      )

      const {data} = response

      dispatch({
        type: SEARCH_PRODUCTS_CATEGORY_REDIRECT,
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

export function searchProductsCategoryRedirectMore (clusterRedirect, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchProductsCategoryRedirect(
        clusterRedirect,
      )

      const {data} = response

      dispatch({
        type: SEARCH_PRODUCTS_NAME_MORE,
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

export function getSimilarsProducts (id, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getSimilars(id, store)

      const {data} = response
      dispatch({
        type: GET_PRODUCTS_SIMILARS,
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

export function searchProductsAutocomplete (store, name, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.searchProductsAutocomplete(store, name)

      const {data} = response

      dispatch({
        type: SEARCH_PRODUCTS_AUTOCOMPLETE,
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

export function getCategories (store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getCategories(store)

      const {data} = response

      dispatch({
        type: GET_CATEGORIES,
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

export function getFilters (categorieA, mapFixed, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getFilters(categorieA, mapFixed)
      const {data} = response

      dispatch({
        type: GET_FILTERS,
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

export function setFilters (categorieA, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.setFilters(categorieA, cb)

      const {data} = response

      dispatch({
        type: SET_FILTER,
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

export function clearFilter () {
  return async dispatch => {
    dispatch({
      type: CLEAN_FILTERS,
      payload: {},
    })
  }
}

export function clearProductsById () {
  return async dispatch => {
    dispatch({
      type: CLEAN_PRODUCT_BY_ID,
      payload: undefined,
    })
  }
}

export function setSelectedFilters (
  index,
  indexCheckBox,
  idx,
  firstIndex,
  item,
  cb,
) {
  return async (dispatch, getState) => {
    const selectedItemChecbox = getState().catalog.selectedFilters
    dispatch({
      type: SET_SELECTED_FILTER,
      payload:
        index === indexCheckBox && idx === firstIndex
          ? [...selectedItemChecbox.filter(f => f.id !== item.id), item]
          : [item],
    })
    cb()
  }
}

export function setSelectedFiltersSize (item, cb) {
  return async (dispatch, getState) => {
    const selectedItemChecbox = getState().catalog.selectedFiltersSize
    const selectedItem = selectedItemChecbox.find(i => i.Name === item.Name)
    const selectedItemsIds = [
      ...selectedItemChecbox.filter(f => f.Name !== item.Name),
    ]
    if (selectedItem) {
      const index = selectedItemsIds.indexOf(selectedItem)
      selectedItemsIds.splice(index, 0)
    } else {
      selectedItemsIds.push(item)
    }
    dispatch({
      type: SET_SELECTED_FILTER_SIZE,
      payload: selectedItemsIds,
    })
    cb()
  }
}

export function clearSelectedFilters () {
  return async (dispatch, getState) => {
    dispatch({
      type: CLEAR_SELECTED_FILTERS,
      payload: [],
    })
  }
}

export function getProductLength (categorie, map, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getProductLength(categorie, map)

      const {data} = response

      dispatch({
        type: GET_PRODUCTS_LENGTH,
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

export function getProductOpinions (productId, trustVoxId, page, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getProductOpinions(
        productId,
        trustVoxId,
        page,
      )

      const {data} = response

      dispatch({
        type: GET_PRODUCT_OPINIONS,
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

export function clearProductOpinions () {
  return async (dispatch, state) => {
    try {
      dispatch({
        type: CLEAR_PRODUCT_OPINIONS,
      })
    } catch (e) {
      console.log('e', e)
    }
  }
}

export function getProductAvaliationPayload (productId, trustVoxId, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getProductAvaliationPayload(
        productId,
        trustVoxId,
      )

      const {data} = response

      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}
