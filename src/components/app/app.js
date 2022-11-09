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
import NewArticle from '../newArticle';
import EditArticle from '../editArticle';
import NotFound from '../notFound';
import RequaireAuth from '../../hoc/requaireAuth';

import styles from './app.module.scss';

function App() {
  const articlesItems = useSelector((state) => state.articles.articles);
  const signUpData = useSelector((state) => state.signUp);
  const pageCount = useSelector((state) => state.goPage.page);
  const articleData = useSelector((state) => state.newArticle);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addArticlesAction(pageCount, signUpData.token));
  }, [articleData.favorited]);

  const artList = () => (!articlesItems ? <Spinner /> : <ContentList />);

  return (
    <div className={styles.container}>
      <Header />
      <Routes>
        <Route path="/" element={artList()} />
        <Route path="*" element={<NotFound />} />
        <Route path="/articles/*" element={artList()} />
        <Route path="/articles/:artSlug" element={<SinglePage />} />
        <Route
          path="/articles/:artSlug/edit"
          element={
            <RequaireAuth>
              <EditArticle />
            </RequaireAuth>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <RequaireAuth>
              <ProfileEdit />
            </RequaireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequaireAuth>
              <NewArticle />
            </RequaireAuth>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
