import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать&nbsp;профиль"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
    >
      <input
        className="popup__form-text"
        type="text"
        name="name"
        id="input-name"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error" id="input-name-error"></span>
      <input
        className="popup__form-text"
        type="text"
        name="about"
        id="input-job"
        required
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error" id="input-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
