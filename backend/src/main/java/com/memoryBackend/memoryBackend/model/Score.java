package com.memoryBackend.memoryBackend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@Document(collection = "scores")
public class Score {

    @Id
    private String id;
    private String playerName;
    private int moves;
    private String board; // Reprezentacja planszy np. 4x4
    private long timeTaken; // Czas ukonczenia w sekundach
    private LocalDateTime createdAt;


//    public Score(String playerName, int score) {
//        super();
//        this.playerName = playerName;
//        this.score = score;
//        this.createdAt = LocalDateTime.now();
//    }

//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getPlayerName() {
//        return playerName;
//    }
//
//    public void setPlayerName(String playerName) {
//        this.playerName = playerName;
//    }
//
//    public int getScore() {
//        return score;
//    }
//
//    public void setScore(int score) {
//        this.score = score;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }

//    @Override
//    public String toString() {
//        return "Score{" +
//                "id='" + id + '\'' +
//                ", playerName='" + playerName + '\'' +
//                ", score=" + score +
//                ", createdAt=" + createdAt +
//                '}';
//    }
}