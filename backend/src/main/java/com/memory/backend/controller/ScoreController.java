package com.memory.backend.controller;

import com.memory.backend.model.Score;
import com.memory.backend.service.ScoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/scores")
@RestController
public class ScoreController {
    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping
    public List<Score> showScores() {
        // List.copyOf tworzy niemodyfikowalna kolekcje
        return List.copyOf(scoreService.getAllScoresOrderByBoardDescAndMovesAsc());
    }

    @PostMapping
    public ResponseEntity<Score> addScore(@RequestBody @Valid Score score) {
        // Jesli walidacja nie powiedzie sie, Spring automatycznie wyrzuci wyjątek 400
        Score savedScore = scoreService.saveScore(score);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedScore);
    }
}