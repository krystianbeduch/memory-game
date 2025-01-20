package com.memory.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.memory.backend.controller.ScoreController;
import com.memory.backend.exception.ScoreExceptionHandler;
import com.memory.backend.model.Score;
import com.memory.backend.service.ScoreService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Importujemy ScoreController i definujemy recznie ScoreService
@WebMvcTest(controllers = ScoreController.class)
@Import({ScoreController.class, ScoreExceptionHandler.class}) // Import kontrolera i klasy wyjatku
class ScoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // Do serializacji obiektow JSON

    @Configuration
    static class TestConfiguration {
        @Bean
        public ScoreService scoreService() {
            return mock(ScoreService.class);
        }
    }

    @Autowired
    private ScoreService scoreService;

    @Test
    void shouldReturnScoresOnGetRequest() throws Exception {
        // Mockowanie danych
        Score score1 = new Score();
        score1.setId("1");
        score1.setPlayerName("Player1");
        score1.setMoves(10);
        score1.setBoard("4x4");
        score1.setTimeTaken(100L);
        score1.setCreatedAt(LocalDateTime.now());

        Score score2 = new Score();
        score2.setId("2");
        score2.setPlayerName("Player2");
        score2.setMoves(8);
        score2.setBoard("6x6");
        score2.setTimeTaken(150L);
        score2.setCreatedAt(LocalDateTime.now());

        List<Score> mockScores = Arrays.asList(score1, score2);

        // Konfiguracja mocka
        when(scoreService.getAllScoresOrderByBoardDescAndMovesAsc())
                .thenReturn(mockScores);

        // Wywolanie zadania GET i sprawdzenie wyniku
        mockMvc.perform(get("/api/scores")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(result -> {
                    String responseContent = result.getResponse().getContentAsString();
                    System.out.println("Response Content: " + responseContent);
                })
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].playerName").value("Player1"))
                .andExpect(jsonPath("$[1].playerName").value("Player2"));

        // Weryfikacja interakcji
        verify(scoreService, times(1)).getAllScoresOrderByBoardDescAndMovesAsc();
    }

    @Test
    void shouldAddScoreOnPostRequest() throws Exception {
        // Mockowanie danych wejsciowych i wyjsciowych
        Score inputScore = new Score();
        inputScore.setPlayerName("NewPlayer");
        inputScore.setMoves(15);
        inputScore.setBoard("4x4");
        inputScore.setTimeTaken(120L);
        inputScore.setCreatedAt(LocalDateTime.now());

        Score savedScore = new Score();
        savedScore.setId("3");
        savedScore.setPlayerName("NewPlayer");
        savedScore.setMoves(15);
        savedScore.setBoard("4x4");
        savedScore.setTimeTaken(120L);
        savedScore.setCreatedAt(LocalDateTime.now());

        // Konfiguracja mocka
        when(scoreService.saveScore(any(Score.class)))
                .thenReturn(savedScore);

        // Serializacja obiektu do JSON
        String scoreJson = objectMapper.writeValueAsString(inputScore);

        // Wywolanie zadania POST i sprawdzenie wyniku
        mockMvc.perform(post("/api/scores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(scoreJson))
                .andExpect(status().isCreated())
                .andDo(result -> {
                    String responseContent = result.getResponse().getContentAsString();
                    System.out.println("Response Content: " + responseContent);
                })
                .andExpect(jsonPath("$.id").value("3"))
                .andExpect(jsonPath("$.playerName").value("NewPlayer"))
                .andExpect(jsonPath("$.moves").value(15))
                .andExpect(jsonPath("$.board").value("4x4"));

        // Weryfikacja interakcji
        verify(scoreService, times(1)).saveScore(any(Score.class));
    }

    @Test
    void shouldReturnBadRequestWhenMissingPlayerName() throws Exception {
        // Przyklad danych, gdzie brakuje wymaganych danych
        Score inputScore = new Score();
        inputScore.setId("4");
        inputScore.setPlayerName(null); // To pole jest wymagane (adnotacja @NotNull)
        inputScore.setMoves(10);
        inputScore.setBoard("4x4");
        inputScore.setTimeTaken(120L);
        inputScore.setCreatedAt(LocalDateTime.now());

        // Konfiguracja mocka
        when(scoreService.saveScore(any(Score.class)))
                .thenReturn(inputScore);

        // Serializacja obiektu do JSON
        String scoreJson = objectMapper.writeValueAsString(inputScore);

        // Wywolanie POST i sprawdzenie odpowiedzi
        mockMvc.perform(post("/api/scores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(scoreJson))
                .andExpect(status().isBadRequest())  // Oczekujemy statusu 400
                .andDo(result -> {
                    String responseContent = result.getResponse().getContentAsString();
                    System.out.println("Response Content: " + responseContent);
                })
                .andExpect(jsonPath("$.playerName").exists())
                .andExpect(jsonPath("$.playerName").value("Player name is required"));

        // Weryfikacja interakcji
        verify(scoreService, times(0)).saveScore(any(Score.class));
    }
}