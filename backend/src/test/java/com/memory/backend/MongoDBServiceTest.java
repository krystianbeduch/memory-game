package com.memory.backend;

import com.memory.backend.exception.MongoDBConnectionException;
import com.memory.backend.service.MongoDBService;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MongoDBServiceTest {

    @Test
    void shouldThrowExceptionWhenMongoDBConnectionFails() {
        // Mockowanie MongoTemplate
        MongoTemplate mongoTemplate = mock(MongoTemplate.class);

        // Symulowanie wyjatku polaczenia
        when(mongoTemplate.getDb())
                .thenThrow(new RuntimeException());

        MongoDBService mongoDBService = new MongoDBService(mongoTemplate);

        // Oczekujemy MongoDBConnectionException
        MongoDBConnectionException exception = assertThrows(MongoDBConnectionException.class, mongoDBService::checkConnection);

        // Sprawdzenie szczegolu wyjątku - komunikatu
        assertEquals("Failed to connect to MongoDB", exception.getMessage());
    }
}
