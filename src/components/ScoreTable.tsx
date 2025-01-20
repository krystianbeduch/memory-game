import React from 'react';
import { Table } from 'react-bootstrap';
import { ScoreProps } from '../types/types';
import '../styles/ScoreTable.css';


interface ScoreTableProps {
    scores: ScoreProps[];
    scoresByBoard: string;
    onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ScoreTable: React.FC<ScoreTableProps> = ({
    scores,
    scoresByBoard,
    onFilterChange,
}) => {
    return (
        <>
            <div className="best-scores-header-wrapper position-relative my-2">
                <h2 className="mt-2 text-center best-scores-header ">
                    Top 10 Best Scores
                </h2>
                <select
                    id="boardFilter"
                    value={scoresByBoard}
                    onChange={onFilterChange}
                    className="form-select bg-dark-subtle select-board-filter"
                >
                    <option value="">All</option>
                    <option value="2x2">2x2</option>
                    <option value="4x4">4x4</option>
                    <option value="6x6">6x6</option>
                    <option value="8x8">8x8</option>
                </select>
            </div>

            <Table variant="dark" striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Player Name</th>
                    <th>Moves</th>
                    <th>Board</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {scores.length > 0 ? (
                    scores.map((score, index) => (
                            <tr key={score.id}>
                                <td>{index + 1}</td>
                                <td>{score.playerName}</td>
                                <td>{score.moves}</td>
                                <td>{score.board}</td>
                                <td>{score.timeTaken}s</td>
                                <td>{new Date(score.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                ) : (
                    <tr>
                        <td colSpan={6}>No scores available for the selected board</td>
                    </tr>
                )}

                </tbody>
            </Table>
        </>
    );
};

export default ScoreTable;