package com.memoryBackend.memoryBackend.repository;

import com.memoryBackend.memoryBackend.model.Score;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ScoreRepository extends MongoRepository<Score, String> {
//    List<Score> findAll();
    List<Score> findByPlayerName(String playerName);
}
