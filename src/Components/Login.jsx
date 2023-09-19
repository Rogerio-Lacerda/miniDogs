import React from 'react';
import style from './Login.module.css';

const Login = () => {
  return (
    <form className={style.form}>
      <div>
        <label>Usuario</label>
        <input type="text" />
      </div>
      <div>
        <label>Senha</label>
        <input type="password" />
      </div>
      <button>Entrar</button>
    </form>
  );
};

export default Login;
