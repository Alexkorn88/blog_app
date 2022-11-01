import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { Link } from 'react-router-dom';

import { addGoPageAction, addArticlesAction } from '../../store/actions';

import 'antd/dist/antd.min.css';
import styles from './footer.module.scss';

function Footer() {
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const pageCount = useSelector((state) => state.goPage.page);
  const dispatch = useDispatch();

  const handlePageClick = (value) => {
    dispatch(addGoPageAction(value));
    dispatch(addArticlesAction(value));
  };

  const paginList = () =>
    articlesCount ? (
      <Link to={`/?page=${pageCount}`}>
        <Pagination
          className={styles.pagination}
          centered
          showSizeChanger={false}
          total={(articlesCount / 5) * 10}
          onChange={handlePageClick}
          current={pageCount}
        />
      </Link>
    ) : null;
  return paginList();
}

export default Footer;
