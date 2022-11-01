// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { addArticlesAction } from '../../store/actions';
import ContentList from '../contentList';
import Header from '../header';
import SinglePage from '../singlePage';
import SignIn from '../signIn';
import SignUp from '../signUp';
import ProfileEdit from '../profileEdit';
import Spinner from '../spinner';

import styles from './app.module.scss';

function App() {
  const articlesItems = useSelector((state) => state.articles.articles);
  console.log(articlesItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addArticlesAction());
  }, []);

  const artList = () => (!articlesItems ? <Spinner /> : <ContentList />);

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="*" element={artList()} />
        {/* <Route path="/*" element={artList()} /> */}
        <Route path="/articles/*" element={artList()} />
        <Route path="/articles/:artSlug" element={<SinglePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<ProfileEdit />} />
      </Routes>
    </div>
  );
}
export default App;
