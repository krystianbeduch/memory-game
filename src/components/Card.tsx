import React from 'react';
import '../styles/Card.css';

interface CardProps {
    card: {
        image: string;
    };
    isFlipped: boolean;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick }) => (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onClick}>
        <div className="card-front">
            <img src={card.image} alt="Memory card" />
        </div>
        <div className="card-back">?</div>
    </div>
);

export default Card;
