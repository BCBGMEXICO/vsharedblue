import instance from '../connection/instance'

export const filterProducts = (order) => instance.get(`/catalog/v1/api/product/productsbycategory/1/vestido?order_by=${order}`)
