import { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

import './RegisterModal.css';

function RegisterModal({ isOpen, onClose, onSubmit, navigateToLogin }){
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
        avatar: ''
    })

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const isFormValid =
            values.email && values.password && values.name && values.avatar;
        setIsButtonDisabled(!isFormValid) 
    }, [values])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    }

    return (
        <ModalWithForm
            title='Sign up'
            buttonText='Next'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            showDefaultButton={false}
        >
            <label className="modal__label">
                Email*
                <input 
                    type="email" 
                    name='email'
                    className="modal__input" 
                    placeholder='Email'
                    required
                    value={values.email}
                    onChange={handleChange}
                />
            </label>
            <label className="modal__label">
                Password*
                <input 
                    type="text" 
                    name='password'
                    className="modal__input"
                    placeholder='Password'
                    required
                    value={values.password}
                    onChange={handleChange}
                />
            </label>
            <label className="modal__label">
                Name
                <input 
                    type="text"
                    name='name'
                    className="modal__input" 
                    placeholder='Name'
                    value={values.name}
                    onChange={handleChange}
                />
            </label>
            <label className="modal__label">
                Avatar
                <input 
                    type="url"
                    name='avatar'
                    className="modal__input" 
                    placeholder='Avatar URL'
                    value={values.avatar}
                    onChange={handleChange}
                />
            </label>
            <div className="register-modal__button-container">
                <button
                    type='submit'
                    className={`register-modal__link ${isButtonDisabled ? "register-modal__link_disabled" : ""}`}
                    disabled={isButtonDisabled}
                >
                    Next
                </button>
                <button 
                    type='button'
                    to='login'
                    className="register-modal__login-link"
                    onClick={navigateToLogin}
                >
                    or Login
                </button>
            </div>
        </ModalWithForm>
    )
}

export default RegisterModal;