import React from 'react';
import { ColorRing } from 'react-loader-spinner';

import styles from './spinner.module.scss';

function Spinner() {
  return (
    <div className={styles.spinner}>
      <ColorRing
        visible
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#2196F3', '#2196F3', '#2196F3', '#2196F3', '#2196F3']}
      />
    </div>
  );
}
export default Spinner;
