import React, { useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './LoginModal.css';
import { useForm } from '../../hooks/useForm';

function LoginModal({ isOpen, onClose, onSubmit, navigateToRegister, isLoadingText }){

    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const isFormValid = values.email && values.password;
        setIsButtonDisabled(!isFormValid)
    }, [values]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    }

    return(
        <ModalWithForm
            title='Log in'
            buttonText='Log in'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            showDefaultButton={false}
        >
            <label className="modal__label" htmlFor='email' >
                Email
                <input 
                    type="email" 
                    name='email'
                    className="modal__input" 
                    placeholder='Email'
                    required
                    value={values.email}
                    onChange={handleChange}
                    id='email'
                />
            </label>
            <label className="modal__label" htmlFor='password'>
                Password
                <input 
                    type="password" 
                    name='password'
                    className="modal__input"
                    placeholder='Password'
                    required
                    value={values.password}
                    onChange={handleChange}
                    id='password'
                />
            </label>
            <div className="login-modal__button-container">
                <button
                    type='submit'
                    className={`login-modal__link ${isButtonDisabled ? "login-modal__link_disabled" : ''}`}
                    disabled={isButtonDisabled}
                >
                    {isLoadingText}
                </button>
                <button
                    type='button'
                    className='login-modal__register-link'
                    to='register'
                    onClick={navigateToRegister}
                >
                    or Register
                </button>
            </div>
        </ModalWithForm>
    )
}

export default LoginModal;