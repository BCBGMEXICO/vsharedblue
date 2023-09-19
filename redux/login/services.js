import instance from '../../connection/instance'

/**
 * manda o codigo para logar codigo por email
 * @param {*} email email da pessoa
 */
export const getCodeUser = (email, store) => {
  instance.post(
    '/admin/api/login/send-key-email',
    {
      email,
    },
    { headers: { store } },
  )
}

/**
 * loga o usuario
 * @param {*} email email da pessoa
 */
export const setUser = (email, accesskey, store) => instance.post(
  '/admin/api/login/login-accesskey',
  {
    email,
    accesskey,
  },
  { headers: { store } },
)

export const verifyUserEmail = (email, store) => instance.post(
  '/admin/api/uservtex/verify',
  {
    email,
  },
  { headers: { store } },
)

export const loginUserByEmailPassword = (email, password, store) => instance.post(
  '/admin/api/v2/uservtex/login',
  {
    email,
    password,
  },
  { headers: { store } },
)

/**
 * loga o usuario por fb ou google
 * @param {*} email email da pessoa
 * @param {*} id id do usuario
 * @param {*} provider_oauth facebook ou google
 */
export const loginSocial = (
  email,
  provider_oauth_code,
  provider_oauth,
  store,
) => instance.post(
  '/admin/api/uservtex/login-social-network',
  {
    email,
    provider_oauth_code,
    provider_oauth,
  },
  { headers: { store } },
)

export const loginSocialNetwork = (token, provider, store) => instance.post(
  '/admin/api/user/login-social',
  {
    token,
    provider,
  },
  { headers: { store } },
)

/**
 * pega as infos do usario pelo id (RECOMENDADO QUANDO LOGAR COM FB OU GOOGLE)
 * @param {*} id id do usuario
 */
export const getInfoWithId = (id, store) => instance.get(`/admin/api/uservtex/${id}`, { headers: { store } })

export const getToken = (email, store) => instance.post(
  '/admin/api/v3/uservtex/login-code',
  { email },
  { headers: { store } },
)

export const getTokenRecoveryPassword = (email, store) => instance.post(
  '/admin/api/uservtex/login-code?password_recovery',
  { email },
  { headers: { store } },
)

export const validateCode = (email, code, store) => instance.post(
  '/admin/api/v3/uservtex/validate-code',
  { email, code },
  { headers: { store } },
)

export const changeRecoveryPassword = (token, password, store) => {
  const ApplicationToken = `Bearer ${token}`
  return instance.put(
    '/admin/api/v3/uservtex/new-password',
    { password },
    { headers: { store, ApplicationToken } },
  )
}
export const updateUser = (applicationToken, store, data) => {
  const ApplicationToken = `Bearer ${applicationToken}`
  return instance.put(
    '/admin/api/user',
    { ...data },
    { headers: { store, ApplicationToken } },
  )
}

export const updateUserV2 = (applicationToken, store, data) => {
  const ApplicationToken = `Bearer ${applicationToken}`
  return instance.put(
    '/admin/api/user',
    { ...data },
    { headers: { store, ApplicationToken } },
  )
}

export const getUserInfo = (applicationToken, store) => {
  const ApplicationToken = `Bearer ${applicationToken}`
  return instance.get('/admin/api/v3/uservtex/token', {
    headers: { store, ApplicationToken },
  })
}

export const getUserInfos = (applicationToken, store) => {
  const ApplicationToken = `Bearer ${applicationToken}`
  return instance.get('/admin/api/user/token', {
    headers: { store, ApplicationToken },
  })
}


export const getUserExists = (email, store) => {
  return instance.get(`https://bcbgmx.myvtex.com/api/checkout/pub/profiles?email=${email}`, {
    headers: { store },
  })
}

export const createUser = (orderFormId, userData, store) => {
  https://{accountName}.{environment}.com.br/api/checkout/pub/orderForm/{orderFormId}/attachments/clientProfileData
  return instance.post(`https://bcbgmx.myvtex.com/api/checkout/pub/orderForm/${orderFormId}/attachments/clientProfileData`,userData, {
    headers: { store },
  })
}
