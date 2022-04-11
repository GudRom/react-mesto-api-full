function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div className="popup__content">
        <button
          type="button"
          aria-label="Закрыть"
          className={`popup__quit-button popup__close-${props.name}`}
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button className="popup__save-button" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
