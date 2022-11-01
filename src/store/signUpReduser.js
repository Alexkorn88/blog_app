import { LOG_OUT, SIGN_UP } from './type';

const defState = {
  user: {
    username: null,
    email: null,
    token: null,
    image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  },
};

// eslint-disable-next-line import/prefer-default-export, default-param-last
export const signUpReduser = (state = defState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        // user: { username: action.user.username },
        ...action.user,
        // user.email: action.user.email,
        // user.token: action.user.token,
      };
    case LOG_OUT:
      return defState;
    default:
      return state;
  }
};
