import React from 'react';

interface TimerProps {
    time: number;
    isGameStarted: boolean;
    isGameEnded: boolean;
    moves: number;
    points: number;
    maxPoints: number;
}

const GameInfo: React.FC<TimerProps> = ({
     time,
     isGameStarted,
     isGameEnded,
     moves,
     points,
     maxPoints
}) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        isGameStarted && !isGameEnded && (
            <>
                <div className="time-elapsed mb-2 mt-1">
                    {isGameStarted ? `Time: ${formatTime(time)}` : ''}
                </div>
                <p className="mb-0">Moves: {moves}</p>
                <p>Points: {points}/{maxPoints}</p>
            </>
        )
    )
};

export default GameInfo;