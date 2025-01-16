package com.memoryBackend.memoryBackend.repository;

import com.memoryBackend.memoryBackend.model.Score;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ScoreRepository extends MongoRepository<Score, String> {
//    @Query("{db.collection.find().sort({ \"Board\": -1, \"Moves\": -1 }).limit(10)}")
    List<Score> findAllBy();

}
