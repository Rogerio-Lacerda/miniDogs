import React from 'react';
import style from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/login';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [forms, setForms] = React.useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, id } = target;
    setForms({ ...forms, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const usuario = { username: forms.username, password: forms.password };
    const payload = await dispatch(login(usuario));
    if (payload?.payload) {
      navigate('/minidogs');
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          value={forms['username']}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          value={forms['password']}
          onChange={handleChange}
        />
      </div>
      {user.loading || token.loading ? (
        <button disabled className={style.load}>
          Entrando...
        </button>
      ) : (
        <button>Entrar</button>
      )}
      {user.error ? (
        <p className={style.error}>{user.error}</p>
      ) : token.error ? (
        <p className={style.error}>{token.error}</p>
      ) : null}
    </form>
  );
};

export default Login;
