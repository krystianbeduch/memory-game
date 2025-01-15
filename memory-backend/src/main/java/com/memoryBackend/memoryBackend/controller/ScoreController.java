package com.memoryBackend.memoryBackend.controller;

import com.memoryBackend.memoryBackend.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.memoryBackend.memoryBackend.service.ScoreServices;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
//@CrossOrigin(origins = "http://localhost:5174")
public class ScoreController {
    private final ScoreServices scoreServices;

    @Autowired
    public ScoreController(ScoreServices scoreServices) {
        this.scoreServices = scoreServices;
    }

    @PostMapping
    public ResponseEntity<Score> saveScore(@RequestBody Score score) {
        return ResponseEntity.ok(scoreServices.saveScore(score));
    }

//    @GetMapping
//    public ResponseEntity<List<Score>> getAllScores() {
//        return ResponseEntity.ok(scoreRepository.findAll());
//    }

    @GetMapping
    public List<Score> getAllScores() {
        return scoreServices.getAllScores();
    }
}
