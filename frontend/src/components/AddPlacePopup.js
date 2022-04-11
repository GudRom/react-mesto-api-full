import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleTitleChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое&nbsp;место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__form-text"
        type="text"
        name="name"
        id="input-title"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        value={name || ""}
        onChange={handleTitleChange}
      />
      <span className="popup__input-error" id="input-title-error"></span>
      <input
        className="popup__form-text"
        type="url"
        name="link"
        id="input-url"
        required
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error" id="input-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
