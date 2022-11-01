import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import styles from './signIn.module.scss';

function SignIn() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    // watch,
  } = useForm({ mode: 'all' });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  // const password = watch('password');

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Sign In</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <input className={styles.submitBtn} type="submit" disabled={!isValid} value="Login" />
      </form>
      <div className={styles.linkSign}>
        Already have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </div>
  );
}
export default SignIn;
