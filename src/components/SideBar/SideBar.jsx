import React, { useContext } from 'react'
import './SideBar.css'
import avatar from '../../assets/avatar.png'
import { UserContext } from '../../contexts/CurrentUserContext'

function SideBar({ handleEditUserClick, handleLogout}){
    const { currentUser }= useContext(UserContext);

    return (
        <div className="side-bar">
            <div className="side-bar__profile">
                <img src={currentUser?.avatar} alt="Profile" className="side-bar__avatar" />
                <p className="side-bar__name">{currentUser?.name}</p>
            </div>
            <button 
                onClick={handleEditUserClick}
                type='button'
                className="sidebar__edit-profile"
            >
                Change profile data
            </button>
            <button 
                className="sidebar__logout"
                onClick={handleLogout}
                type='button'
            >
                Log out
            </button>
        </div>
    )
}

export default SideBar;