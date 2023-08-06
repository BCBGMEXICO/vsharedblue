import instance from '../../connection/instance'

export const getInfo = () => instance.get('/admin/api/v1/stores/1/allinfo')
export const getHomeInfos = () => instance.get('/admin/api/v1/kernel/page/data/1')
export const getCategoriesBanners = () => instance.get('/admin/api/categories')
export const getSpotlightBanners = () => instance.get('/admin/api/categories-spotlight/1')
export const getInfoByGeolocation = (lat, lon, id, quantity, seller, postalCode, country, store) => instance.post(`/admin/api/store/get-product-pickup-info?lat=${lat}&lon=${lon}`, {
  items: [
    {
      id,
      quantity,
      seller,
    },
  ],
  postalCode,
  country,
}, { headers: { store } })

export const getShoppingList = (userId, store) => instance.get(`/admin/api/v1/shoppinglist/byuserid/${userId}`, { headers: { store } })

export const getStores = (store) => instance.get('/admin/api/v1/stores/search?_fields=address,city,complement,country,horario,latitude,longitude,name,neighborhood,number,phone,postalCode,state,uf,productLine', { headers: { store } })

export const getStoresWithGeolocation = (store, lat, lon) => instance.get('/admin/api/v1/stores/search?_fields=address,city,complement,country,horario,latitude,longitude,name,neighborhood,number,phone,postalCode,state,uf,productLine', { headers: { store, lat, lon } })

export const searchForStore = (store, text) => instance.get(`/admin/api/v1/stores/search?_fields=address,city,complement,country,horario,latitude,longitude,name,neighborhood,number,phone,postalCode,state,uf,productLine&_keyword=${text}`, { headers: { store } })

export const sendEmail = (name, email, id) => instance.post('/admin/api/aviseme', { notifymeClientName: name, notifymeClientEmail: email, notifymeIdSku: id })

export const insertItemShoppingList = (shoppingListId, skuId, name, store) => instance.post('/admin/api/v1/shoppinglist/item/insert', {
  shopping_list_id: shoppingListId,
  sku_id: skuId,
  name,
}, { headers: { store } })

export const removeItemShoppingList = (shoppingListId, skuId, store) => instance.post('/admin/api/v1/shoppinglist/item/remove', {
  shopping_list_id: shoppingListId,
  sku_id: skuId,
  headers: { store },
})
