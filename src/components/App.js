
import React, { useEffect, useState } from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContextt/CurrentUserContext.js';
import api from '../utils/Api.js';

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


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteClick() {
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
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => console.error(`Ошибка like ${error}`));
  }
//Функция удаления
  function handleCardDelete(card) {
  const isOwn = card.owner._id === currentUser._id;
    
   api
   .changeCardStatus(card._id)
   .then(() => {
        setCard((state) => state.filter((c) => c._id === card._id ));
    })
    .catch((error) => console.error(`Ошибка delete ${error}`));
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
          onCardDelete={handleCardDelete}
          card={card}
     
        />

        <Footer />

        <PopupWithForm
          name='edit'
          title='Редактировать профиль'
          isOpen={isEditProfilePopupOpen}
          onClose={closeButtonByClickOnOverlay}
        >
          <div className="form__container-texts">
            <input
              id="name"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={40}
              name="firstname"
              className="form__item form__item_type_name"
              required=""
            />
            <span id="name-error" className="error" />
            <input
              id="text"
              type="text"
              placeholder="О себе"
              minLength={2}
              maxLength={200}
              name="description"
              className="form__item form__item_type_job"
              required=""
            />
            <span id="text-error" className="error" />
          </div>
        </PopupWithForm>

        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          button='Да'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeButtonByClickOnOverlay}
        >
          <div className="form__container-texts">
            <input
              id="avatar"
              type="url"
              placeholder="Ссылка на картинку аватара"
              name="avatar"
              className="form__item form__item_type_job"
              required=""
            />
            <span id="avatar-error" className="error" />
          </div>
        </PopupWithForm>

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