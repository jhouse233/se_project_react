import React from 'react';
import { useState, useEffect } from 'react'
import { deleteItem, addItem, getItems } from '../../utils/api';

import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';



import './ClothesSection.css'



function ClothesSection({ cards, onCardClick, onDeleteItem, isAddNewItemOpen, setIsAddNewItemOpen, handleAddNewItemSubmit }) {
    console.log('Cards in ClothesSection:', cards);
    // const [addNewItem, setAddNewItem] = useState(false);
    // const [clothingItems, setClothingItems] = useState([]);
    // const [selectedItem, setSelectedItem] = useState(null);
    // const [deleteSelectedItem, setDeleteSelectedItem] = useState(null);


    // const handleSubmit = async (values) => {
    //     try {
    //         const newItem = await addItem(values.name, values.imageUrl, values.weather);
    //         setClothingItems([...clothingItems, newItem]);
    //         setAddNewItem(false);
    //     } catch (error) {
    //         console.error('Error adding item:', error);
    //     }
    // };

    // const handleCardClick = (item) => {
    //     console.log('Card clicked, item data:', item)
    //     setSelectedItem(item);
    // }

    // const isValidItem = (item) => {
    //     return item 
    //         && typeof item.name === 'string'
    //         && typeof item.imageUrl === 'string'
    //         && typeof item.weather === 'string';
    //    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await getItems();
                console.log('Fetched items:', items)
                // const validItems = items.filter(isValidItem);
                // setClothingItems(validItems);
            } catch(error) {
                console.error('Error fetching items', error)
            }
        };
        fetchItems();
    }, [])

    // const handleDeleteItem = async (itemToDelete) => {
    //     try {
    //         await deleteItem(itemToDelete._id); 
    //         const updatedClothingItems = clothingItems.filter((item) => item !== itemToDelete);
    //         setClothingItems(updatedClothingItems);
    //         setSelectedItem(null);
    //         setDeleteSelectedItem(null);
    //     } catch (error) {
    //         console.error('Error deleting item:', error);
    //     }
    // };

    // const handleDeleteClick = (item) => {
    //     setDeleteSelectedItem(item);
    // }

    
    console.log('Sample card structure:', cards[0]);
    return(
        <section className="clothes-section">
            <div className="clothes-section__header">
                <h2 className="clothes-section__title">Your Items</h2>
                <button className="clothes-section__add-button" onClick={() => setIsAddNewItemOpen(true)}>+ Add New</button>
            </div>
            {/* <div className="clothes-section__cards">
                {cards && cards.map((item, index) => (
                    <div key={index} className='card' onClick={() => onCardClick(item)}>
                        <img src={item.imageUrl} alt={item.name} className="card__image" />
                        <div className="card__name">{item.name}</div>
                    </div>
                ))}
            </div> */}
            <div className="clothes-section__cards">
                {cards && cards.map((item, index) => {
                    if (!item || !item.imageUrl || !item.name) {
                        console.log('Invalid item:', item);
                        return null;
                    }
                    return (
                        <div key={index} className='card' onClick={() => onCardClick(item)}>
                            <img src={item.imageUrl} alt={item.name} className="card__image" />
                            <div className="card__name">{item.name}</div>
                        </div>
                    );
                })}
            </div>
            {isAddNewItemOpen && <AddItemModal 
                isOpen={isAddNewItemOpen}
                onClose={() => setIsAddNewItemOpen(false)}
                onSubmit={handleAddNewItemSubmit}
            />}
        </section>
    )
}

export default ClothesSection;