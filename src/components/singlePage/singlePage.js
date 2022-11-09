/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HeartTwoTone } from '@ant-design/icons';
import { format } from 'date-fns';

import { addArticlesAction, articleAction, addLikeArticleAction, addDislikeArticleAction } from '../../store/actions';
import Modal from '../modal';
import imgWarn from '../img/warn.svg';

import styles from './singlePage.module.scss';
import './style.scss';

function SinglePage() {
  const { artSlug } = useParams(null);

  const [itemsProps, setItems] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const signUpData = useSelector((state) => state.signUp);
  const articleData = useSelector((state) => state.newArticle);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blog.kata.academy/api/articles/${artSlug}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.article);
      })
      .catch((e) => console.log(e));

    dispatch(articleAction(artSlug, signUpData.token));
  }, [articleData.favorited]);

  const tags = () =>
    itemsProps.tagList?.map((item) => (
      <button type="button" key={item + Math.random() * 10} className={styles.articleTagBtn}>
        {item}
      </button>
    ));

  const artDate = () => format(new Date(itemsProps.createdAt), 'MMMM dd, yyyy');

  const deleteArticle = () => {
    fetch(`https://blog.kata.academy/api/articles/${artSlug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${signUpData.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Упс, что-то пошло не так, проверьте данные ввода');
        }
      })
      .catch((e) => console.log(e));

    navigate('/', { replace: true });
    dispatch(addArticlesAction());
  };

  const toggleLike = () => {
    if (!signUpData.isLogin) {
      navigate('/sign-in');
    } else {
      if (articleData.favorited === false) {
        dispatch(addLikeArticleAction(signUpData.token, artSlug));
      }
      if (articleData.favorited === true) {
        dispatch(addDislikeArticleAction(signUpData.token, artSlug));
      }
    }
  };
  return (
    <div className={styles.articleCard}>
      <div className={styles.articleHeader}>
        <div className={styles.articleLeft}>
          <div className={styles.articleTitleLikes}>
            <div className={styles.articleTitle}>{itemsProps?.title}</div>
            <div className={styles.articleLikes} onClick={toggleLike} onKeyDown={toggleLike}>
              <HeartTwoTone
                twoToneColor={signUpData.isLogin && articleData.favorited && '#ff0000'}
                className={signUpData.isLogin && articleData.favorited && styles.activeLikes}
              />
              {itemsProps?.favoritesCount}
            </div>
          </div>
          <div className={styles.articleTags}>{tags()}</div>
        </div>
        <div className={styles.articleRight}>
          <div className={styles.articleRightFlex}>
            <div className={styles.articleInfo}>
              <div className={styles.articleName}>{itemsProps?.author?.username}</div>
              {itemsProps?.createdAt !== undefined ? <div className={styles.articleDate}>{artDate()}</div> : null}
            </div>
            <div className={styles.articleAvatar}>
              <img src={itemsProps?.author?.image} alt="avalogo" />
            </div>
          </div>
          {signUpData.isLogin && (
            <>
              <div className={styles.btnBlock}>
                <button className={styles.btnDel} type="button" onClick={() => setModalActive(true)}>
                  Delete
                </button>
                <button className={styles.btnEdit} type="button">
                  <Link to={`/articles/${artSlug}/edit`}>Edit</Link>
                </button>
              </div>
              <Modal active={modalActive} setActive={setModalActive}>
                <div className={styles.modalContainer}>
                  <div className={styles.modalInfo}>
                    <img src={imgWarn} alt="img" />
                    <p>Are you sure to delete this article?</p>
                  </div>
                  <div className={styles.modalBtnBlock}>
                    <button className={styles.modalBtn} type="button" onClick={() => setModalActive(false)}>
                      No
                    </button>
                    <button className={styles.modalBtn} type="button" onClick={deleteArticle}>
                      Yes
                    </button>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
      <div className={styles.articleOverview}>{itemsProps?.description}</div>

      <div className={styles.articleBody}>
        <ReactMarkdown>{itemsProps?.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default SinglePage;
