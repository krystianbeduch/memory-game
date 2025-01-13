import React from 'react';
import '../styles/Card.css';


interface CardProps {
    card: {
        image: string;
        id: number
    };
    isFlipped: boolean;
    onClick: () => void;
    index: number;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick, index }) => {
    return (
        <div
            className={`card ${isFlipped ? 'flipped' : ''}`}
            onClick={onClick}
            style={{'--i': index} as React.CSSProperties} // Ustawienie opoznienia animacji
        >
            <div className="card-front">
                <img src={card.image} alt="Memory card" />
            </div>
            <div className="card-back">?</div>
        </div>
    );
};

export default Card;