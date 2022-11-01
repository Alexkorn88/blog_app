/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/named
import { addSignUpAction } from '../../store/actions';

import styles from './signUp.module.scss';

function SignUp() {
  // eslint-disable-next-line no-unused-vars
  const signUpData = useSelector((state) => state.signUp.user);
  // console.log(signUpData);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({ mode: 'all' });

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(addSignUpAction(data));
    reset();
  };

  const password = watch('password');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create new account</h3>
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
            })}
            placeholder="Password"
          />
          <div className={styles.errorValid}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <p className={styles.labelP}>Repeat Password</p>
          <input
            className={errors?.repeatPassword && styles.errorBorder}
            type="password"
            {...register('repeatPassword', {
              required: 'Поле обязательно для заполнения',
              validate: (value) => value === password || 'Пароль должен совпадать',
            })}
            placeholder="Repeat Password"
          />
          <div className={styles.errorValid}>
            {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'}</p>}
          </div>
        </label>

        <label className={styles.labelCheckbox}>
          <input
            className={`${styles.inputCheckbox} ${styles.visuality_hidden}`}
            type="checkbox"
            {...register('check', {
              required: 'Поставь галку!!!',
            })}
          />
          <span className={styles.checker} />I agree to the processing of my personal information
          <div className={styles.errorValid}>{errors?.check && <p>{errors?.check?.message || 'Error!'}</p>}</div>
        </label>
        <input className={styles.submitBtn} type="submit" disabled={!isValid} value="Create" />
      </form>
      <div className={styles.linkSign}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </div>
    </div>
  );
}
export default SignUp;
