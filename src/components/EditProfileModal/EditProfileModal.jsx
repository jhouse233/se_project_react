import { useState, useEffect, useContext } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './EditProfileModal.css'
import { UserContext } from '../../contexts/CurrentUserContext';

export const EditProfileModal = ({ onClose, isOpen, handleEditUser }) => {
    const { currentUser } = useContext(UserContext);
    const [values, setValues] = useState({
        name: currentUser?.name || '',
        avatar: currentUser?.avatar || '',
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setValues({
                name: currentUser?.name ||'',
                avatar: currentUser?.avatar || '',
            });
        }
    }, [isOpen, currentUser]);

    useEffect(() => {
        const isFormValid = values.name || values.avatar;
        setIsButtonDisabled(!isFormValid)
    }, [values]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditUser(values);
    }

    return (
        <ModalWithForm
            title='Change profile data'
            onClose={onClose}
            onSubmit={handleSubmit}
            isOpen={isOpen}
            showDefaultButton={false}
        >
            <label htmlFor="name" className="modal__label">
                Name*{' '}
                <input 
                    type="text" 
                    className="modal__input" 
                    id='name'
                    required
                    placeholder='Name'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="avatar" className="modal__label">
                Avatar*{' '}
                <input 
                    type="text" 
                    className="modal__input"
                    id='avatar'
                    required
                    placeholder='Avatar URL'
                    name='avatar'
                    value={values.avatar}
                    onChange={handleChange}
                />
            </label>
            <button
                type='submit'
                className={`modal__edit-submit ${isButtonDisabled ? 'modal__edit-submit_disabled' : ''}`}
                disabled={isButtonDisabled}
            >
                Save changes
            </button>
            
        </ModalWithForm>
    )
}

export default EditProfileModal;