// eslint-disable-next-line no-unused-vars
import { NEW_ARTICLE, EDIT_ARTICLE, ONE_ARTICLE } from './type';

const defState = {
  author: {},
  body: '',
  createdAt: '',
  description: '',
  favorited: '',
  favoritesCount: 0,
  slug: '',
  tagList: [],
  title: '',
  updatedAt: '',
};

// eslint-disable-next-line import/prefer-default-export, default-param-last
export const newArticleReducer = (state = defState, action) => {
  switch (action.type) {
    case NEW_ARTICLE:
      return {
        ...state,
        ...action.articleData,
      };
    case EDIT_ARTICLE:
      return {
        ...state,
        ...action.articleData,
      };
    case ONE_ARTICLE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
