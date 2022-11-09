import {
  ONE_ARTICLE,
  ALL_ARTICLES,
  GO_TO_PAGE,
  SIGN_UP,
  LOG_OUT,
  SIGN_IN,
  PROFILE_EDIT,
  NEW_ARTICLE,
  EDIT_ARTICLE,
} from './type';

export const addGoPageAction = (page) => ({ type: GO_TO_PAGE, page });

// eslint-disable-next-line default-param-last
export function addArticlesAction(pageCount = 0, token) {
  const offset = pageCount * 5 - 5;
  return async (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset > 0 ? offset : 0}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: ALL_ARTICLES, data: res });
      })
      .catch((e) => console.log(e));
  };
}

export function articleAction(artSlug, token) {
  return async (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${artSlug}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const artData = res.article;
        dispatch({ type: ONE_ARTICLE, data: artData });
      })
      .catch((e) => console.log(e));
  };
}

export const addLogOutAction = () => ({ type: LOG_OUT });

export function addSignUpAction(data) {
  return async (dispatch) => {
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username: data.username, email: data.email, password: data.password } }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const userData = res.user;
        dispatch({ type: SIGN_UP, userData });
      })
      .catch((e) => console.log(e));
  };
}

export function addSignInAction(data, token) {
  return async (dispatch) => {
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email: data.email, password: data.password } }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const userData = res.user;
        dispatch({ type: SIGN_IN, userData });
      })
      .catch((e) => console.log(e));
  };
}

export function addProfileEditAction(data, token) {
  return async (dispatch) => {
    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { username: data.username, email: data.email, password: data.password, image: data.image },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const userData = res.user;
        dispatch({ type: PROFILE_EDIT, userData });
      })
      .catch((e) => console.log(e));
  };
}

export function addNewArticleAction(data, token) {
  return async (dispatch) => {
    fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: { title: data.title, description: data.description, body: data.body, tagList: data.tagList },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const articleData = res.article;
        dispatch({ type: NEW_ARTICLE, articleData });
      })
      .catch((e) => console.log(e));
  };
}
export function addEditArticleAction(data, token, slug) {
  return async (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: { title: data.title, description: data.description, body: data.body, tagList: data.tagList },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const articleData = res.article;
        dispatch({ type: EDIT_ARTICLE, articleData });
      })
      .catch((e) => console.log(e));
  };
}

export function addLikeArticleAction(token, slug) {
  return async (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const articleData = res.article;
        dispatch({ type: EDIT_ARTICLE, articleData });
      })
      .catch((e) => console.log(e));
  };
}
export function addDislikeArticleAction(token, slug) {
  return async (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const articleData = res.article;
        dispatch({ type: EDIT_ARTICLE, articleData });
      })
      .catch((e) => console.log(e));
  };
}
