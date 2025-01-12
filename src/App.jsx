import React, { useState } from 'react';
import './style.css';
import generateBoard from './generateBoard';

function App() {
    /*
    board - aktualny uklad planszy
    setBoard - uzywamy do zmiany planszy
    Poczatkowa wartosc generowana za pomoca funkcji generateBoard

    selectedCards - przechouje odkryte karty (max 2 na raz)
    setSelecetedCards - dodaje nowe karty do listy odkrytych

    moves - licznik ruchow gracza
    setMoves - zwiekszamy licznik ruchow przy kazdym ruchu
    */
    const [board, setBoard] = useState(generateBoard());
    const [selectedCards, setSelectedCards] = useState([]);
    const [moves, setMoves] = useState(0);

    const handleCardClick = (card) => {
        // Ignorujemy klikniecie, jesli karta juz jest sparowana
        if (card.isMatched || selectedCards.length === 2) {
            return;
        }

        /* Dodajemy karte do listy wybranych
        prev to poprzednia wartosc stanu selectedCards, spread operator rozwija elementy tablicy prev
        konstrukcja [...prev, card] tworzy nowa tablice, ktora zawiera wszystkie elemnty z prev oraz nowy element card
        */
        setSelectedCards((prev) => [...prev, card]);

        // Sprawdzamy, czy to drugi klik
        if (selectedCards.length === 1) {
            const [firstCard] = selectedCards;

            // Zwiekszamy licznik ruchw
            setMoves((prev) => prev + 1);

            // Sprawdzamy, czy karty pasuja do siebie
            if (firstCard.image === card.image) {
                /* Pasuja — oznaczamy je jako sparowane
                prev.map() przechodzi przez wszystkie elementy tablicy i zwraca nowa tablice z przeksztalconymi elementami
                Jesli warunek jest spelniony rozwijamy istniejacy obiekt karty c
                za pomoca spread operatora i nadpisujemy jego wlasciwosc isMatched na true
                */
                setBoard((prev) =>
                    prev.map((c) =>
                        c.image === card.image ? { ...c, isMatched: true } : c
                    )
                );
            }

            // Resetujemy wybrane karty po krotkim czasie
            setTimeout(() => setSelectedCards([]), 1000);
        }
    };

    /*
    div className="App" to glowna obudowa aplikacji z klasa CSS App, ktora pozowala na stylizacje
    div className="board" to kontener dla planszy gry, ktora jest zbudowana z dynamicznie renderowanych kart

    board.map() iteruje przez tablice board gdzie karta karta jest reprezentowana przez obiekt o polach {id, image, isMatched}
    dla kazdej karty tworzony jest dynamiczny element div reprezentujacy pojedynczy kafalek na planszy
    key - unikalny klucz dla kazdej karty wymagany przez React aby poprwanie zarzadzac lista elementow w DOM
    className - zawsze przypisywana jest klasa card; dodatkowo jest karta znajduje sie w selectedCard (jest odkryta)
    lub ma isMatched: true (jest dopasowana) to karta otrzymuje klase flipped, ktora pokazuje wizualnie ze jest odwrocona
    */

    return (
        <div className="App">
            <h1>Memory Game</h1>
            <p>Moves: {moves}</p>
            <div className="board">
                {board.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${selectedCards.includes(card) || card.isMatched ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className="card-front">
                            <img src={card.image} alt="technology" />
                        </div>
                        <div className="card-back">?</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
