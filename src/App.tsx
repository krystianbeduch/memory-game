import React, { useState, useEffect } from 'react';
// @ts-ignore
import axios, {AxiosError, AxiosResponse} from 'axios';
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

interface Score {
    id: string;
    playerName: string;
    moves: number;
    board: string;
    timeTaken: number;
    createdAt: string;
}

const apiCall = () => {
    axios.get("http://localhost:8080/api/scores").then((data: any) => {
        console.log(data);
    });
};

const App: React.FC = () => {
    /*
    numRows, numCols - liczba wierszy i kolumn
    setNumRows, setNumCols - ustawienie nowej liczby wierszy i kolumn

    board - aktualny uklad planszy
    setBoard - uzywamy do zmiany planszy
    Poczatkowa wartosc generowana za pomoca funkcji generateBoard

    selectedCards - przechouje odkryte karty (max 2 na raz)
    setSelecetedCards - dodaje nowe karty do listy odkrytych

    moves - licznik ruchow gracza
    setMoves - zwiekszamy licznik ruchow przy kazdym ruchu

    points - licznik punktow
    maxPoints - maksymalna liczba punktow mozliwa do zdobycia na danej planszy

    scores - wyniki graczy

    */

    const [numRows, setNumRows] = useState<number>(4);
    const [numCols, setNumCols] = useState<number>(4);

    const [board, setBoard] = useState<Card[]>(generateBoard(numRows, numCols));
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [moves, setMoves] = useState<number>(0);

    const [points, setPoints] = useState<number>(0);
    const [maxPoints, setMaxPoints] = useState<number>(8);

    const [scores, setScores] = useState<Score[]>([]);
    const [scoresByBoard, setScoresByBoard] = useState<string>(''); // '' - brak filtra

    // Hook do ponownego generowania planszy po zmianie liczby wierszy/kolumn
    useEffect(() => {
        setBoard(generateBoard(numRows, numCols));
        const numPairs: number = (numRows * numCols) / 2;
        setMaxPoints(numPairs);
    }, [numRows, numCols]); // Tylko gdy numRows lub numCols się zmienia

    useEffect(() => {
        axios
            .get<Score[]>("http://localhost:8080/api/scores")
            .then((response: AxiosResponse<Score[]>) => {
                setScores(response.data);
            })
            .catch((error: AxiosError) => {
                console.error("Error fetching scores: ", error.message);
            })
    }, []);


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

    const handleBoardFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setScoresByBoard(event.target.value);
    };

    const filteredScores = scores.filter((score) =>
        scoresByBoard === '' || score.board === scoresByBoard
    );

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

            <button onClick={apiCall}>Make API Call</button>

            <h2 className="mt-5 best-scores-header" style={{ position: 'relative', textAlign: 'center' }}>
                Best Scores
                {/*<span className="text-center" style={{ flex: 1 }}>Best Scores</span>*/}
            {/*</h2>*/}
            {/*<div className="mb-3">*/}
            {/*    <label htmlFor="boardFilter" className="form-label">Filter by boad size:</label>*/}
                <select
                    id="boardFilter"
                    className="form-select bg-dark-subtle select-board-filter"
                    value={scoresByBoard}
                    onChange={handleBoardFilterChange}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '200px',
                        marginLeft: '15px'
                    }}
                >
                    <option value="">All Board</option>
                    <option value="2x2">2x2</option>
                    <option value="4x4">4x4</option>
                    <option value="6x6">6x6</option>
                </select>
            </h2>
            {/*</div>*/}
            <table className="table table-dark table-bordered table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Moves</th>
                    <th>Board</th>
                    <th>Time</th>
                </tr>
                </thead>
                {/*<tbody>*/}
                {/*    {scores.length > 0 ? (*/}
                {/*        scores.map((score, index) => (*/}
                {/*            <tr key={score.id}>*/}
                {/*                <td>{index + 1}</td>*/}
                {/*                <td>{score.playerName}</td>*/}
                {/*                <td>{score.moves}</td>*/}
                {/*                <td>{score.board}</td>*/}
                {/*                <td>{score.timeTaken}</td>*/}
                {/*            </tr>*/}
                {/*        ))*/}
                {/*    ) : (*/}
                {/*        <tr>*/}
                {/*            <td colSpan={5}>No scores available</td>*/}
                {/*        </tr>*/}
                {/*    )}*/}
                {/*</tbody>*/}
                <tbody>
                {filteredScores.length > 0 ? (
                    filteredScores.map((score, index) => (
                        <tr key={score.id}>
                            <td>{index + 1}</td>
                            <td>{score.playerName}</td>
                            <td>{score.moves}</td>
                            <td>{score.board}</td>
                            <td>{score.timeTaken}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>No scores available for the selected board</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default App;