
import React, { useEffect, useState } from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContextt/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.js';

function App() {
  // стейт попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // стейт контекст
  const [currentUser, setCurrentUser] = useState({});
  // стейт карточки
  const [card, setCard] = useState([]);
  const [deleteId, setDeleteId] = useState('');


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteClick(cardId) {
    setDeleteId(cardId)
    setIsDeletePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
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
  //   function handleCardDelete (card) {
  //   const isOwn = card.owner._id === currentUser._id;
  //    api
  //    .deleteCard(card._id)
  //    .then(() => {
  //         setCard((state) => state.filter((c) => c._id === card._id ));
  //         closeAllPopups()
  //     })
  //     .catch((error) => console.error(`Ошибка delete ${error}`));
  // } 

  function handleCardDeleteSubmit(evt) {
    evt.preventDefault()
    api
      .deleteCard(deleteId)
      .then(() => {
        setCard(card.filter((card) => {
          return card._id !== deleteId
        }))

        // setCard((state) => state.filter((c) => c._id === card._id ));
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка delete ${error}`));
  }
  //функция отображения данных
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
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDelete={handleDeleteClick}
          onCardLike={handleCardLike}
          // onCardDelete={handleCardDelete}
          card={card}

        />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeButtonByClickOnOverlay} onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeButtonByClickOnOverlay} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm
          name='add'
          title='Новое место'
          button='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeButtonByClickOnOverlay}
        >
          <div className="form__container-texts">
            <input
              id="title"
              type="text"
              placeholder="Название"
              minLength={2}
              maxLength={30}
              name="title"
              className="form__item form__item_type_name"
              required=""
            />
            <span id="title-error" className="error" />
            <input
              id="link"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              className="form__item form__item_type_job"
              required=""
            />
            <span id="link-error" className="error" />
          </div>
        </PopupWithForm>

        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          button='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeButtonByClickOnOverlay}
          onSubmit={handleCardDeleteSubmit}
        >

        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeButtonByClickOnOverlay} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

// // isOpen={selectedCard}
// {/* card = {selectedCard}
//         isOpen={isImagePopup}
//         onClose={closeAllPopups} */}