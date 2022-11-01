import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

// import Article from '../article/article';
import ContentCard from '../contentCard/contentCard';
import Footer from '../footer/footer';

import styles from './contentList.module.scss';

function ContentList() {
  const articlesItems = useSelector((state) => state.articles.articles);
  // console.log(articlesItems);
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
      {/* <Route path="/:artSlug" element={<Article />} /> */}
    </Routes>
  );
}

export default ContentList;
