import './ModalWithForm.css'
import { useState } from 'react';

import closeIcon from '../../assets/modal__close.svg';
import addGarment from '../../assets/add_garment_disabled.svg';


const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
export default function ModalWithForm ({title, name, onClose, children, onSubmit,isOpen, selectedCard=null, inputName, inputImageUrl}) {

    if (!isOpen) return null;

    const [itemName, setItemName] = useState(selectedCard ? selectedCard.name : "");
    const [imageUrl, setImageUrl] = useState(selectedCard ? selectedCard.imageUrl : "");
    const [weatherType, setWeatherType] = useState(selectedCard ? selectedCard.weatherType : "hot");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidUrl(imageUrl)) {
            const formData = {
                itemName: itemName,
                imageUrl: imageUrl,
                weatherType: weatherType
            };
            onSubmit(formData);
            onClose();

        } else {
            alert("Please enter a valid URL");
        }
    }

    const weatherOptions = [
        { id: "hot", value: "hot", label: "Hot" },
        { id: "warm", value: "warm", label: "Warm" },
        { id: "cold", value: "cold", label: "Cold" }
    ];

    return (
        <div className="modal">
            <div className="modal__content">
                <button className="modal__close" type="button" onClick={onClose}>
                    <img src={closeIcon} alt="modal-close" className="modal__close-icon" />
                </button>
                <h3 className="modal__title">{title}</h3>
                <form className="modal__form" name={name} onSubmit={handleSubmit}>
                    <label  className="modal__label">
                        
                        <input 
                            type="text"
                            className="modal__input" 
                            placeholder={inputName}
                            required
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            />
                    </label>

                    <label className="modal__label">
                        
                        <input
                            type="url"
                            className="modal__input" 
                            placeholder={inputImageUrl}
                            required
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            />
                    </label>

                    <label className="modal__label">
                        
                        <div className="modal__radio-container">
                            {weatherOptions.map((option) => 
                                <div key={option.id} className="modal__radio-option">
                                    <input
                                        type="radio" 
                                        className="modal__radio" 
                                        id="hot"
                                        name="weatherType"
                                        value="hot"
                                        checked={weatherType === 'hot'}
                                        onChange={(e) => setWeatherType(e.target.value)}
                                    />
                                    <label htmlFor={option.id}>{option.label}</label>
                                </div>
                            )}
                        </div>
                    </label>

                    <button className="modal__submit" type="submit">
                        {selectedCard ? (
                            "Save changes"
                        ) : (
                            <img src={addGarment} alt="" className="modal__submit-icon" />
                        )}
                       
                    </button>
                </form>
            </div>
        </div>
    )
}