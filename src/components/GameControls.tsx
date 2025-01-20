import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import '../styles/GameControls.css'

interface GameControlsProps {
    isGameStarted: boolean;
    isGamePaused: boolean;
    isGameEnded: boolean;
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onEnd: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
    isGameStarted,
    isGamePaused,
    isGameEnded,
    onStart,
    onPause,
    onResume,
    onEnd,
}) => {
    return (
        <div className="mb-3 d-flex align-items-center justify-content-center">
            {isGameStarted ? (
                <>
                    <ButtonGroup>
                        {isGameStarted && !isGamePaused && !isGameEnded && (
                            <Button
                                variant="warning"
                                className="pause-button"
                                onClick={onPause}
                            >
                                Pause
                            </Button>
                        )}

                        {isGameStarted && isGamePaused && (
                            <Button
                                variant="success"
                                className="resume-button"
                                onClick={onResume}
                            >
                                Resume
                            </Button>
                        )}
                        <Button
                            variant="danger"
                            className="end-button"
                            onClick={onEnd}
                        >
                            End Game
                        </Button>
                    </ButtonGroup>
                </>
            ) : (
                <Button variant="primary" onClick={onStart}>
                    Start Game
                </Button>
            )}
        </div>
    );
};

export default GameControls;