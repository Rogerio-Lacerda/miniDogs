import React from 'react';
import style from './Photos.module.css';
import { showPhotos } from '../store/photos';
import { useDispatch, useSelector } from 'react-redux';

const Photos = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.photos);
  const [somar, setSomar] = React.useState(3);

  React.useEffect(() => {
    const fetchData = async () => {
      await dispatch(showPhotos());
    };
    fetchData();
    setSomar(3);
  }, [dispatch]);

  const handleClick = async () => {
    setSomar((state) => state + 3);
    await dispatch(showPhotos(somar + 3));
  };

  return (
    <>
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
          {loading ? <p>Carregando...</p> : null}
          {data ? (
            somar > data.length && loading === false ? (
              <p className={style.postagens}>Não exsitem mais postagens</p>
            ) : !loading ? (
              <button className={style.btn} onClick={handleClick}>
                +
              </button>
            ) : null
          ) : null}
        </ul>
      ) : null}
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default Photos;
