import {selectedItems} from '../../utils/filter'
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
  CLEAR_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS_AUTOCOMPLETE,
  TOGGLE_SELECTED_ITEM,
  CLEAR_SELECTED_ITEM,
  SET_SELECTED_FILTER,
  SET_SELECTED_FILTER_SIZE,
  CLEAR_SELECTED_FILTERS,
  GET_PRODUCTS_LENGTH,
  GET_PRODUCT_OPINIONS,
  CLEAR_PRODUCT_OPINIONS,
} from './types'

const INITIAL = {
  search: {
    products: [],
    autocomplete: {},
    similarsProducts: [],
  },
  categories: [],
  filters: {},
  productById: undefined,
  filtredItems: {},
  selectedItems: {},
  lastSelected: null,
  productsLength: 0,
  selectedFilters: [],
  selectedFiltersSize: [],
  opinions: [],
}

export default (state = INITIAL, action) => {
  switch (action.type) {
    case CLEAR_SEARCH:
      return {
        ...state,
        search: {},
      }
    case CLEAR_SEARCH_PRODUCTS:
      return {
        ...state,
        search: {
          ...state.search,
          products: [],
        },
      }
    case CLEAR_SEARCH_PRODUCTS_AUTOCOMPLETE:
      return {
        ...state,
        search: {
          ...state.search,
          autocomplete: {},
        },
      }
    case SEARCH_PRODUCTS_NAME:
      return {
        ...state,
        lastSelected: !state.lastSelected
          ? action.payload.name
          : state.lastSelected,
        search: {
          ...state.search,
          products: action.payload.data,
        },
      }
    case SEARCH_PRODUCTS_NAME_MORE:
      return {
        ...state,
        search: {
          ...state.search,
          products: [...state.search.products, ...action.payload.data],
        },
      }
    case SEARCH_PRODUCTS_CATEGORY_REDIRECT:
      return {
        ...state,
        search: {
          ...state.search,
          products: action.payload.data,
        },
      }
    case SEARCH_PRODUCTS_AUTOCOMPLETE:
      return {
        ...state,
        search: {
          ...state.search,
          autocomplete: action.payload.data,
        },
      }
    case GET_PRODUCTS_SIMILARS:
      return {
        ...state,
        search: {
          ...state.search,
          similarsProducts: action.payload.data,
        },
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.data,
      }
    case GET_FILTERS:
      return {
        ...state,
        filters: action.payload.data,
      }
    case SET_FILTER:
      return {
        ...state,
        filtredItems: action.payload.data,
        lastSelected: action.payload.lastSelected,
      }
    case CLEAN_FILTERS:
      return {
        ...state,
        filtredItems: action.payload.data,
      }
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productById: action.payload.data[0],
      }
    case GET_PRODUCT_BY_CLUSTER_ID:
      return {
        ...state,
        productById: action.payload.data,
      }
    case CLEAN_PRODUCT_BY_ID:
      return {
        ...state,
        productById: undefined,
      }
    case TOGGLE_SELECTED_ITEM:
      return {
        ...state,
        selectedItems: selectedItems(
          action.payload.data,
          action.payload.tag,
          state,
        ),
        lastSelected: action.payload.lastSelected,
      }
    case CLEAR_SELECTED_ITEM:
      return {
        ...state,
        selectedItems: {},
        lastSelected: null,
      }
    case SET_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters: action.payload,
      }
    case SET_SELECTED_FILTER_SIZE:
      return {
        ...state,
        selectedFiltersSize: action.payload,
      }
    case CLEAR_SELECTED_FILTERS:
      return {
        ...state,
        selectedFilters: action.payload,
        selectedFiltersSize: action.payload,
      }
    case GET_PRODUCTS_LENGTH:
      return {
        ...state,
        productsLength: action.payload,
      }
    case GET_PRODUCT_OPINIONS:
      return {
        ...state,
        opinions: [...state.opinions, ...action.payload.data.items],
      }
    case CLEAR_PRODUCT_OPINIONS:
      return {
        ...state,
        opinions: [],
      }
    default:
      return state
  }
}
