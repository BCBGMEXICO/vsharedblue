import instance from '../../connection/instance'

export const getOrderForm = (loja) => instance.get(`/oms/v2/api/carts/orderform/${loja}`, {
  headers: {
    sc: 1,
  },
})

export const getExistentOrderForm = (loja, id) => instance.get(`/oms/v2/api/carts/orderform/${loja}/${id}`, {
  headers: {
    sc: 1,
  },
})

export const orderAddItem = (loja, orderId, productId, qty, sellerId) => instance.post(`/oms/v2/api/carts/orderform/${loja}/${orderId}/items`, {
  items: [
    {
      id: productId,
      quantity: qty,
      seller: sellerId,
    },
  ],
  salesChannel: 1,
})

export const orderRemoveItem = (loja, orderId, index, qty) => instance.post(`/oms/v2/api/carts/orderform/${loja}/${orderId}/items/update`, {
  items: [
    {
      quantity: qty,
      index,
    },
  ],
  salesChannel: 1,
})

export const getPostalCode = (cep, loja) => instance.get(`/oms/v2/api/shipping/postal-code/${loja}/${cep}`)

export const addShippingData = (orderFormId, loja, postalCode) => instance.post(`/oms/v2/api/shipping/group/${loja}/${orderFormId}`, postalCode)

export const selectDeliveryOption = (orderFormId, loja, dataDeliveryOption) => instance.post(
  `/oms/v2/api/shipping/split/${loja}/${orderFormId}/selectoption`,
  dataDeliveryOption,
)

export const setCoupon = (store, orderFormId, text) => instance.post(`/oms/v1/api/carts/coupon/${store}/${orderFormId}/${text}`)

export const removeCoupon = (store, orderFormId) => instance.post(`/oms/v1/api/carts/coupon/${store}/${orderFormId}/0`)

export const addGift = (loja, orderformId, giftId, items) => instance.post(`/oms/v1/api/checkout/gift/select/${loja}`, {
  orderformId,
  giftId,
  items,
})

export const getMyOrders = (loja, email, pageNumber, pageSize) => instance.get(`/oms/v1/api/user/orders/${loja}/${email}`, {
  headers: { pageNumber, pageSize },
})

export const getMyOrdersV2 = (store, pageNumber, pageSize, token) => instance.get(`/oms/v2/api/user/orders/${store}`, {
  headers: { ApplicationToken: `Bearer ${token}`, pageNumber, pageSize },
})

export const setCouponMessage = (store, orderFormId, textfield) => instance.post(`oms/v1/api/carts/textfield/${store}/${orderFormId}`, {
  textfield,
})
