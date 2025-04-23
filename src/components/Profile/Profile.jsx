import React from 'react';
import  ClothesSection  from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';

import { useContext } from 'react'

import './Profile.css';

export default function Profile() {
    return (
        <main className="profile-page">
            <div className="profile-container">
                <SideBar />
                <ClothesSection />
            </div>
        </main>
    )
}