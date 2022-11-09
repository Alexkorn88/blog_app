import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

import { addGoPageAction, addArticlesAction } from '../../store/actions';

import 'antd/dist/antd.min.css';
import styles from './footer.module.scss';

function Footer() {
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const pageCount = useSelector((state) => state.goPage.page);
  const signUpData = useSelector((state) => state.signUp);
  const dispatch = useDispatch();

  const handlePageClick = (value) => {
    dispatch(addGoPageAction(value));
    dispatch(addArticlesAction(value, signUpData.token));
  };

  const paginList = () =>
    articlesCount ? (
      <Pagination
        className={styles.pagination}
        centered
        showSizeChanger={false}
        total={(articlesCount / 5) * 10}
        onChange={handlePageClick}
        current={pageCount}
      />
    ) : null;
  return paginList();
}

export default Footer;
