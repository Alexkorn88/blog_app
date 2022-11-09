/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/named
import { addEditArticleAction, addArticlesAction } from '../../store/actions';

import styles from './editArticle.module.scss';

function EditArticle() {
  const [arrTags, setArrTags] = useState([]);
  const [valueTag, setValueTag] = useState('');

  const [token, setToken] = useState('');
  const [itemsProps, setItems] = useState({});

  const signUpData = useSelector((state) => state.signUp);
  const artItem = useSelector((state) => state.newArticle);
  // console.log(itemsProps);

  const addTag = () => {
    setArrTags([...arrTags, valueTag]);
    setValueTag('');
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
    setValue,
  } = useForm({ mode: 'all' });

  const onSubmit = (data) => {
    // console.log(data);
    // data = { ...data, tagList: arrTags };
    dispatch(addEditArticleAction({ ...data, tagList: arrTags }, token, itemsProps.slug));
    reset();
    navigate('/', { replace: true });

    dispatch(addArticlesAction());
  };

  useEffect(() => {
    setToken(signUpData?.token);
    setItems(artItem);
    setArrTags(artItem.tagList);
    setValue('title', artItem.title);
    setValue('description', artItem.description);
    setValue('body', artItem.body);
    // console.log(signUpData);
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit article</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <p className={styles.labelP}>Title</p>
          <input
            className={errors?.title && styles.errorBorder}
            {...register('title')}
            placeholder="Title"
            // defaultValue={itemsProps.title}
          />
          <div className={styles.errorValid}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>

        <label className={styles.label}>
          <p className={styles.labelP}>Short description</p>
          <input
            className={errors?.description && styles.errorBorder}
            {...register('description')}
            placeholder="Title"
            // defaultValue={itemsProps.description}
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
            {...register('body')}
            placeholder="Text"
            // defaultValue={itemsProps.body}
          />
          <div className={styles.errorValid}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
        </label>
        <div className={styles.tags}>
          <p className={styles.labelPTags}>Tags</p>
          {resultTags}
          <div className={styles.labelInputBlock}>
            <label className={styles.labelTags}>
              <input
                value={valueTag}
                className={styles.labelTagsInput}
                {...register('tagList')}
                placeholder="Tag"
                onChange={(e) => setValueTag(e.target.value)}
              />
            </label>
            <button className={styles.btnDel} type="button" onClick={() => setValueTag('')}>
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
export default EditArticle;
