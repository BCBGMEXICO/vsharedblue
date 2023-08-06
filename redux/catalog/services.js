import instance, {trustVox} from '../../connection/instance'
import graphql from '../../connection/instance/graphql'

export const searchProductsName = (store, name) =>
  instance.get(`/catalog/v1/api/product/productsbycategory/${store}/${name}`)
export const searchProductsNameParams = (store, name = '', params = '') =>
  instance.get(
    `/catalog/v1/api/product/productsbycategory/${store}/${name}${params}`,
  )
export const searchProductsCategoryRedirect = clusterRedirect =>
  instance.get(clusterRedirect)
export const searchProductsAutocomplete = (store, name) =>
  instance.get(`/catalog/v1/api/product/autocomplete/${store}/${name}`)
export const getSimilars = (id, store) =>
  instance.get(`/catalog/v1/api/product/similars/${store}/${id}`)
export const getCategories = store =>
  instance.get(`/catalog/v1/api/categories/${store}`)
export const getFilters = (categorie, mapFixed) => {
  const correctUrl = mapFixed
    ? `/catalog/v1/api/categories/1/filter/${categorie}?map=c`
    : `/catalog/v1/api/categories/1/filter/${categorie}?map=c,c`
  return instance.get(correctUrl)
}
export const setFilters = categorie =>
  instance.get(`/catalog/v1/api/categories/1/filter${categorie}`)
export const getProductById = id =>
  instance.get(`/catalog/v1/api/product/searchfq/1?fq=productId:${id}`)
export const getProductsByClusterId = id =>
  instance.get(`/catalog/v1/api/product/searchfq/1?fq=productClusterIds:${id}`)
export const getProductLength = (categorie, map) =>
  instance.get(
    `catalog/v1/api/product/get-total-products-by-category/1/${categorie}${map}`,
  )

export const getProductAvaliationPayload = (productId, trustVoxId) =>
  trustVox.get(
    `widget/shelf/v2/products_rates?store_id=${trustVoxId}&codes[]=${productId}`,
  )

export const getProductOpinions = (productId, trustVoxId, page) =>
  trustVox.get(
    `widget/opinions?code=${productId}&store_id=${trustVoxId}&page=${page}`,
  )
