import React from 'react';
import style from './Photos.module.css';
import { showPhotos } from '../store/photos';
import { useDispatch, useSelector } from 'react-redux';

const Photos = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.photos);

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(showPhotos());
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading ? <p>Carregando...</p> : null}
      {error ? <p>{error}</p> : null}
      {data ? (
        <ul className={style.photosContainer}>
          {data.map(({ id, author, title, date, src, acessos }) => {
            return (
              <li key={id} className={style.photo}>
                <div>
                  <img src={src} alt={title} />
                  <p>{title}</p>
                </div>
                <span>{acessos}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default Photos;
