import { useEffect, useState } from 'react';

import { Loader } from 'components/Loader/Loader';

import style from './Modal.module.css';

export const Modal = ({ image, closeModal }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', closeByEsc);
    const closeByEsc = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const onLoad = () => {
    setLoaded(true);
  };
  return (
    <div className={style.backdrop}>
      <div className={style.modal}>
        <img
          src={''}
          alt="movies"
          width={400}
          onLoad={onLoad}
          style={{ display: loaded ? 'block' : 'none' }}
        />
        {!loaded && <Loader />}
        {loaded && <button type="button">Close</button>}
      </div>
    </div>
  );
};
