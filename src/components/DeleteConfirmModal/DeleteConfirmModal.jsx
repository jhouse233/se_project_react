import React from 'react'


import './DeleteConfirmModal.css';
import closeButton from '../../assets/modal__close.svg'

function DeleteConfirmModal({ isOpen, onClose, onConfirm, name }) {
    return (
        <div className={`delete ${isOpen ? "delete_opened" : ""}`}>
            <div className="delete__content">
                <button className="delete__close" type="button" onClick={onClose}>
                    <img src={closeButton} alt="close modal" />
                </button>
                <div className="delete__message">
                    <p>Are you sure you want to delete {name}?</p>
                    <p>This action is irreversible.</p>
                </div>
                <div className="delete__buttons">
                    <button className="delete__button delete__button_confirm" onClick={onConfirm}>
                        Yes, delete item
                    </button>
                    <button className="delete__button delete__button_cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal;