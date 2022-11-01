import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
import { HeartOutlined } from '@ant-design/icons';
// import { useSelector } from 'react-redux';

// import avatar from '../img/avatar.svg';

import { format } from 'date-fns';

import styles from './article.module.scss';

function Article({ artSlug }) {
  // const { artSlug } = useParams(null);

  const [itemsProps, setItems] = useState();
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${artSlug}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.article);
      });
  }, []);
  console.log(itemsProps);
  const { title, description, createdAt, author, tagList, favoritesCount, body } = itemsProps;
  const tags = () =>
    tagList.map((item) => (
      <button type="button" key={item} className={styles.articleTagBtn}>
        {item}
      </button>
    ));

  const artDate = format(new Date(createdAt), 'MMMM dd, yyyy');

  return !itemsProps.title ? (
    <div>1</div>
  ) : (
    <div className={styles.articleCard}>
      <div className={styles.articleHeader}>
        <div className={styles.articleLeft}>
          <div className={styles.articleTitleLikes}>
            <div className={styles.articleTitle}>{`${title.slice(0, 30)}...`}</div>
            <div className={styles.articleLikes}>
              <HeartOutlined />
              {favoritesCount}
            </div>
          </div>
          <div className={styles.articleTags}>{tags()}</div>
        </div>
        <div className={styles.articleRight}>
          <div className={styles.articleInfo}>
            <div className={styles.articleName}>{author.username}</div>
            <div className={styles.articleDate}>{artDate}</div>
          </div>
          <div className={styles.articleAvatar}>
            <img src={author.image} alt="avalogo" />
          </div>
        </div>
      </div>

      <div className={styles.articleOverview}>{description}</div>
      <div className={styles.articleBody}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Article;
