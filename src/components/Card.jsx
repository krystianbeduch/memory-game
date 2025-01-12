import React from 'react';
import '../Card.css';

// eslint-disable-next-line react/prop-types
function Card({ id, image, onClick, isFlipped }) {
    return (
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => onClick(id)}>
            <img src={image} alt="card" className="card-image" />
        </div>
    );
}

export default Card;
