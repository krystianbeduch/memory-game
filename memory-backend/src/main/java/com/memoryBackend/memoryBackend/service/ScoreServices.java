package com.memoryBackend.memoryBackend.service;

import com.memoryBackend.memoryBackend.model.Score;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.memoryBackend.memoryBackend.repository.ScoreRepository;

import java.util.List;

@Service
public class ScoreServices {
    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreServices(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public Score saveScore(Score score) {
        return scoreRepository.save(score);
    }

    public List<Score> getAllScores() {
        return scoreRepository.findAll();
    }
}
