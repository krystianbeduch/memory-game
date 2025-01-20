import React from 'react';
import Card from './Card';
import { CardProps } from '../types/types';
import '../styles/Board.css';

interface BoardProps {
    board: CardProps[];
    selectedCards: CardProps[];
    handleCardClick: (card: CardProps) => void;
    numRows: number;
    numCols: number;
}

const Board: React.FC<BoardProps> = ({ board, selectedCards, handleCardClick, numRows, numCols }) => {

    const gridStyle: React.CSSProperties = {
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        width: `${numCols}${numCols}0px`,
    };
    /*
    board.map() iteruje przez tablice board gdzie karta karta jest reprezentowana przez obiekt card
    dla kazdej karty tworzony jest dynamiczny element div reprezentujacy pojedynczy kafalek na planszy
    key - unikalny klucz dla kazdej karty wymagany przez React aby poprwanie zarzadzac lista elementow w DOM
    className - zawsze przypisywana jest klasa card
    lub ma isMatched: true (jest dopasowana) to karta otrzymuje klase flipped, ktora pokazuje wizualnie ze jest odwrocona
    */
    return (
        <div className="board" style={gridStyle}>
            {board.map((card, index) => (
                <Card
                    key={card.id}
                    image={card.image}
                    isFlipped={selectedCards.includes(card) || card.isMatched}
                    isMatched={selectedCards.includes(card)}
                    onClick={() => handleCardClick(card)}
                    id={index}
                />
            ))}
        </div>
    );
};

export default Board;