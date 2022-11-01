import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { HeartOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';

// import avatar from '../img/avatar.svg';

import { format } from 'date-fns';

import styles from './contentCard.module.scss';

function ContentCard({ itemProps }) {
  // eslint-disable-next-line no-unused-vars
  const { title, description, createdAt, author, tagList, favoritesCount, slug } = itemProps;
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

  return (
    <div className={styles.contentCard}>
      <div className={styles.contentHeader}>
        <div className={styles.contentLeft}>
          <div className={styles.contentTitleLikes}>
            <div className={styles.contentTitle}>
              <Link to={`/articles/${slug}`}>{title}</Link>
            </div>
            <div className={styles.contentLikes}>
              <HeartOutlined />
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
