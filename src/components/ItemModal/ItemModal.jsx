import './ItemModal.css';

import closeIcon from '../../assets/modal__close.svg';


export default function ItemModal({name, imageUrl, onClose, weatherType}) {

    return (
        <div className="modal" onClick={onClose}>
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
            </div>
        </div>
    )
}