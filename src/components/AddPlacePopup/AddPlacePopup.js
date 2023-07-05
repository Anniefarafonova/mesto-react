import PopupWithForm from "../PopupWithForm/PopupWithForm"
import { useState, useEffect } from "react";

export default function AddPlacePopup(isOpen, onClose, onAddPlace){
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

 
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            title: title,
            link: link,
        });
    }

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    return(
        <PopupWithForm
          name='add'
          title='Новое место'
          button='Создать'
          isOpen={isOpen}
          onClose={onClose}
          onClick={handleSubmit}
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
              onChange={handleChangeTitle}
            />
            <span id="title-error" className="error" />
            <input
              id="link"
              type="url"
              placeholder="Ссылка на картинку"
              name="link"
              className="form__item form__item_type_job"
              required=""
              onChange={handleChangeLink}
            />
            <span id="link-error" className="error" />
          </div>
        </PopupWithForm>
    )
}