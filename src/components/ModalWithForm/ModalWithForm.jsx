import './ModalWithForm.css';
import closeButton from '../../assets/modal__close.svg';

function ModalWithForm({ children, title, name, onClose, isOpen }) {
    console.log('Modal isOpen state:', isOpen)
    return (

        <div className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}>
            <div className="modal__content">
                <button
                    type="button"
                    onClick={onClose}
                    className="modal__close">
                    <img src={closeButton} alt="close button" />
                </button>
                <h3 className="modal__title">{title}</h3>
                {children}
            </div>
        </div>
    );
}

export default ModalWithForm;