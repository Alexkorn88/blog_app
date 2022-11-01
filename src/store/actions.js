/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import { ALL_ARTICLES, GO_TO_PAGE, SIGN_UP, LOG_OUT } from './type';

export const addGoPageAction = (page) => ({ type: GO_TO_PAGE, page });
// export const addOneCheckAction = (id) => ({ type: ONE_CHECK, id });
// export const addFilterAction = (id) => ({ type: TOGGLE_FTR, id });
// export const addFiveTicketAction = () => ({ type: ADD_FIVE_TICKETS });

export function addArticlesAction(pageCount = 0) {
  const offset = pageCount * 5 - 5;
  return async (dispatch) => {
    fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset > 0 ? offset : 0}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: ALL_ARTICLES, data: res });
      })
      .catch((e) => console.log(e));
  };
}

export const addLogOutAction = () => ({ type: LOG_OUT });

export function addSignUpAction(data) {
  // console.log(data);
  return async (dispatch) => {
    fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        // eslint-disable-next-line prettier/prettier
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username: data.username, email: data.email, password: data.password } }),
    })
      .then((res) => res.json())
      .then((user) => {
        // const image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
        dispatch({ type: SIGN_UP, user });
      })
      .catch((e) => console.log(e));
  };
}

// export function addArticlesAction() {
//   // const searchId = useSelector((state) => state.searchIds.searchId);
//   //   const stop = false;
//   return async (dispatch) => {
//     // if (typeof searchId === 'string' && !stop) {
//     // eslint-disable-next-line no-inner-declarations
//     async function searchArticles() {
//       fetch('https://api.realworld.io/api/articles?limit=10&offset=0')
//         .then((res) => {
//           if (res.status === 500) {
//             searchArticles();
//             throw Error('Упс, статус запроса 500, похоже на какую-то ошибку');
//           } else {
//             return res.json();
//           }
//         })
//         .then((res) => {
//           dispatch({ type: ALL_ARTICLES, data: res });
//           //   searchArticles();
//         })
//         .catch((e) => {
//           console.log(e, 'Ошибка');
//         });
//     }
//     searchArticles();
//   };
// }
// // }
