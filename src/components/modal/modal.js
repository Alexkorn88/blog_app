import React from 'react';

import './modal.scss';

// eslint-disable-next-line no-unused-vars
function Modal({ active, setActive, children }) {
  return (
    <div className={active ? 'modal active' : 'modal'}>
      <div className="modalContent">{children}</div>
    </div>
  );
}
export default Modal;
