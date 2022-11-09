/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/named
import { addNewArticleAction, addArticlesAction } from '../../store/actions';

import styles from './newArticle.module.scss';

function NewArticle() {
  const [arrTags, setArrTags] = useState([]);
  const [value, setValue] = useState('');

  const [token, setToken] = useState('');

  const signUpData = useSelector((state) => state.signUp);

  useEffect(() => {
    setToken(signUpData?.token);
    // console.log(signUpData);
  }, []);

  const addTag = () => {
    setArrTags([...arrTags, value]);
    setValue('');
  };

  const removeTag = (i) => {
    setArrTags([...arrTags.slice(0, i), ...arrTags.slice(i + 1)]);
  };
  const resultTags = arrTags.map((element, index) => (
    <div className={styles.OneTag} key={element + Math.random()}>
      <div className={styles.tagElement}>{element}</div>
      <button className={styles.btnDelTag} type="button" onClick={() => removeTag(index)}>
        Delete
      </button>
    </div>
  ));

  // const signUpData = useSelector((state) => state.signUp.user);
  // console.log(signUpData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'all' });

  const onSubmit = (data) => {
    // console.log(data);
    // data = { ...data, tagList: arrTags };
    dispatch(addNewArticleAction({ ...data, tagList: arrTags }, token));
    reset();
    navigate('/', { replace: true });

    dispatch(addArticlesAction());
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create new article</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <p className={styles.labelP}>Title</p>
          <input
            className={errors?.title && styles.errorBorder}
            {...register('title', {
              required: 'Поле обязательно для заполнения',
            })}
            placeholder="Title"
          />
          <div className={styles.errorValid}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>

        <label className={styles.label}>
          <p className={styles.labelP}>Short description</p>
          <input
            className={errors?.description && styles.errorBorder}
            {...register('description', {
              required: 'Поле обязательно для заполнения',
            })}
            placeholder="Title"
          />
          <div className={styles.errorValid}>
            {errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}
          </div>
        </label>

        <label className={styles.label}>
          <p className={styles.labelP}>Text</p>
          <textarea
            rows={6}
            className={errors?.body && styles.errorBorder}
            {...register('body', {
              required: 'Поле обязательно для заполнения',
            })}
            placeholder="Text"
          />
          <div className={styles.errorValid}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
        </label>
        <div className={styles.tags}>
          <p className={styles.labelPTags}>Tags</p>
          {resultTags}
          <div className={styles.labelInputBlock}>
            <label className={styles.labelTags}>
              <input
                value={value}
                className={styles.labelTagsInput}
                {...register('tagList')}
                placeholder="Tag"
                onChange={(e) => setValue(e.target.value)}
              />
            </label>
            <button className={styles.btnDel} type="button" onClick={() => setValue('')}>
              Delete
            </button>
            <button className={styles.btnAdd} type="button" onClick={addTag}>
              Add tag
            </button>
          </div>
        </div>

        <input className={styles.submitBtn} type="submit" disabled={!isValid} value="Send" />
      </form>
    </div>
  );
}
export default NewArticle;
