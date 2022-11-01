import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

import styles from './singlePage.module.scss';

function SinglePage() {
  const { artSlug } = useParams(null);

  const [itemsProps, setItems] = useState({});
  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${artSlug}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.article);
      })
      .catch((e) => console.log(e));
  }, []);

  const tags = () =>
    itemsProps.tagList?.map((item) => (
      <button type="button" key={item + Math.random() * 10} className={styles.articleTagBtn}>
        {item}
      </button>
    ));

  const artDate = () => format(new Date(itemsProps.createdAt), 'MMMM dd, yyyy');
  return (
    <div className={styles.articleCard}>
      <div className={styles.articleHeader}>
        <div className={styles.articleLeft}>
          <div className={styles.articleTitleLikes}>
            <div className={styles.articleTitle}>{itemsProps.title}</div>
            <div className={styles.articleLikes}>
              <HeartOutlined />
              {itemsProps.favoritesCount}
            </div>
          </div>
          <div className={styles.articleTags}>{tags()}</div>
        </div>
        <div className={styles.articleRight}>
          <div className={styles.articleInfo}>
            <div className={styles.articleName}>{itemsProps.author?.username}</div>
            {itemsProps.createdAt !== undefined ? <div className={styles.articleDate}>{artDate()}</div> : null}
          </div>
          <div className={styles.articleAvatar}>
            <img src={itemsProps.author?.image} alt="avalogo" />
          </div>
        </div>
      </div>

      <div className={styles.articleOverview}>{itemsProps.description}</div>
      <div className={styles.articleBody}>
        <ReactMarkdown>{itemsProps.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default SinglePage;
