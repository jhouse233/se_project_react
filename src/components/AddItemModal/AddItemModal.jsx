import React from 'react';
import { useState, useEffect } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
// import { useForm } from '../hooks/useForm.js';

function AddItemModal({ isOpen, onClose, onSubmit }) {

    // const [newItemName, setNewItemName] = useState("");
    // const[newItemUrl, setNewItemUrl] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        weather: ''    
    })

    // const {values, handleChange, setValues} = useForm({});

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
    useEffect(() => {
        setFormData({
            name:'',
            imageUrl: '',
            weather: ''
        });
    }, [isOpen]);
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
            {/* <label className='modal__label'>
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
            </label> */}
            <label className='modal__label'>
                Weather
                <div className="modal__radio-group">
                    <div className="modal__radio-option">
                        <input
                            className='modal__radio'
                            type="radio"
                            id="hot"
                            name="weather"
                            value="hot"
                            checked={formData.weather === "hot"}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="hot">Hot</label>
                    </div>

                    <div className="modal__radio-option">
                        <input
                            className='modal__radio'
                            type="radio"
                            id="warm"
                            name="weather"
                            value="warm"
                            checked={formData.weather === "warm"}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="warm">Warm</label>
                    </div>

                    <div className="modal__radio-option">
                        <input
                            className='modal__radio'
                            type="radio"
                            id="cold"
                            name="weather"
                            value="cold"
                            checked={formData.weather === "cold"}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="cold">Cold</label>
                    </div>
                </div>
            </label>
            

        </ModalWithForm>
    )
}

export default AddItemModal;