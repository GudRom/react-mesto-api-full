import editAvatar from "../images/Edit-Avatar.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="wanderer">
        <div className="wanderer__author">
          <div className="wanderer__avatar-box">
            <div className="wanderer__overlay" onClick={props.onEditAvatar}>
              <img
                className="wanderer__edit-avatar"
                src={editAvatar}
                alt="Редактировать аватар"
              />
            </div>
            <div
              className="wanderer__avatar"
              alt="аватар"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
          </div>
          <div className="wanderer__info">
            <div className="wanderer__title">
              <h1 className="wanderer__name">{currentUser.name}</h1>
              <button
                type="button"
                aria-label="Изменить"
                className="wanderer__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="wanderer__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="wanderer__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="place">
        <ul className="place__boxes">
          {props.cards.map((item) => (
            <Card
              key={item._id}
              {...item}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
