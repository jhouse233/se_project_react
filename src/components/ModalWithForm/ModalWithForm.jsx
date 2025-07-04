import './ModalWithForm.css';
import closeButton from '../../assets/modal__close.svg';

import addGarment from '../../assets/add_garment_disabled.svg';

function ModalWithForm({ children, title, name, onClose, isOpen, onSubmit, buttonText, showDefaultButton = true }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }


    return (

        <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
            <div className="modal__content">
                <h3 className="modal__title">{title}</h3>
                <button className="modal__close" type="button" onClick={onClose}>
                    <img src={closeButton} alt="close button"/>
                </button>
                <form className="modal__form" onSubmit={handleSubmit}>
                    {children}
                    {showDefaultButton && (
                        <button className="modal__submit" type="submit">
                            {buttonText}
                        </button>
                    )}
                    
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;