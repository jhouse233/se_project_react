import React from 'react';
import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function AddItemModal({ isOpen, onClose, onSubmit }) {

    // const [newItemName, setNewItemName] = useState("");
    // const[newItemUrl, setNewItemUrl] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        weather: ''    
    })

    // const [newItemWeather, setNewItemWeather] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // const handleNameChange = (e) => {
    //     setNewItemName(e.target.value);
    // };

    // const handleUrlChange = (e) => {
    //     setNewItemUrl(e.target.value);
    // };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit({ name: newItemName, url: newItemUrl});
    //     setNewItemName("");
    //     setNewItemUrl("");
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            name: '',
            imageUrl: '',
            weather: ''
        });
    };

    const handleModalClose = () => {
        onClose();
    };

    return (
        <ModalWithForm
            title="New garment"
            name="add-garment"
            onClose={handleModalClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
        >
            <label className="modal__label">
                Name 
                <input
                    className="modal__input"
                    type="text"
                    name="name" 
                    placeholder="Name your item"
                    value={formData.name}
                    minLength={2}
                    maxLength={32}
                    onChange={handleChange}
                    required
                />
            
            </label>
            <label className='modal__label'>
                Image Url
                <input
                    className="modal__input"
                    type="url"
                    name="imageUrl"
                    placeholder='Image URL'
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className='modal__label'>
                Weather
                <select
                    className="modal__input"
                    name="weather"
                    value={formData.weather}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select weather</option>
                    <option value="hot">Hot</option>
                    <option value="warm">Warm</option>
                    <option value="cold">Cold</option>
                </select>
                </label>
            

        </ModalWithForm>
    )
}

export default AddItemModal;