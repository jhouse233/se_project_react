import React from 'react';
import './ClothesSection.css'
import ItemCard from '../ItemCard/ItemCard';

import { useContext } from 'react';
import { UserContext } from '../../contexts/CurrentUserContext';

function ClothesSection({ cards, onCardClick, onDeleteItem, handleAddNewItemClick, onCardLike }) {

    const { currentUser } = useContext(UserContext)

        return(
        <section className="clothes-section">
            <div className="clothes-section__header">
                <h2 className="clothes-section__title">Your Items</h2>
                <button className="clothes-section__add-button" onClick={handleAddNewItemClick}>+ Add New</button>
            </div>
            <div className="clothes-section__cards">
                {cards && cards
                    .filter((item) => item.owner === currentUser?._id)
                    .map((item, index) => {
                        if (!item || !item.imageUrl || !item.name) {
                            console.log('Invalid item:', item);
                            return null;
                        }
                    return (
                    <ItemCard 
                        key={item._id}
                        item={item}
                        onCardClick={() => onCardClick(item)}
                        onCardLike={onCardLike}
                    />
                    );
                })}
            </div>
        </section>
    )
}

export default ClothesSection;