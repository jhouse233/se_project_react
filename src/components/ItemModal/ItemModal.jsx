import './ItemModal.css';

import closeIcon from '../../assets/modal__close.svg';
import { useContext } from 'react';
import { UserContext } from '../../contexts/CurrentUserContext';


export default function ItemModal({name, imageUrl, onClose, weatherType, isOpen, onDelete, owner}) {
    const { currentUser } = useContext(UserContext)

    const isOwn = owner === currentUser?._id;

    const itemDeleteButtonClassName = (
        `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
      );

    return (
        <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <button className="modal__close-container" type="button" onClick={onClose}>
                    <img src={closeIcon} alt="modal-close" className="modal__close-button-image" />
                </button>
                <img src={imageUrl} alt={name} className="modal__image" />
                <p className="modal__name">{name}</p>
                {/* <div className="modal__name">{name}</div> */}
                <div className="modal__weather">
                    Weather: {weatherType}
                </div>
                {isOwn ? (
                    <button
                        className={itemDeleteButtonClassName} 
                        type="button" 
                        onClick={onDelete}
                     >
                        Delete Item
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}