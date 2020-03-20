import React from 'react';
import './css/InfoBar.css';

const InfoBar = ({room}) => (
    <div className="InfoBar">
        <div className="leftContainer">
            <h3>{room}</h3>
        </div>
        <div className="rightContainer">
            <a href="/"/>
        </div>
    </div>
)

export default InfoBar;