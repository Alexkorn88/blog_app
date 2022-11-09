import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { addArticlesAction } from '../../store/actions';
import ContentCard from '../contentCard/contentCard';
import Footer from '../footer/footer';

import styles from './contentList.module.scss';

function ContentList() {
  const articlesItems = useSelector((state) => state.articles.articles);
  const signUpData = useSelector((state) => state.signUp);
  const pageCount = useSelector((state) => state.goPage.page);
  const articleData = useSelector((state) => state.newArticle);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addArticlesAction(pageCount, signUpData.token));
  }, [articleData.favorited]);
  const elements = articlesItems.map((item, index) => {
    const { ...itemProps } = item;
    const indexItem = index + item.title;
    return (
      <div key={indexItem} className={styles.contentList}>
        <ContentCard itemProps={itemProps} />
      </div>
    );
  });

  const articles = () => (
    <>
      {elements}
      <Footer />
    </>
  );
  return (
    <Routes>
      <Route path="/" element={articles()} />
    </Routes>
  );
}

export default ContentList;
