import React from 'react';
import  ClothesSection  from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import { useContext } from 'react'
import './Profile.css';

export default function Profile({ cards, onCardClick, onDeleteItem, handleAddNewItemClick, handleEditUserClick, handleLogOut, onCardLike }) {
    console.log('Cards in Profile:', cards);
    return (
        <main className="profile-page">
            <div className="profile-container">
                <SideBar 
                    handleEditUserClick={handleEditUserClick}
                    handleLogout={handleLogOut}
                />
                <ClothesSection 
                    cards={cards}
                    onCardClick={onCardClick}
                    onDeleteItem={onDeleteItem}
                    handleAddNewItemClick={handleAddNewItemClick}
                    onCardLike={onCardLike}
                />
            </div>
        </main>
    )
}