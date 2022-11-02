/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/named
import { addProfileEditAction } from '../../store/actions';

import styles from './profileEdit.module.scss';

function ProfileEdit() {
  const signUpData = useSelector((state) => state.signUp);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(signUpData?.token);
    // console.log(signUpData);
  }, []);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    // watch,
  } = useForm({ mode: 'all' });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(addProfileEditAction(data, token));
    reset();
    navigate('/', { replace: true });
  };

  // const password = watch('password');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Edit Profile</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          <p className={styles.labelP}>Username</p>
          <input
            className={errors?.username && styles.errorBorder}
            {...register('username', {
              required: 'Поле обязательно для заполнения',
              minLength: { value: 3, message: 'Минимальная длина 3 символа' },
              maxLength: { value: 20, message: 'Максимальная длина 20 символов' },
            })}
            placeholder="Username"
          />
          <div className={styles.errorValid}>{errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}</div>
        </label>

        <label className={styles.label}>
          <p className={styles.labelP}>Email address</p>
          <input
            className={errors?.email && styles.errorBorder}
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Пожалуйста введите валидный Email',
              },
            })}
            placeholder="Email address"
          />
          <div className={styles.errorValid}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        </label>

        <label className={styles.label}>
          <p className={styles.labelP}>Password</p>
          <input
            className={errors?.password && styles.errorBorder}
            type="password"
            {...register('password', {
              required: 'Поле обязательно для заполнения',
              minLength: { value: 6, message: 'Минимальная длина 6 символов' },
              maxLength: { value: 40, message: 'Максимальная длина 40 символов' },
            })}
            placeholder="Password"
          />
          <div className={styles.errorValid}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <p className={styles.labelP}>Avatar image (url)</p>
          <input
            className={errors?.avatarUrl && styles.errorBorder}
            {...register('image', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value:
                  /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i,
                message: 'Пожалуйста введите валидный URL',
              },
            })}
            placeholder="Avatar image"
          />
          <div className={styles.errorValid}>{errors?.image && <p>{errors?.image?.message || 'Error!'}</p>}</div>
        </label>
        <input className={styles.submitBtn} type="submit" disabled={!isValid} value="Save" />
      </form>
    </div>
  );
}
export default ProfileEdit;
