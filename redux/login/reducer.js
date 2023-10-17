import {
  SET_USER,
  VERIFY_USER_EMAIL,
  CLEAR_USER,
  LOGIN_USER,
  CLEAR_USER_TOKEN,
  GET_TOKEN,
  VALIDATE_CODE,
  UPDATE_USER,
  UPDATE_USER2,
  IS_FIRST_TIME,
} from './types';

const INITIAL = {
  user: undefined,
  userToken: undefined,
  isFirstTime: true,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userToken: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.data,
      };
    case UPDATE_USER2:
      return {
        ...state,
        user: action.payload,
      };
    case VERIFY_USER_EMAIL:
      return {
        ...state,
        user: action.payload.data,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: undefined,
      };
    case CLEAR_USER_TOKEN:
      return {
        ...state,
        user: undefined,
        userToken: undefined,
      };
    case LOGIN_USER:
      console.log("LOGIN STATE", state.login?.user);
      return {
        ...state,
        userToken: action.payload.data.token,
        user: action.payload.data.user,
      };
    case GET_TOKEN:
      return {
        ...state,
        userToken: action.payload.data,
      };
    case VALIDATE_CODE:
      return {
        ...state,
        userToken: action.payload.data,
      };
    case IS_FIRST_TIME:
      return {
        ...state,
        isFirstTime: action.payload,
      };
    default:
      return state;
  }
};
