import React from 'react';
import style from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, logoutToken } from '../store/login';
import { useNavigate } from 'react-router-dom';
import { logoutPhotos } from '../store/photos';

const Header = () => {
  const { data, loading, error } = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    dispatch(logoutToken());
    dispatch(logoutPhotos());
    window.localStorage.removeItem('token');
    navigate('/miniDogs');
  };
  return (
    <header className={style.header}>
      <h1>Mini Dogs {}</h1>
      {data?.email ? <span>{data?.email}</span> : null}
      {loading || token.loading ? (
        <button className={style.logando} onClick={handleClick}></button>
      ) : data?.email ? (
        <button className={style.logado} onClick={handleClick}></button>
      ) : (
        <button></button>
      )}
    </header>
  );
};

export default Header;
