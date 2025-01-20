import React from 'react';
import { animated, useSpring } from 'react-spring';
import { CardProps } from '../types/types';
import '../styles/Card.css';

const Card: React.FC<CardProps> = ({ id, image, isFlipped, isMatched, onClick }) => {
    const flip = useSpring({
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        config: { tension: 200, friction: 10 }
    })
    return (
        <div className="card-container" onClick={onClick}>
            <animated.div className="card" style={flip}>
                <div className="card-front">
                    <img src={image} alt={`Card ${id}`}/>
                </div>
                <div className="card-back">?</div>
            </animated.div>
        </div>
    );
};

export default Card;