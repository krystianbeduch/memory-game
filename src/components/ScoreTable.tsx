import React from 'react';
// @ts-ignore
import { Table } from 'react-bootstrap';
import '../styles/ScoreTable.css';

interface Score {
    id: string;
    playerName: string;
    moves: number;
    board: string;
    timeTaken: number;
    createdAt: string;
}

interface ScoreTableProps {
    scores: Score[];
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
                    {/*<option value="8x8">8x8</option>*/}
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
                    {scores.map((score, index) => (
                        <tr key={score.id}>
                            <td>{index + 1}</td>
                            <td>{score.playerName}</td>
                            <td>{score.moves}</td>
                            <td>{score.board}</td>
                            <td>{score.timeTaken}s</td>
                            <td>{new Date(score.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </>
            );
            };

            export default ScoreTable;
