import imageEdit from '../../images/Vector.svg'
import imageAdd from '../../images/add_icon.svg'
import React, { useState, useEffect } from 'react'
import api from '../../utils/Api';
import Card from '../Card/Card';

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onDelete }) {
  const [userName, setUserName] = useState(" ");
  const [userDescription, setUserDescription] = useState(" ");
  const [userAvatar, setUserAvatar] = useState(" ");
  const [card, setCard] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCard()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserDescription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        dataCard.forEach(card => card.myid = dataUser._id)
        setCard(dataCard)
      })
      .catch((error) => console.error(`Ошибка при начальных данный страницы ${error}`));
  },[]);
  
  

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__list">
          <button
            type="button"
            aria-label="Изменить"
            className="profile__avatar-button"
            onClick={onEditAvatar}
          />
          <img className="profile__avatar" src={userAvatar} alt="обложка" />
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__title"> {userName}</h1>
              <button
                type="button"
                aria-label="Редактировать"
                className="profile__edit-button"
                onClick={onEditProfile}
              >
                <img
                  src={imageEdit}

                  className="profile__edit-button-img"
                  alt="знак редактирования"
                />
              </button>
            </div>
            <p className="profile__subtitle" >{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img
            src={imageAdd}
            className="profile__add-button-img"
            alt="знак добавить"
          />
        </button>
      </section>
      <section className="elements">
        <div className="elements__list-template">
        {card.map(data => {
          return (
            <div className="elements-template" key={data._id} >
          <Card 
          card = {data} 
          onCardClick={onCardClick}
          onDelete={onDelete}
          />
          </div>
          )
        })}
        </div>
      </section>
    </main>
  )
}