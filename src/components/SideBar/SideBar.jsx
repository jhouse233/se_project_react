import React from 'react'
import './SideBar.css'
import avatar from '../../assets/avatar.png'

function SideBar(){

    return (
        <div className="side-bar">
            <div className="side-bar__profile">
                <img src={avatar} alt="Side-Bar Avatar" className="side-bar__avatar" />
                <p className="side-bar__name">Terrance Tegegne</p>
            </div>
        </div>
    )
}

export default SideBar;