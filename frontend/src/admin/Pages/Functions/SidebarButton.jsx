import React from 'react';
import '../../Components/AdminDesign.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarButton({ icon, text, isSelected, onClick }) {
    const handleClick = () => {
      onClick();
    };
  
    return (
      <button className={`sidebar-button ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
        <FontAwesomeIcon icon={icon} style={{color:"#2F66D6"}} />
        <span className="sidebar-button-text">{text}</span>
      </button>
    );
}

export default SidebarButton;
