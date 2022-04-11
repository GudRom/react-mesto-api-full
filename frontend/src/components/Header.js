import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {props.loggedIn ? (
        <div className="header__box">
          <p className="header__email">{props.email}</p>
          <button className="header__button" onClick={props.logout}>
            Выйти
          </button>
        </div>
      ) : props.location.pathname === "/sign-in" ? (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      ) : (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;

