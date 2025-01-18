import React from 'react';
// @ts-ignore
import { ButtonGroup, Button } from 'react-bootstrap';
import '../styles/BoardSizeSelector.css';

interface BoardSizeSelectorProps {
    numRows: number;
    numCols: number;
    onSizeChange: (rows: number, cols: number) => void;
}

const BoardSizeSelector: React.FC<BoardSizeSelectorProps> = ({
    numRows,
    numCols,
    onSizeChange,
}) => {
    const sizes = [
        { rows: 2, cols: 2 },
        { rows: 4, cols: 4 },
        { rows: 6, cols: 6 },
        // { rows: 8, cols: 8 },
    ];

    return (
        <>
            <p className="text-info mb-3">
                You can change the game board size by selecting one of the options below:
            </p>

            <div className="button-group-wrapper">
                <ButtonGroup className="mb-3">
                    {sizes.map((size) => (
                        <Button
                            key={`${size.rows}x${size.cols}`}
                            variant={numRows === size.rows && numCols === size.cols ? 'primary' : 'secondary'}
                            onClick={() => onSizeChange(size.rows, size.cols)}
                        >
                            {size.rows}x{size.cols}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </>


    );
};

export default BoardSizeSelector;
