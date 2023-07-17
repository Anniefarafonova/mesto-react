import imageLogo from '../../images/logo.svg'
import React, { useState } from 'react'
import Header from '../Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import * as Auth from "../../utils/Auth";
import { authorize } from "../../utils/Auth";

export default function Login({ onLogin }) {
  // const [password, setPassword] = useState(" ");
  // const [email, setEmail] = useState(" ");
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // здесь нужно будет добавить логин
    if (!formValue.password || !formValue.email) {
      return;
    }
    Auth.authorize(formValue.password, formValue.email)
      .then((data) => {
        // if (data.jwt) {
        //   setFormValue({ password: '', email: '' });
          onLogin()
          navigate('/', { replace: true });
        // }
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      {/* <header className="header login">
        <img
          className="header__logo"
          src={imageLogo}
          alt="Логотип" />
        <Link to="/sign-up" className='login__text'>
          Регистрация
        </Link>
      </header> */}
      <main className="content">
        <section className="login">
          <div className="login__container">
            <form className="form form_login" name="form-login" novalidate onSubmit={handleSubmit}>
              <h2 className="form__container-title form__container-title_login">Вход</h2>
              <div className="form__container-texts form__container-texts_login">
                <input id="password" type="password" placeholder="Пароль" name="password"
                  className="form__item form__item_type_name form__item_login-password" required onChange={handleChange} />
                <input id="email" type="email" placeholder="Электронная почта" name="email"
                  className="form__item form__item_type_job form__item_login-email" required onChange={handleChange} />
              </div>
              <button type="submit" aria-label="Войти" className="popup__saved-button popup__saved-button_login">Войти</button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
