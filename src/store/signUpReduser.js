// eslint-disable-next-line no-unused-vars
import { LOG_OUT, PROFILE_EDIT, SIGN_IN, SIGN_UP } from './type';

const defState = {
  image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  username: null,
  email: null,
  token: null,
  isLogin: false,
};

// eslint-disable-next-line import/prefer-default-export, default-param-last
export const signUpReduser = (state = defState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        ...action.userData,
        isLogin: true,
      };
    case SIGN_IN:
      return {
        ...state,
        ...action.userData,
        isLogin: true,
      };
    case PROFILE_EDIT:
      return {
        ...state,
        ...action.userData,
        isLogin: true,
      };
    case LOG_OUT:
      return {
        ...state,
        username: null,
        email: null,
        isLogin: false,
        token: state.token,
      };
    default:
      return state;
  }
};
