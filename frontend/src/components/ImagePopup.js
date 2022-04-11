function ImagePopup(props) {
  return (
    <div className={`popup popup_enlager ${props.card ? "popup_active" : ""}`}>
      <div className="popup__image-box">
        <img
          className="popup__image"
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
        />
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__quit-button popup__close-enlager"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__caption">{props.card && props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
