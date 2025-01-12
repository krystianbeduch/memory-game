import React, { useState, useEffect } from 'react';
// import './style.css';
import generateBoard from './utils/generateBoard.tsx';
import Board from "./components/Board.tsx";

function App() {
    /*
    board - aktualny uklad planszy
    setBoard - uzywamy do zmiany planszy
    Poczatkowa wartosc generowana za pomoca funkcji generateBoard

    selectedCards - przechouje odkryte karty (max 2 na raz)
    setSelecetedCards - dodaje nowe karty do listy odkrytych

    moves - licznik ruchow gracza
    setMoves - zwiekszamy licznik ruchow przy kazdym ruchu

    numRows, numCols - liczba wierszy i kolumn
    setNumRows, setNumCols - ustawienie nowej liczby wierszy i kolumn
    */

    const [numRows, setNumRows] = useState(4);
    const [numCols, setNumCols] = useState(4);

    const [board, setBoard] = useState(generateBoard(numRows, numCols));
    const [selectedCards, setSelectedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    // Hook do ponownego generowania planszy po zmianie liczby wierszy/kolumn
    useEffect(() => {
        setBoard(generateBoard(numRows, numCols));
    }, [numRows, numCols]); // Tylko gdy numRows lub numCols się zmienia


    const handleSizeChange = (rows, cols) => {
        setNumRows(rows);
        setNumCols(cols);
    };

    const handleCardClick = (card) => {
        // Ignorujemy klikniecie, jesli karta juz jest sparowana
        if (card.isMatched || selectedCards.includes(card) || selectedCards.length === 2) {
            return;
        }

        /* Dodajemy karte do listy wybranych
        prev to poprzednia wartosc stanu selectedCards, spread operator rozwija elementy tablicy prev
        konstrukcja [...prev, card] tworzy nowa tablice, ktora zawiera wszystkie elemnty z prev oraz nowy element card
        */
        setSelectedCards((prev) => [...prev, card]);

        // Sprawdzamy, czy to drugi klik
        if (selectedCards.length === 1) {
            const [firstCard] = selectedCards;

            // Zwiekszamy licznik ruchw
            setMoves((prev) => prev + 1);

            // Sprawdzamy, czy karty pasuja do siebie
            if (firstCard.image === card.image) {
                /* Pasuja — oznaczamy je jako sparowane
                prev.map() przechodzi przez wszystkie elementy tablicy i zwraca nowa tablice z przeksztalconymi elementami
                Jesli warunek jest spelniony rozwijamy istniejacy obiekt karty c
                za pomoca spread operatora i nadpisujemy jego wlasciwosc isMatched na true
                */
                setBoard((prev) =>
                    prev.map((c) =>
                        c.image === card.image ? { ...c, isMatched: true } : c
                    )
                );
            }

            // Resetujemy wybrane karty po krotkim czasie
            setTimeout(() => setSelectedCards([]), 1000);
        }
    };

    return (
        <div className="container text-center App">
            <h1 className="my-4 text-light">Memory Game</h1>
            <p className="lead">Match all the pairs!</p>
            <p>Moves: {moves}</p>

            <button onClick={() => handleSizeChange(4, 4)}>4x4</button>
            <button onClick={() => handleSizeChange(6, 6)}>6x6</button>
            <Board
                board={board}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                numRows={numRows}
                numCols={numCols}
            />
        </div>
    );
}

export default App;