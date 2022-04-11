import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avaRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avaRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        ref={avaRef}
        className="popup__form-text"
        type="url"
        name="avatar"
        id="input-url-avatar"
        required
        placeholder="Ссылка на аватар"
      />
      <span className="popup__input-error" id="input-url-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
