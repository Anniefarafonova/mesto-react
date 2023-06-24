
import React, { useState } from 'react'
import Header from './Header/Header.js'
import Main from './Main/Main.js'
import Footer from './Footer/Footer.js';
import PopupWithForm from './PopupWithForm/PopupWithForm.js';
import ImagePopup from './ImagePopup/ImagePopup.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  function handleDeleteClick() {
    setIsDeletePopupOpen(true)
  }

  const [selectedCard, setSelectedCard] = useState({});
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


  
  return (
    <div className="page">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDelete={handleDeleteClick}
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

      <ImagePopup card = {selectedCard} onClose={closeButtonByClickOnOverlay}/>


    </div>
  );
}

export default App;

// // isOpen={selectedCard}
// {/* card = {selectedCard}
//         isOpen={isImagePopup}
//         onClose={closeAllPopups} */}