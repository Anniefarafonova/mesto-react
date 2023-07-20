
import React, { useEffect, useState } from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContextt/CurrentUserContext.js';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import ProtectedRouteElement from './ProtectedRoute/ProtectedRoute.js';
import InfoTooltip from './InfoTooltip/InfoTooltip.js';
import { authorize, register, tokennCheck } from '../utils/Auth.js';
import * as Auth from "../utils/Auth";


function App() {
  const navigate = useNavigate();
  // стейт попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  // стейт контекст
  const [currentUser, setCurrentUser] = useState({});
  // стейт карточки
  const [card, setCard] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  // стейт статусa пользователя  
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  // стейт email
  const [email, setEmail] = React.useState('');

  //функция открытия Edit
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  //функция открытия EditAvatar
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  //функция открытия Add
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  //функция открытия InfoTooltip
  function handleInfoClick() {
    setIsInfoTooltipPopupOpen(true)
  }
  //функция открытия Delete
  function handleDeleteClick(cardId) {
    setDeleteId(cardId)
    setIsDeletePopupOpen(true)
  }
  //функция открытия Card
  function handleCardClick(card) {
    setSelectedCard(card)
  }
   //функция email
   function handleEmail(email) {
    setEmail(email)
  }

  //функция закрытия попапоы
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setIsDeletePopupOpen(false)
    setSelectedCard({})
  }
  //Закрытия попапа нажатием на оверлей
  function closeButtonByClickOnOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }
  //Функция лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => console.error(`Ошибка like ${error}`));
  }

  //Функция удаления
  function handleCardDeleteSubmit(evt) {
    evt.preventDefault()
    api
      .deleteCard(deleteId)
      .then(() => {
        setCard(card.filter((card) => {
          return card._id !== deleteId
        }))
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка delete ${error}`));
  }
  //функция отображения данных Edit(описание)
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка отправка формы с юзер данными (аватар) ${error}`));
  }
  //функция отображения аватарки
  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка отправка формы с юзер данными ${error}`));
  }
  //функция добавления карточки
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((data) => {
        setCard([data, ...card]);
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка отправка добавлении карточки ${error}`));
  }

  //функция регистации
  function onRegister(data) {
    Auth
      .register(data)
      .then((res) => {
        setIsDone(true)
        handleInfoClick()
        navigate('/sign-in', { replace: true });
      })
      .catch((error) => console.error(`Ошибка при регистрации ${error}`))
    setIsDone(false)
    handleInfoClick()
  }
  //функция авторизации
  function onLogin(password, email) {
    Auth
      .authorize(password, email)
      .then((res) => {
        setLoggedIn(true)
        navigate('/', { replace: true });
        setEmail(email)
      })
      // })
      .catch(err => console.log(err));
    setLoggedIn(false)
    setIsDone(false)
    handleInfoClick()

  }

  //проверка токена
  useEffect(() => {
    getTokenCheck();
  }, [])

  const getTokenCheck = (token) => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      Auth
        .tokenCheck(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email)
            // console.log(res);
            console.log(res);
            console.log(email);
            console.log(res.email)

            // setLoggedIn(true);
            // setEmail(res.data.email)
            // setEmail(email);

            navigate("/", { replace: true })
          }
        });
    }
  }

  //функция Api
  useEffect(() => {
    Promise.all([api.getInfo(), api.getCard()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCard(dataCard)
      })
      .catch((error) => console.error(`Ошибка при начальных данный страницы ${error}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />

          <Route path="/sign-up" element={<Register onRegister={onRegister} />} />
          {/* <Route path="/sign-up">
            <Header>
              <Link to="/sign-in" className='login__text'>
                Войти
              </Link> 
            </Header> */}

          {/* <Route path="/ty" element={<Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onDelete={handleDeleteClick}
              onCardLike={handleCardLike}
              card={card}
            />}/> */}

          <Route path="/"
            element={
              <ProtectedRouteElement
                element={(props) => (
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onDelete={handleDeleteClick}
                    onCardLike={handleCardLike}
                    card={card}
                    email={email}
                    {...props}
                  />
                )}
                loggedIn={loggedIn} />
            }
          />





        </Routes>
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeButtonByClickOnOverlay} onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeButtonByClickOnOverlay} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeButtonByClickOnOverlay} onAddPlace={handleAddPlaceSubmit} />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeButtonByClickOnOverlay} isDone={isDone} />

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          button='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeButtonByClickOnOverlay}
          onSubmit={handleCardDeleteSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeButtonByClickOnOverlay} />
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;



{/* <Route path="/" element={<ProtectedRouteElement
  element={<Main
    onEditProfile={handleEditProfileClick}
    onEditAvatar={handleEditAvatarClick}
    onAddPlace={handleAddPlaceClick}
    onCardClick={handleCardClick}
    onDelete={handleDeleteClick}
    onCardLike={handleCardLike}
    card={card}
  />}
  loggedIn={loggedIn} />} /> */}