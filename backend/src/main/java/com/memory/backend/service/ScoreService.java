package com.memory.backend.service;

import com.memory.backend.model.Score;
import com.memory.backend.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    public List<Score> getAllScoresOrderByBoardDescAndMovesAsc() {
        return scoreRepository.findAll(Sort.by(
                Sort.Order.desc("board"),
                Sort.Order.asc("moves")
        ));
    }

    public Score saveScore(Score score) {
        score.setCreatedAt(LocalDateTime.now());
        return scoreRepository.save(score);
    }
}