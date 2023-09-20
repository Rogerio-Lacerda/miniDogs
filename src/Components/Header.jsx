import React from 'react';
import style from './Header.module.css';
import { useSelector } from 'react-redux';

const Header = () => {
  const { data, loading, error } = useSelector((state) => state.login.user);
  return (
    <header className={style.header}>
      <h1>Mini Dogs {}</h1>
      {data?.email ? <span>{data?.email}</span> : null}
      <button className={data?.email ? style.logado : null}></button>
    </header>
  );
};

export default Header;
