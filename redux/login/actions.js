import {
  SET_USER,
  VERIFY_USER_EMAIL,
  LOGIN_USER,
  CLEAR_USER,
  CLEAR_USER_TOKEN,
  GET_TOKEN,
  VALIDATE_CODE,
  UPDATE_USER,
  GET_INFO_WITH_ID,
  UPDATE_USER2,
  IS_FIRST_TIME,
  CREATE_USER
} from './types'
import * as Services from './services'

/**
 * manda o codigo para logar codigo por email
 * @param {*} email email da pessoa
 * @param {*} store loja
 */
export function getCodeUser(email, store, cb) {
  return async (dispatch, state) => {
    try {
      await Services.getCodeUser(email, store)
      cb(false)
    } catch (e) {
      cb(true)
    }
  }
}

/**
 * loga o usuario PELO EMAIL
 * @param {*} email email da pessoa
 * @param {*} accesskey codigo recebido pelo email
 * @param {*} store loja
 */
export function setUser(email, accesskey, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.setUser(email, accesskey, store)
      const { data } = response
      dispatch({
        type: SET_USER,
        payload: {
          data,
        },
      })
      cb(false)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}

/**
 * verifica se o email esta na base ou se existe o email
 * @param {*} email email da pessoa
 */
export function verifyUserEmail(email, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.verifyUserEmail(email, store)
      const { data } = response
      dispatch({
        type: VERIFY_USER_EMAIL,
        payload: {
          data,
        },
      })
      cb(false)
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * loga o usuario usando senha e email
 * @param {*} email email da pessoa
 * @param {*} password senha da pessoa
 */
export function loginUserByEmailPassword(email, password, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.loginUserByEmailPassword(
        email,
        password,
        store,
      )
      const { data } = response
      dispatch({
        type: LOGIN_USER,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * loga o usuario usando senha e email
 * @param {*} email email da pessoa
 * @param {*} newPassword nova senha da pessoa
 */
export function loginWithNewPassword(token, newPassword, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.changeRecoveryPassword(
        token,
        newPassword,
        store,
      )
      const { data } = response
      dispatch({
        type: LOGIN_USER,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * limpa o usuario
 */
export function clearUser() {
  return async dispatch => {
    dispatch({
      type: CLEAR_USER,
      payload: undefined,
    })
  }
}

/**
 * limpa o token do usuario e o usuario
 */
export function clearUserToken() {
  return async dispatch => {
    dispatch({
      type: CLEAR_USER_TOKEN,
      payload: undefined,
    })
  }
}

/**
 * loga com social (fb ou google etc)
 * @param {*} email email
 * @param {*} provider_oauth_code id do user
 * @param {*} provider_oauth nome da rede social
 */
export function loginWithSocial(
  email,
  provider_oauth_code,
  provider_oauth,
  store,
  cb,
) {
  return async (dispatch, state) => {
    try {
      const response = await Services.loginSocial(
        email,
        provider_oauth_code,
        provider_oauth,
        store,
      )
      const { data } = response
      dispatch({
        type: LOGIN_USER,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}

export function loginWithSocialNetwork(token, provider, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.loginSocialNetwork(token, provider, store)
      const { data } = response
      dispatch({
        type: LOGIN_USER,
        payload: {
          data,
        },
      })
      cb(false, data)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}

/**
 * tras as infos do usuario pasando id (recomendado antes de logar com fb ou google)
 * @param {*} email email
 */
export function getInfoWithId(id, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getInfoWithId(id, store)
      const { data } = response
      dispatch({
        type: GET_INFO_WITH_ID,
        payload: { user: data },
      })
      cb(false, data)
    } catch (e) {
      console.log('aew')
      cb(true)
    }
  }
}

/**
 * tras o token para logar
 * @param {*} email email
 */
export function getLoginToken(email, store, cb) {
  return async (dispatch, state) => {
    try {
      console.log("LOGIN CODE CALLED");
      const response = await Services.getToken(email, store)
      const { data } = response
      console.log("LOGIN DATA", data)
      cb(false, data, response.status)
    } catch (e) {
      console.log("LOGIN ERROR", e)
      cb(true, e)
    }
  }
}

/**
 * tras o token para recuperar senha
 * @param {*} email email
 */
export function getRecoveryPasswordToken(email, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getTokenRecoveryPassword(email, store)
      const { data } = response
      dispatch({
        type: GET_TOKEN,
        payload: {
          data,
        },
      })
      cb(false, data, response.status)
    } catch (e) {
      cb(true, e)
    }
  }
}

/**
 * valida o token
 * @param {*} email email
 * @param {*} token token
 */
export function validateCode(email, code, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.validateCode(email, code, store)
      const { data } = response
      dispatch({
        type: VALIDATE_CODE,
        payload: {
          data: data?.token,
        },
      })
      cb(false, data)
    } catch (e) {
      cb(true, e)
    }
  }
}

export function updateUser(token, store, dataUser, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.updateUser(token, store, dataUser)
      const { data } = response
      dispatch({
        type: UPDATE_USER2,
        payload: data,
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function updateUserV2(token, store, dataUser, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.updateUserV2(token, store, dataUser)
      const { data } = response
      dispatch({
        type: UPDATE_USER2,
        payload: data,
      })
      cb(false, data)
    } catch (e) {
      cb(true)
    }
  }
}

export function getUserInfoByToken(token, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getUserInfo(token, store)
      const { data } = response

      dispatch({
        type: UPDATE_USER,
        payload: {
          data,
        },
      })

      cb(false, data)
    } catch (e) {
      console.log('erro', e)
      cb(true)
    }
  }
}

export function getUserInfosByToken(token, store, cb) {
  return async (dispatch, state) => {
    try {
      const response = await Services.getUserInfos(token, store)
      const { data } = response

      dispatch({
        type: UPDATE_USER,
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

export function isFirstTime(cb) {
  return async (dispatch, state) => {
    dispatch({
      type: IS_FIRST_TIME,
      payload: false,
    })
  }
}

/**
 * verifica se o email esta na base ou se existe o email
 * @param {*} email email da pessoa
 */
export function createUser(store, userdata, orderFormId, cb) {
  return async (dispatch, state) => {
    try {
      let result = await Services.getUserExists();
      console.log("USER EXISTS", result);
      if (result != null) {
        let user = result.data;
        if (user.userProfileId == null) {
          try {
            let created = await Services.createUser(orderFormId, userdata, store)
            console.log("CREATED USER", created);
            cb(false, created.data)
          } catch (e) {
            console.log("ERROR", e);
            cb(true, e)
          }
        }
        else
          return user;
      }
      else {
        console.log("ERRROR RESULT IS NULL");
        cb(true, null)
      }
      // const response = await Services.verifyUserEmail(email, store)
      // const {data} = response
      // dispatch({
      //   type: VERIFY_USER_EMAIL,
      //   payload: {
      //     data,
      //   },
      // })
      //cb(false)
    } catch (e) {
      console.log("EXCEPTION USER", e)
      cb(true, e)
    }
  }
}