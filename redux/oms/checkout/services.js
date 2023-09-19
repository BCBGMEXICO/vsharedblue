import instance from '../../../connection/instance'

// MyData
export const identifyUser = (store, email, orderFormId) => instance.post(
  `oms/v2/api/carts/orderform/identifyuser/${store}/${email}/${orderFormId}`,
)
export const identifyUserV3 = (store, email, orderFormId, identifyUserHeader) => instance.post(
  `oms/v3/api/carts/orderform/identifyuser/${store}/${email}/${orderFormId}`, {}, { headers: identifyUserHeader },
)

export const addClientProfile = (store, orderFormId, clientProfileData) => instance.post(
  `/oms/v2/api/carts/orderform/clientprofile/${store}/${orderFormId}`,
  clientProfileData,
)

export const getUser = (store, email) => instance.get(`/oms/v1/api/user/info/${store}/${email}`)

export const onlyAppPromo = (orderformId, platform, appName) => instance.post(
  `/oms/v2/api/carts/orderform/marketingdata/1/${orderformId}`,
  {
    coupon: null,
    marketingTags: ['tag1', 'tag2'],
    utmCampaign: null,
    utmMedium: null,
    utmSource: `app_${platform}`, // ou app_android
    utmiCampaign: appName,
    utmiPart: null,
    utmipage: null,
  },
)

export const onlyAppPromoAnimale = (orderformId, platform, appName, coupon) => instance.post(
  `/oms/v2/api/carts/orderform/marketingdata/1/${orderformId}`,
  {
    coupon,
    marketingTags: ['tag1', 'tag2'],
    utmCampaign: null,
    utmMedium: null,
    utmSource: `app_${platform}`, // ou app_android
    utmiCampaign: appName,
    utmiPart: null,
    utmipage: null,
  },
)

// Address
export const getPostalCode = (store, postalCode) => instance.get(`/oms/v2/api/shipping/postal-code/${store}/${postalCode}`)
export const addShippingData = (store, orderFormId, postalCode) => instance.post(
  `/oms/v2/api/shipping/group/${store}/${orderFormId}`,
  postalCode,
)

export const addShippingDataV3 = (store, orderFormId, postalCode) => instance.post(
  `/oms/v3/api/shipping/group/${store}/${orderFormId}`,
  postalCode,
)
//TODO
export const selectDeliveryOption = (store, orderFormId, deliveryOption) =>

  // instance.post(
  //   `https://bcbgmx.myvtex.com/api/checkout/pub/orderForm/${orderFormId}/attachments/shippingData`,
  //   deliveryOption, { headers: { store } })

  instance.post(
    `/oms/v2/api/shipping/split/${store}/${orderFormId}/selectoption`,
    deliveryOption,)


export const selectDeliveryOptionv2 = (store, orderFormId, deliveryOption) =>

  instance.post(
    `https://bcbgmx.myvtex.com/api/checkout/pub/orderForm/${orderFormId}/attachments/shippingData`,
    deliveryOption, { headers: { store } })



// Payment
export const getPaymentMethods = (store, orderFormId) => instance.get(
  `/oms/v2/api/carts/orderform/payment/methods/${store}/${orderFormId}`,
)
export const sendPaymentMethod = (store, orderFormId, paymentData) => instance.post(
  `/oms/v2/api/carts/orderform/payment/send/${store}/${orderFormId}`,
  paymentData,
)
export const sendPaymentMethodV3 = (store, orderFormId, paymentData) => instance.post(
  `/oms/v3/api/carts/orderform/payment/send/${store}/${orderFormId}`,
  paymentData,
)
export const createOrder = (store, orderFormId, paymentData) => instance.post(
  `/oms/v2/api/checkout/createorder/${store}/${orderFormId}`,
  paymentData,
)
export const createPayment = (store, orderFormId, paymentData) => instance.post(
  `/oms/v2/api/checkout/sendpayment/${store}/${orderFormId}`,
  paymentData,
)
export const createPaymentV4 = (store, orderFormId, paymentData) => instance.post(
  `/oms/v4/api/checkout/sendpayment/${store}/${orderFormId}`,
  paymentData,
)
export const getOrder = (store, orderGroup) => instance.get(`/oms/v1/api/order/${store}/${orderGroup}`)

export const getOneOrder = (orderId) => instance.get(`/api/oms/user/orders/${orderId}`)
