import React from 'react';
import './InfoBar.css';

const InfoBar = ({room}) => (
    <div className="InfoBar">
        <div className="leftContainer">
            <h3>{room}</h3>
        </div>
        <div className="rightContainer">
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href="/"/>
        </div>
    </div>
)

export default InfoBar;