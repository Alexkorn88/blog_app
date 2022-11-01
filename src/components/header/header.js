import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addLogOutAction } from '../../store/actions';

import styles from './header.module.scss';

function Header() {
  const [userData, setUserData] = useState('');
  const signUpData = useSelector((state) => state.signUp.user);
  console.log(signUpData);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(addLogOutAction());
  };

  useEffect(() => {
    setUserData(signUpData);
  }, [signUpData]);

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Link to="/">Realworld Blog</Link>
      </div>
      {!userData?.token ? (
        <div className={styles.loginContainer}>
          <button className={styles.btn} type="button">
            <Link to="/sign-in">Sign In</Link>
          </button>
          <button className={styles.btn} type="button">
            <Link to="/sign-up">Sign Up</Link>
          </button>
        </div>
      ) : (
        <div className={styles.profileContainer}>
          <button className={styles.btnCreate} type="button">
            <Link to="/">Create article</Link>
          </button>
          <div className={styles.userName}>{userData?.username}</div>
          <div className={styles.articleAvatar}>
            <img
              src={userData?.image ? userData?.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt="avalogo"
            />
          </div>
          <button className={styles.btn} type="button">
            <Link to="/" onClick={logOut}>
              Log Out
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
export default Header;
