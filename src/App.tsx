import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import AlertWithTimer from './components/AlertWithTimer';
import Board from './components/Board';
import BoardSizeSelector from './components/BoardSizeSelector';
import Footer from './components/Footer';
import GameControls from './components/GameControls';
import GameEndScreen from './components/GameEndScreen';
import GameInfo from './components/GameInfo';
import Header from './components/Header';
import ScoreTable from './components/ScoreTable';

import generateBoard from './utils/generateBoard';
import { formatTime } from './utils/formatTime';
import { useGameTimer } from './utils/useGameTimer';

import { CardProps, ScoreProps } from './types/types';
import './styles/App.css';



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

    const [board, setBoard] = useState<CardProps[]>(generateBoard(numRows, numCols));
    const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);
    const [moves, setMoves] = useState<number>(0);

    const [points, setPoints] = useState<number>(0);
    const [maxPoints, setMaxPoints] = useState<number>(8);

    const [timer, setTimer] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
    const [isGameEnded, setIsGameEnded] = useState<boolean>(false);

    const [scores, setScores] = useState<ScoreProps[]>([]);
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
            .get<ScoreProps[]>('http://localhost:8080/api/scores')
            .then((response: AxiosResponse<ScoreProps[]>) => {
                setScores(response.data);
            })
            .catch((error: AxiosError) => {
                console.error('Error fetching scores: ', error.message);
            })
    }, []);

    // Zapisz wynik gry
    const saveScore = async () => {
        if (playerName.trim().length >= 3 && moves !== null && timer !== null) {
            try {
                const boardType = `${numCols}x${numRows}`;
                const response = await axios.post('http://localhost:8080/api/scores', {
                    playerName: playerName.trim(),
                    moves: moves,
                    board: boardType,
                    timeTaken: timer,
                });
                console.log('Score saved:', response.data);
                setAlertMessage('Your score has been saved successfully! Refresh page to see it.');
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
            setAlertMessage('Please ensure your name is entered and has at least 3 characters!');
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

    useGameTimer(isGameStarted, isGamePaused, isGameEnded, setTimer);

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


    const handleSizeChange = (rows: number, cols: number) => {
        setNumRows(rows);
        setNumCols(cols);
        setMoves(0);
        setPoints(0);
    };

    const handleCardClick = (card: CardProps) => {
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

    const top10Scores = scores
        .filter((score) => !scoresByBoard || score.board === scoresByBoard)
        .slice(0, 10

    );

    return (
        <div className="container text-center App">
            <AlertWithTimer
                message={alertMessage}
                type={alertType}
                show={alertVisible}
                onClose={closeAlert}
            />

            <Header/>

            {!isGameStarted && (
                <>
                    <BoardSizeSelector
                        numRows={numRows}
                        numCols={numCols}
                        onSizeChange={handleSizeChange}
                    />
                </>
            )}

            <GameControls
                isGameStarted={isGameStarted}
                isGamePaused={isGamePaused}
                isGameEnded={isGameEnded}
                onStart={startGame}
                onPause={pauseGame}
                onResume={resumeGame}
                onEnd={endGame}
            />

            <GameInfo
                time={timer}
                isGameStarted={isGameStarted}
                isGameEnded={isGameEnded}
                moves={moves}
                points={points}
                maxPoints={maxPoints}
            />

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

            <Footer/>

        </div> // App
    );
}

export default App;