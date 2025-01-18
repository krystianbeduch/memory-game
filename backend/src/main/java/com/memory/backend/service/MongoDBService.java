package com.memory.backend.service;

import com.memory.backend.exception.MongoDBConnectionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class MongoDBService {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public MongoDBService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void checkConnection() {
        try {
            mongoTemplate.getDb().getName();
        }
        catch (Exception e) {
            throw new MongoDBConnectionException("Failed to connect to MongoDB", e);
        }
    }
}