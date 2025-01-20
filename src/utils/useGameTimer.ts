import React, { useEffect } from 'react';

export const useGameTimer = (
    isGameStarted: boolean,
    isGamePaused: boolean,
    isGameEnded: boolean,
    setTimer: React.Dispatch<React.SetStateAction<number>>
) => {
    useEffect(() => {
        let interval: NodeJS.Timeout = setInterval(() => {});

        if (isGameStarted && !isGamePaused && !isGameEnded) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 1);
            }, 1000);
        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isGameStarted, isGamePaused, isGameEnded, setTimer]);
};