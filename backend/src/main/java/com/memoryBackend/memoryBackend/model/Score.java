package com.memoryBackend.memoryBackend.model;

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
    private String playerName;
    private int moves;
    private String board; // Reprezentacja planszy np. 4x4
    private long timeTaken; // Czas ukonczenia w sekundach
    private LocalDateTime createdAt;
}