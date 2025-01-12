import React, { useState, useEffect } from 'react';
import generateBoard from './utils/generateBoard';
import Board from "./components/Board";
import Header from "./components/Header";
// @ts-ignore
import { Button, ButtonGroup } from 'react-bootstrap';


interface Card {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
}

const App: React.FC = () => {
    /*
    board - aktualny uklad planszy
    setBoard - uzywamy do zmiany planszy
    Poczatkowa wartosc generowana za pomoca funkcji generateBoard

    selectedCards - przechouje odkryte karty (max 2 na raz)
    setSelecetedCards - dodaje nowe karty do listy odkrytych

    moves - licznik ruchow gracza
    setMoves - zwiekszamy licznik ruchow przy kazdym ruchu

    points - licznik punktow

    numRows, numCols - liczba wierszy i kolumn
    setNumRows, setNumCols - ustawienie nowej liczby wierszy i kolumn
    */

    const [numRows, setNumRows] = useState<number>(4);
    const [numCols, setNumCols] = useState<number>(4);

    const [board, setBoard] = useState<Card[]>(generateBoard(numRows, numCols));
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [moves, setMoves] = useState<number>(0);

    const [points, setPoints] = useState<number>(0);
    const [maxPoints, setMaxPoints] = useState<number>(8);

    // Hook do ponownego generowania planszy po zmianie liczby wierszy/kolumn
    useEffect(() => {
        setBoard(generateBoard(numRows, numCols));
        const numPairs: number = (numRows * numCols) / 2;
        setMaxPoints(numPairs);
    }, [numRows, numCols]); // Tylko gdy numRows lub numCols się zmienia


    const handleSizeChange = (rows: number, cols: number) => {
        setNumRows(rows);
        setNumCols(cols);
        setMoves(0);
        setPoints(0);
    };

    const handleCardClick = (card: Card) => {
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
            setMoves(prev => prev + 1);

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

                setPoints(prev => prev + 1);
            }

            // Resetujemy wybrane karty po krotkim czasie
            setTimeout(() => setSelectedCards([]), 1000);
        }
    };

    return (
        <div className="container text-center App">
            <Header/>
            <p className="lead">Match all the pairs!</p>

            <p className="text-info mb-3">
                You can change the game board size by selecting one of the options below:
            </p>

            <ButtonGroup className="mb-3">
                <Button
                    variant={numRows === 2 && numCols === 2 ? 'primary' : 'secondary'}
                    size="lg"
                    onClick={() => handleSizeChange(2, 2)}
                >
                    2x2
                </Button>
                <Button
                    variant={numRows === 4 && numCols === 4 ? 'primary' : 'secondary'}
                    size="lg"
                    onClick={() => handleSizeChange(4, 4)}
                >
                    4x4
                </Button>
                <Button
                    variant={numRows === 6 && numCols === 6 ? 'primary' : 'secondary'}
                    size="lg"
                    onClick={() => handleSizeChange(6, 6)}
                >
                    6x6
                </Button>
            </ButtonGroup>

            <p>Moves: {moves}</p>
            <p>Points: {points}/{maxPoints}</p>

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