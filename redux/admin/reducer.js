import {
  GET_INFO, GET_HOME_INFO, GET_CATEGORIES_BANNERS, GET_SPOTLIGHT_BANNERS, GET_INFO_BY_GEOLOCATION, GET_SHOPPING_LIST, CLEAR_SHOPPING_LIST, SET_USER, GET_STORES, VERIFY_USER_EMAIL, CLEAR_USER, LOGIN_USER,
} from './types'

const INITIAL = {
  info: {},
  homeInfos: [],
  categoriesBanners: [],
  spotlightBanners: [],
  geolocationInfo: [],
  shoppingList: {},
  user: undefined,
  userToken: undefined,
  stores: {},
}

export default (state = INITIAL, action) => {
  switch (action.type) {
    case GET_INFO:
      return {
        ...state,
        info: action.payload.data,
      }
    case GET_HOME_INFO:
      return {
        ...state,
        homeInfos: action.payload.data,
      }
    case GET_CATEGORIES_BANNERS:
      return {
        ...state,
        categoriesBanners: action.payload.data,
      }
    case GET_SPOTLIGHT_BANNERS:
      return {
        ...state,
        spotlightBanners: action.payload.data.data,
      }
    case GET_INFO_BY_GEOLOCATION:
      return {
        ...state,
        geolocationInfo: action.payload.data.data,
      }
    case CLEAR_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: [],
      }
    case GET_SHOPPING_LIST:
      return {
        ...state,
        shoppingList: action.payload.data,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload.data,
      }
    case VERIFY_USER_EMAIL:
      return {
        ...state,
        user: action.payload.data,
      }
    case CLEAR_USER:
      return {
        ...state,
        user: undefined,
      }
    case LOGIN_USER:
      return {
        ...state,
        userToken: action.payload.data,
      }
    case GET_STORES:
      return {
        ...state,
        stores: action.payload.data,
      }
    default:
      return state
  }
}
