import React, { useState, useEffect } from 'react';
// @ts-ignore
import axios, {AxiosError, AxiosResponse} from 'axios';
import generateBoard from './utils/generateBoard';
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AlertWithTimer from "./components/AlertWithTimer";

// @ts-ignore
import {Button, ButtonGroup, Table} from 'react-bootstrap';
import './styles/App.css';
import BoardSizeSelector from "./components/BoardSizeSelector";
import GameControls from "./components/GameControls";
import GameInfo from "./components/GameInfo";
import ScoreTable from "./components/ScoreTable";
import GameEndScreen from "./components/GameEndScreen";

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

    timer - czas gry
    isGameStarted - czy gra rozpoczeta
    isGamePause - gra zatrzymana
    isGameEnded - gra zakonczona

    scores - wyniki graczy
    scoresByBoard - filtr tabeli
    playerName - nazwa gracza
    isScoresSaved - czy wynik zapisany

    alertMessage - komunikaty
    alertType - typ komunikatu
    alertVisible - widocznosc alerta
    */

    const [numRows, setNumRows] = useState<number>(4);
    const [numCols, setNumCols] = useState<number>(4);

    const [board, setBoard] = useState<Card[]>(generateBoard(numRows, numCols));
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const [moves, setMoves] = useState<number>(0);

    const [points, setPoints] = useState<number>(0);
    const [maxPoints, setMaxPoints] = useState<number>(8);

    const [timer, setTimer] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
    const [isGameEnded, setIsGameEnded] = useState<boolean>(false);

    const [scores, setScores] = useState<Score[]>([]);
    const [scoresByBoard, setScoresByBoard] = useState<string>(''); // '' - brak filtra
    const [playerName, setPlayerName] = useState<string>('');
    const [isScoresSaved, setIsScoresSaved] = useState<boolean>(false);

    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<string | null>(null);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);

    // Hook do ponownego generowania planszy po zmianie liczby wierszy/kolumn
    useEffect(() => {
        setBoard(generateBoard(numRows, numCols));
        const numPairs: number = (numRows * numCols) / 2;
        setMaxPoints(numPairs);
    }, [numRows, numCols]); // Tylko gdy numRows lub numCols się zmienia

    // Pobierz dane z API
    useEffect(() => {
        axios
            .get<Score[]>('http://localhost:8080/api/scores')
            .then((response: AxiosResponse<Score[]>) => {
                setScores(response.data);
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching scores: ', error.message);
            })
    }, []);

    // Zapisz wynik gry
    const saveScore = async () => {
        if (playerName.trim() && points !== null && timer !== null) {
            try {
                const boardType = `${numCols}x${numRows}`;
                const response = await axios.post('http://localhost:8080/api/scores', {
                    playerName: playerName.trim(),
                    moves: moves,
                    board: boardType,
                    timeTaken: timer,
                });
                console.log('Score saved:', response.data);
                setAlertMessage('Your score has been saved successfully!');
                setAlertType('success');
                setIsScoresSaved(true);
            }
            catch (error) {
                console.error('Error creating scores:', error);
                setAlertMessage('Failed to save your score. Please try again');
                setAlertType('danger');
            }
        }
        else {
            setAlertMessage('Please ensure your name is entered!');
            setAlertType('warning');
        }
    };

    const closeAlert = () => {
        setAlertMessage(null);
        setAlertType(null);
        setAlertVisible(false)
    };

    // // Wyswietlanie alertu
    useEffect(() => {
        if (alertMessage) {
            setAlertVisible(true)
        }
    }, [alertMessage]);

    // GameInfo gry
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isGameStarted && !isGamePaused && !isGameEnded) {
            interval = setInterval(() => {
                setTimer(prevTime => prevTime + 1);
            }, 1000);
        }
        else {
            // @ts-ignore
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [isGameStarted, isGamePaused, isGameEnded]); // Tylko gdy zmieni sie stan gry

    // Sprawdzenie czy koniec gry
    useEffect(() => {
        if (points === maxPoints) {
            setIsGameEnded(true);
        }
    }, [points]);

    const startGame = (gameState: boolean = true) => {
        setIsGameStarted(gameState);
        setIsGamePaused(false);
        setIsGameEnded(false);
        setTimer(0);
        setMoves(0);
        setPoints(0);
        setIsScoresSaved(false);
    };

    const pauseGame = () => {
        setIsGamePaused(true);
    };

    const resumeGame = () => {
        setIsGamePaused(false);
    };

    const endGame = () => {
        startGame(false);
        setBoard(generateBoard(numRows, numCols));
    };

    const formatTime = (time: number)=> {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSizeChange = (rows: number, cols: number) => {
        setNumRows(rows);
        setNumCols(cols);
        setMoves(0);
        setPoints(0);
    };

    const handleCardClick = (card: Card) => {
        // Ignorujemy klikniecie, jesli karta juz jest sparowana a takze jest gra nie jest rozpoczeta lub zapauzowana
        if (card.isMatched || selectedCards.includes(card) || selectedCards.length === 2 || !isGameStarted || isGamePaused) {
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

    const top10Scores = filteredScores.slice(0, 10);

    return (
        <div className="container text-center App">
            <AlertWithTimer
                message={alertMessage}
                type={alertType}
                show={alertVisible}
                onClose={closeAlert}
            />

            <Header/>
            {/*<p className="lead">Match all the pairs!</p>*/}

            {/*<BoardSizeSelector*/}
            {/*    numRows={numRows}*/}
            {/*    numCols={numCols}*/}
            {/*    onSizeChange={handleSizeChange}*/}
            {/*/>*/}

            {!isGameStarted && (
                <>
                    {/*<p className="text-info mb-3">*/}
                    {/*    You can change the game board size by selecting one of the options below:*/}
                    {/*</p>*/}
                    <BoardSizeSelector
                        numRows={numRows}
                        numCols={numCols}
                        onSizeChange={handleSizeChange}
                    />
                    {/*<div className="button-group-wrapper">*/}
                        {/*<ButtonGroup className="mb-3">*/}
                        {/*    <Button*/}
                        {/*        variant={numRows === 2 && numCols === 2 ? 'primary' : 'secondary'}*/}
                        {/*        size="lg"*/}
                        {/*        onClick={() => handleSizeChange(2, 2)}*/}
                        {/*    >*/}
                        {/*        2x2*/}
                        {/*    </Button>*/}
                        {/*    <Button*/}
                        {/*        variant={numRows === 4 && numCols === 4 ? 'primary' : 'secondary'}*/}
                        {/*        size="lg"*/}
                        {/*        onClick={() => handleSizeChange(4, 4)}*/}
                        {/*    >*/}
                        {/*        4x4*/}
                        {/*    </Button>*/}
                        {/*    <Button*/}
                        {/*        variant={numRows === 6 && numCols === 6 ? 'primary' : 'secondary'}*/}
                        {/*        size="lg"*/}
                        {/*        onClick={() => handleSizeChange(6, 6)}*/}
                        {/*    >*/}
                        {/*        6x6*/}
                        {/*    </Button>*/}
                        {/*</ButtonGroup>*/}
                    {/*</div>*/}
                </>
            )}

            <GameControls
                isGameStarted={isGameStarted}
                isGamePaused={isGamePaused}
                isGameEnded={isGameEnded}
                onStart={() => startGame()}
                onPause={pauseGame}
                onResume={resumeGame}
                onEnd={endGame}
            />

            {/*{!isGameStarted && (*/}
            {/*    <Button*/}
            {/*        className="start-button"*/}
            {/*        onClick={startGame}*/}
            {/*    >*/}
            {/*        Start Game*/}
            {/*    </Button>*/}
            {/*)}*/}

            {/*<ButtonGroup>*/}
            {/*    {isGameStarted && !isGamePaused && !isGameEnded && (*/}
            {/*        <Button*/}
            {/*            className="pause-button"*/}
            {/*            onClick={pauseGame}*/}
            {/*        >*/}
            {/*            Pause*/}
            {/*        </Button>*/}
            {/*    )}*/}

            {/*    {isGameStarted && isGamePaused && (*/}
            {/*        <Button*/}
            {/*            className="resume-button"*/}
            {/*            onClick={resumeGame}*/}
            {/*        >*/}
            {/*            Resume*/}
            {/*        </Button>*/}
            {/*    )}*/}
            {/*    {isGameStarted && (*/}
            {/*        <Button*/}
            {/*            className="end-button"*/}
            {/*            onClick={endGame}*/}
            {/*        >*/}
            {/*            End Game*/}
            {/*        </Button>*/}
            {/*    )}*/}
            {/*</ButtonGroup>*/}

            <GameInfo
                time={timer}
                isGameStarted={isGameStarted}
                isGameEnded={isGameEnded}
                moves={moves}
                points={points}
                maxPoints={maxPoints}
            />

            {/*{isGameStarted && !isGameEnded && (*/}
            {/*    <>*/}
            {/*        <div className="time-elapsed mb-2 mt-1">*/}
            {/*            {isGameStarted ? `Time: ${formatTime(timer)}` : ''}*/}
            {/*        </div>*/}
            {/*        <p className="mb-0">Moves: {moves}</p>*/}
            {/*        <p>Points: {points}/{maxPoints}</p>*/}
            {/*    </>*/}
            {/*)}*/}

            <GameEndScreen
                isGameEnded={isGameEnded}
                numRows={numRows}
                numCols={numCols}
                timer={timer}
                moves={moves}
                isScoresSaved={isScoresSaved}
                playerName={playerName}
                setPlayerName={setPlayerName}
                saveScore={saveScore}
                formatTime={formatTime}
            />

            {/*{isGameEnded && (*/}
            {/*    <div className="mt-2">*/}
            {/*        <h2>Congratulations</h2>*/}
            {/*        <p>*/}
            {/*            You finished the game on the {numRows}x{numCols} board*/}
            {/*            in {formatTime(timer)} in {moves} moves*/}
            {/*        </p>*/}

            {/*        {!isScoresSaved && (*/}
            {/*            <>*/}
            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    placeholder="Enter your name"*/}
            {/*                    value={playerName}*/}
            {/*                    onChange={(e) => setPlayerName(e.target.value)}*/}
            {/*                    className="form-control w-25 mx-auto bg-secondary text-white"*/}
            {/*                />*/}

            {/*                <Button*/}
            {/*                    className="d-block mx-auto mt-3 w-25"*/}
            {/*                    onClick={saveScore}*/}
            {/*                >*/}
            {/*                    Save Score*/}
            {/*                </Button>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*)}*/}

            <Board
                board={board}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                numRows={numRows}
                numCols={numCols}
            />

            <ScoreTable
                scores={top10Scores}
                scoresByBoard={scoresByBoard}
                onFilterChange={handleBoardFilterChange}
            />

            {/*<h2 className="mt-5 best-scores-header">*/}
            {/*    Top 10 Best Scores*/}
            {/*    <select*/}
            {/*        id="boardFilter"*/}
            {/*        className="form-select bg-dark-subtle select-board-filter"*/}
            {/*        value={scoresByBoard}*/}
            {/*        onChange={handleBoardFilterChange}*/}
            {/*    >*/}
            {/*        <option value="">All Board</option>*/}
            {/*        <option value="2x2">2x2</option>*/}
            {/*        <option value="4x4">4x4</option>*/}
            {/*        <option value="6x6">6x6</option>*/}
            {/*    </select>*/}
            {/*</h2>*/}

            {/*<table className="table table-dark table-bordered table-striped">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>#</th>*/}
            {/*        <th>Player Name</th>*/}
            {/*        <th>Moves</th>*/}
            {/*        <th>Board</th>*/}
            {/*        <th>Time</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {top10Scores.length > 0 ? (*/}
            {/*        top10Scores.map((score, index) => (*/}
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
            {/*            <td colSpan={5}>No scores available for the selected board</td>*/}
            {/*        </tr>*/}
            {/*    )}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            <Footer/>

        </div> // App
    );
}

export default App;