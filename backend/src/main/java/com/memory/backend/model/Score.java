package com.memory.backend.model;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@Document(collection = "scores")
public class Score {
    @Id
    private String id;

    @NotNull(message = "Player name is required")
    @Size(min = 3, max = 50, message = "Player name must be between 3 and 50 characters")
    private String playerName;

    @NotNull(message = "Moves is required")
    @Min(value = 1, message = "Moves must be greater or equal to 1")
    private Integer moves;

    @NotEmpty(message = "Board is required")
    @Pattern(regexp = "^(2x2|4x4|6x6|8x8)$", message = "Board must be one of '2x2', '4x4', or '6x6'")
    private String board; // Reprezentacja planszy

    @NotNull(message = "Time taken name is required")
    @Min(value = 2, message = "Time taken must be greater or equal to 2")
    private Long timeTaken; // Czas ukonczenia w sekundach

    private LocalDateTime createdAt;

//    public String getId() {
//        return id;
//    }
//
//    public @NotNull(message = "Player name is required") @Size(min = 3, max = 50, message = "Player name must be between 3 and 50 characters") String getPlayerName() {
//        return playerName;
//    }
//
//    public @NotNull(message = "Moves is required") @Min(value = 1, message = "Moves must be greater or equal to 1") Integer getMoves() {
//        return moves;
//    }
//
//    public @NotEmpty(message = "Board is required") @Pattern(regexp = "^(2x2|4x4|6x6|8x8)$", message = "Board must be one of '2x2', '4x4', or '6x6'") String getBoard() {
//        return board;
//    }
//
//    public @NotNull(message = "Time taken name is required") @Min(value = 2, message = "Time taken must be greater or equal to 2") Long getTimeTaken() {
//        return timeTaken;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public void setPlayerName(@NotNull(message = "Player name is required") @Size(min = 3, max = 50, message = "Player name must be between 3 and 50 characters") String playerName) {
//        this.playerName = playerName;
//    }
//
//    public void setMoves(@NotNull(message = "Moves is required") @Min(value = 1, message = "Moves must be greater or equal to 1") Integer moves) {
//        this.moves = moves;
//    }
//
//    public void setBoard(@NotEmpty(message = "Board is required") @Pattern(regexp = "^(2x2|4x4|6x6|8x8)$", message = "Board must be one of '2x2', '4x4', or '6x6'") String board) {
//        this.board = board;
//    }
//
//    public void setTimeTaken(@NotNull(message = "Time taken name is required") @Min(value = 2, message = "Time taken must be greater or equal to 2") Long timeTaken) {
//        this.timeTaken = timeTaken;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
}