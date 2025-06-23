import React from 'react';
import { useState, useEffect } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useForm } from '../../hooks/useForm.js';

function AddItemModal({ isOpen, onClose, onSubmit, buttonText, isLoadingText }) {
    const { values, handleChange, setValues } = useForm({
        name: '',
        imageUrl: '',
        weather: ''
    })

    useEffect(() => {
        if (isOpen){
            setValues({
                name:'',
                imageUrl: '',
                weather: ''
            });
        }
    }, [isOpen]);

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(values);
        };

    return (
        <ModalWithForm
            title="New garment"
            name="add-garment"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonText="Add Garment"
            // isLoadingText={isLoadingText}
        >
            <label className="modal__label">
                Name 
                <input
                    className="modal__input"
                    type="text"
                    name="name" 
                    placeholder="Name your item"
                    value={values.name}
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
                    value={values.imageUrl}
                    onChange={handleChange}
                    required
                />
            </label>
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
                            checked={values.weather === "hot"}
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
                            checked={values.weather === "warm"}
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
                            checked={values.weather === "cold"}
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