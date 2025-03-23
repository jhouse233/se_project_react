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
export default function ModalWithForm ({title, name, onClose, children, onSubmit,isOpen, selectedCard=null}) {

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

    return (
        <div className="modal">
            <div className="modal__content">
                <button className="modal__close" type="button" onClick={onClose}>
                    <img src={closeIcon} alt="modal-close" className="modal__close-icon" />
                </button>
                <h3 className="modal__title">{title}</h3>
                <form className="modal__form" name={name} onSubmit={handleSubmit}>
                    <label  className="modal__label">
                        Name
                        <input 
                            type="text"
                            className="modal__input" 
                            placeholder="Name"
                            required
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            />
                    </label>

                    <label className="modal__label">
                        Image URL
                        <input
                            type="url"
                            className="modal__input" 
                            placeholder="Image URL"
                            required
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            />
                    </label>

                    <label className="modal__label">
                        Select the weather type
                        <div className="modal__radio-container">
                            <div className="modal__radio-option">
                                <input
                                    type="radio" 
                                    className="modal__radio" 
                                    id="hot"
                                    name="weatherType"
                                    value="hot"
                                    checked={weatherType === 'hot'}
                                    onChange={(e) => setWeatherType(e.target.value)}
                                />
                                <label htmlFor="hot">Hot</label>
                            </div>
                            <div className="modal__radio-option">
                                <input 
                                    type="radio" 
                                    className="modal__radio" 
                                    id="warm"
                                    name="weatherType"
                                    value="warm"
                                    checked={weatherType === 'warm'}
                                    onChange={(e) => setWeatherType(e.target.value)}
                                />
                                <label htmlFor="warm">Warm</label>
                            </div>
                            <div className="modal__radio-option">
                                <input 
                                    type="radio" 
                                    className="modal__radio" 
                                    id="cold"
                                    name="weatherType"
                                    value="cold"
                                    checked={weatherType === 'cold'}
                                    onChange={(e) => setWeatherType(e.target.value)}
                                />
                                <label htmlFor="cold">Cold</label>
                            </div>
                        </div>
                    </label>

                    <button className="modal__submit" type="submit">
                        {selectedCard ? (
                            "Save changes"
                        ) : (
                            <img src={addGarment} alt="Add Garment" className="modal__submit-icon" />
                        )}
                       
                    </button>
                </form>
            </div>
        </div>
    )
}