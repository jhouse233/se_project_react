import './ItemModal.css';

import closeIcon from '../../assets/modal__close.svg';


export default function ItemModal({name, imageUrl, onClose, weatherType, isOpen, onDelete}) {

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
                <button className="modal__delete-button" type="button" onClick={onDelete}>Delete Item</button>
            </div>
        </div>
    )
}