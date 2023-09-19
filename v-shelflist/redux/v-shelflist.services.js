import instance from '../../connection/instance'

export const getProducts = () => instance.get(`/catalog/v1/api/product/searchfq/1?fq=productName:vestido`)
