package com.memory.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class MemoryBackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("spring.data.mongodb.uri", Objects.requireNonNull(dotenv.get("MONGODB_URI")));
//		System.setProperty("spring.data.mongodb.uri", dotenv.get("MONGODB_PASSWORD"));
//		System.setProperty("spring.data.mongodb.uri", dotenv.get("MONGODB_CLUSTER_NAME"));
		System.setProperty("spring.data.mongodb.database", Objects.requireNonNull(dotenv.get("MONGODB_DBNAME")));

		SpringApplication.run(MemoryBackendApplication.class, args);
	}
}