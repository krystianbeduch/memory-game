import React from 'react';
import { Button } from 'react-bootstrap';

interface GameEndScreenProps {
    isGameEnded: boolean;
    numRows: number;
    numCols: number;
    timer: number;
    moves: number;
    isScoresSaved: boolean;
    playerName: string;
    setPlayerName: (name: string) => void;
    saveScore: () => void;
    formatTime: (time: number) => string;
}

const GameEndScreen: React.FC<GameEndScreenProps> = ({
    isGameEnded,
    numRows,
    numCols,
    timer,
    moves,
    isScoresSaved,
    playerName,
    setPlayerName,
    saveScore,
    formatTime,
}) => {
    if (!isGameEnded) {
        return null;
    }

    return (
        <div className="mt-2">
            <h2>Congratulations</h2>
            <p>
                You finished the game on the {numRows}x{numCols} board in{' '}
                {formatTime(timer)} in {moves} moves
            </p>

            {!isScoresSaved && (
                <>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="form-control w-25 mx-auto bg-secondary text-white"
                    />

                    <Button
                        className="d-block mx-auto mt-3 w-25"
                        onClick={saveScore}
                    >
                        Save Score
                    </Button>
                </>
            )}
        </div>
    );
};

export default GameEndScreen;