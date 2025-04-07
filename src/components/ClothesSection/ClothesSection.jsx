import React from 'react';
import { useState } from 'react'
import { deleteItem, addItem } from '../../utils/api';

import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

import './ClothesSection.css'



function ClothesSection() {

    const [addNewItem, setAddNewItem] = useState(false);
    const [clothingItems, setClothingItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [deleteSelectedItem, setDeleteSelectedItem] = useState(null);

    // const handleSubmit = (values) => {
    //     setClothingItems([...clothingItems, values]);
    //     console.log('Current clothing items:', clothingItems)
    //     setAddNewItem(false);
    // }
    const handleSubmit = async (values) => {
        try {
            const newItem = await addItem(values.name, values.imageUrl, values.weather);
            setClothingItems([...clothingItems, newItem]);
            setAddNewItem(false);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleCardClick = (item) => {
        console.log('Card clicked, item data:', item)
        setSelectedItem(item);
    }

    // const handleDeleteItem = (itemToDelete) => {
    //     const updatedClothingItems = clothingItems.filter((item) => item !== itemToDelete);
    //     setClothingItems(updatedClothingItems);
    //     setSelectedItem(null);
    //     setDeleteSelectedItem("");
    // }
    const handleDeleteItem = async (itemToDelete) => {
        console.log('Attempting to delete item', itemToDelete);
        console.log('Item ID:', itemToDelete?._id);
        console.log('Item full structure:', JSON.stringify(itemToDelete, null, 2));
        try {
            await deleteItem(itemToDelete._id); 
            const updatedClothingItems = clothingItems.filter((item) => item !== itemToDelete);
            setClothingItems(updatedClothingItems);
            setSelectedItem(null);
            setDeleteSelectedItem(null);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleDeleteClick = (item) => {
        console.log('Delete clicked, item data', item);
        console.log('Item structure:', JSON.stringify(item, null, 2))
        setDeleteSelectedItem(item);
    }

    

    return(
        <section className="clothes-section">
            <div className="clothes-section__header">
                <h2 className="clothes-section__title">Your Items</h2>
                <button className="clothes-section__add-button" onClick={() => setAddNewItem(true)} onClose={() => setAddNewItem(false)}>+ Add New</button>
            </div>
            <div className="clothes-section__cards">
                {clothingItems.map((item, index) => (
                    <div key={index} className='card' onClick={() => handleCardClick(item)}>
                        <img src={item.imageUrl} alt={item.name} className="card__image" />
                        <div className="card__name">{item.name}</div>
                    </div>
                ))}
                
            </div>
            <AddItemModal 
                isOpen={addNewItem}
                onClose={() => setAddNewItem(false)}
                onSubmit={handleSubmit}
            />
            <ItemModal 
                isOpen={selectedItem !== null}
                name={selectedItem?.name}
                imageUrl={selectedItem?.imageUrl}
                weatherType={selectedItem?.weatherType}
                onClose={() => setSelectedItem(null)}
                onDelete={() => handleDeleteClick(selectedItem)}
            />
            <DeleteConfirmModal 
                isOpen={Boolean(deleteSelectedItem)}
                onClose={() => setDeleteSelectedItem(null)}
                onConfirm={() => handleDeleteItem(deleteSelectedItem)}
                name={deleteSelectedItem?.name}
            />
        </section>
    )
}

export default ClothesSection;