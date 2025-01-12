import React from "react";
import Card from "./Card";
import '../styles/Board.css';

interface BoardProps {
    board: { id: number, image: string, isMatched: boolean, isFlipped: boolean }[];
    selectedCards: { id: number; image: string; isMatched: boolean; isFlipped: boolean }[]; // Typ dla odkrytych kart
    handleCardClick: (card: { id: number; image: string; isMatched: boolean; isFlipped: boolean }) => void; // Typ dla funkcji
    numRows: number;
    numCols: number;
}

const Board: React.FC<BoardProps> = ({ board, selectedCards, handleCardClick, numRows, numCols }) => {
    const gridStyle = {
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        width: `${numCols}${numCols}0px`,
    };
    /*
    board.map() iteruje przez tablice board gdzie karta karta jest reprezentowana przez obiekt o polach {id, image, isMatched}
    dla kazdej karty tworzony jest dynamiczny element div reprezentujacy pojedynczy kafalek na planszy
    key - unikalny klucz dla kazdej karty wymagany przez React aby poprwanie zarzadzac lista elementow w DOM
    className - zawsze przypisywana jest klasa card; dodatkowo jest karta znajduje sie w selectedCard (jest odkryta)
    lub ma isMatched: true (jest dopasowana) to karta otrzymuje klase flipped, ktora pokazuje wizualnie ze jest odwrocona
    */
    return (
        <div className="board" style={gridStyle}>
            {board.map((card, index) => (
                <Card
                    key={card.id}
                    card={card}
                    isFlipped={selectedCards.includes(card) || card.isMatched}
                    onClick={() => handleCardClick(card)}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Board;