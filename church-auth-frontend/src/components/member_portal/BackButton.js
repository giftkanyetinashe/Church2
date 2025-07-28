import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css'; 

const BackButton = ({ to, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else {
            navigate(-1); // Go back one step in history
        }
    };

    return (
        <button className="reusable-back-btn" onClick={handleClick}>
            <i className="fas fa-arrow-left"></i>
            {children || 'Back'}
        </button>
    );
};

export default BackButton;