import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.owner === currentUser._id;
  const cardDeleteButtonClassName = `place__delete ${
    isOwn ? "place__delete_visible" : "place__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some((user) => user === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked ? "place__like_active" : ""
  }`;

  function handleCLick() {
    props.onCardClick(props.card);
  }

  function handleLikeCLick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCLick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place__box">
      <img
        className="place__photo"
        src={props.link}
        alt={props.name}
        onClick={handleCLick}
      />
      <div className="place__info">
        <h2 className="place__title">{props.name}</h2>
        <div className="place__likebox">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeCLick}
          ></button>
          <span className="place__count-like">{props.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteCLick}
        aria-label="Удалить"
      ></button>
    </li>
  );
}

export default Card;
