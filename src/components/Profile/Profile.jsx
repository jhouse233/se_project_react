import React from 'react';
import  ClothesSection  from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import { useContext } from 'react'
import './Profile.css';

export default function Profile({ cards, onCardClick, onDeleteItem, handleAddNewItemClick }) {
    console.log('Cards in Profile:', cards);
    return (
        <main className="profile-page">
            <div className="profile-container">
                <SideBar />
                <ClothesSection 
                    cards={cards}
                    onCardClick={onCardClick}
                    onDeleteItem={onDeleteItem}
                    handleAddNewItemClick={handleAddNewItemClick}
                />
            </div>
        </main>
    )
}