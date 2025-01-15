package com.memoryBackend.memoryBackend.controller;

import com.memoryBackend.memoryBackend.model.Score;
import com.memoryBackend.memoryBackend.repository.ScoreRepository;
import com.memoryBackend.memoryBackend.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ScoreController {
    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @GetMapping("/api/scores")
    public ResponseEntity<List<Score>> showScores() {
        List<Score> scores = scoreService.getAllScores();
        if(scores == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(scores, HttpStatus.OK);

    }
}
