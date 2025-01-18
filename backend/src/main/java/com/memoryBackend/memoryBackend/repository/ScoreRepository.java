package com.memoryBackend.memoryBackend.repository;

import com.memoryBackend.memoryBackend.model.Score;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScoreRepository extends MongoRepository<Score, String> {

}
