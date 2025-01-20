export interface CardProps {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
    onClick?: () => void;
}

export interface ScoreProps {
    id: string;
    playerName: string;
    moves: number;
    board: string;
    timeTaken: number;
    createdAt: string;
}