import React from 'react'
export default function Card({ card, onCardClick }) {

    function handleCardClick() {
        onCardClick(card);
        // onCardClick({link:card.link, name:card.name});
    }

    return (
        <article className="element">
            <img className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick} 
                />
            <button className="element__delete" aria-label="Значок удаления"></button>
            <div className="element__list">
                <h2 className="element__title">{card.name}</h2>
                <button
                    type="button"
                    className="element__like-button"
                    aria-label="Значок лайк"
                ></button>
            </div>
        </article>
    )
}


// export default function Card({ card, onCardClick }) {

//     return (
//         <article className="element">
//             <img className="element__image" src={card.link} alt={card.name} onClick={() => onCardClick({link: card.link, name: card.name})} />
//             <button className="element__delete" aria-label="Значок удаления"></button>
//             <div className="element__list">
//                 <h2 className="element__title">{card.name}</h2>
//                 <button
//                     type="button"
//                     className="element__like-button"
//                     aria-label="Значок лайк"
//                 ></button>
//             </div>
//         </article>
//     )
// }