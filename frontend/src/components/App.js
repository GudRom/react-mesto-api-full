import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [successReg, setSuccessReg] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [emails, setEmails] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    api
      .getCards()
      .then((card) => setCards(card))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((info) => setCurrentUser(info))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      navigate("/main");
    }
  }, [loggedIn, navigate]);

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      auth.checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmails(res.email);
        }
      });
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardCLick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((user) => user === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и удаляем карточку, создаем копию массива, исключив удаленную карточку
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(formData) {
    auth
      .authorize(formData.email, formData.password)
      .then((data) => {
        localStorage.setItem('jwt', data.jwt);
        setLoggedIn(true);
        navigate("/main");
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(formData) {
    auth
      .register(formData.email, formData.password)
      .then(() => {
        setSuccessReg(true);
        setIsInfoTooltipOpen(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setSuccessReg(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} email={emails} logout={logout} location={location}/>
      <Routes>
        <Route
          path="/main"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardCLick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <Register handleRegistration={handleRegistration} />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                isSuccess={successReg}
                onClose={closeAllPopups}
              />
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <>
              <Login handleLogin={handleLogin} />
              <InfoTooltip
                isOpen={isInfoTooltipOpen}
                isSuccess={successReg}
                onClose={closeAllPopups}
              />
            </>
          }
        />
        <Route
          path="/"
          element={
            loggedIn ? <Navigate to="/main" /> : <Navigate to="/sign-in" />
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
