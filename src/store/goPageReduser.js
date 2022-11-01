import { GO_TO_PAGE } from './type';

const defState = { page: 1 };

// eslint-disable-next-line import/prefer-default-export, default-param-last
export const goPageReduser = (state = defState, action) => {
  switch (action.type) {
    case GO_TO_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};
