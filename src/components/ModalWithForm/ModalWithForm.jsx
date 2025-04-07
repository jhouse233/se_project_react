import './ModalWithForm.css';
import closeButton from '../../assets/modal__close.svg';

import addGarment from '../../assets/add_garment_disabled.svg';

function ModalWithForm({ children, title, name, onClose, isOpen, onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    }
    
    return (

        <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
            <div className="modal__content">
                <h3 className="modal__title">{title}</h3>
                <button className="modal__close" type="button" onClick={onClose}>
                    <img src={closeButton} alt="close button" />
                </button>
                <form className="modal__form" onSubmit={handleSubmit}>
                    {children}
                    <button className="modal__submit" type="submit">
                        <img src={addGarment} alt="" className="modal__submit-icon" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;