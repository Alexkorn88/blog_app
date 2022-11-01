import { ALL_ARTICLES } from './type';

const defState = {};

// eslint-disable-next-line import/prefer-default-export, default-param-last
export const articlesReduser = (state = defState, action) => {
  switch (action.type) {
    case ALL_ARTICLES:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
