/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { HeartTwoTone } from '@ant-design/icons';

import { format } from 'date-fns';

import { addArticlesAction, addLikeArticleAction, addDislikeArticleAction } from '../../store/actions';

import styles from './contentCard.module.scss';

function ContentCard({ itemProps }) {
  const signUpData = useSelector((state) => state.signUp);
  const pageCount = useSelector((state) => state.goPage.page);

  const { title, description, createdAt, author, tagList, favoritesCount, slug, favorited } = itemProps;
  const tags = () =>
    tagList.map((item, index) => {
      const indexItem = index + item;

      return (
        <button type="button" key={indexItem} className={styles.contentTagBtn}>
          {item}
        </button>
      );
    });

  const artDate = format(new Date(createdAt), 'MMMM dd, yyyy');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleLike = () => {
    if (!signUpData.isLogin) {
      navigate('/sign-in');
    } else {
      if (favorited === false) {
        dispatch(addLikeArticleAction(signUpData.token, slug));
        dispatch(addArticlesAction(pageCount, signUpData.token));
      }
      if (favorited === true) {
        dispatch(addDislikeArticleAction(signUpData.token, slug));
        dispatch(addArticlesAction(pageCount, signUpData.token));
      }
    }
  };

  return (
    <div className={styles.contentCard}>
      <div className={styles.contentHeader}>
        <div className={styles.contentLeft}>
          <div className={styles.contentTitleLikes}>
            <div className={styles.contentTitle}>
              <Link to={`/articles/${slug}`}>{title}</Link>
            </div>
            <div className={styles.contentLikes} onClick={toggleLike} onKeyDown={toggleLike}>
              <HeartTwoTone
                twoToneColor={signUpData.isLogin && favorited && '#ff0000'}
                className={signUpData.isLogin && favorited && styles.activeLikes}
              />
              {favoritesCount}
            </div>
          </div>
          <div className={styles.contentTags}>{tags()}</div>
        </div>
        <div className={styles.contentRight}>
          <div className={styles.contentInfo}>
            <div className={styles.contentName}>{author.username}</div>
            <div className={styles.contentDate}>{artDate}</div>
          </div>
          <div className={styles.contentAvatar}>
            <img src={author.image} alt="avalogo" />
          </div>
        </div>
      </div>
      <div className={styles.contentOverview}>{description}</div>
    </div>
  );
}

export default ContentCard;
