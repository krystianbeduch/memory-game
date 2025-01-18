package com.memory.backend.exception;

public class MongoDBConnectionException extends RuntimeException {

    public MongoDBConnectionException(String message, Throwable cause) {
        super(message, cause);
    }
}