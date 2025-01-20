// interface Card {
//     id: number;
//     image: string;
//     isMatched: boolean;
//     isFlipped: boolean;
// }
import { CardProps } from '../types/types';
import Card from "../components/Card";

const generateBoard = (rows: number, cols: number): CardProps[] => {
    const images = [
        '/images/memory-cards/assembler_logo.png',
        '/images/memory-cards/c_logo.png',
        '/images/memory-cards/cpp_logo.png',
        '/images/memory-cards/csharp_logo.png',
        '/images/memory-cards/css_logo.png',
        '/images/memory-cards/html_logo.png',
        '/images/memory-cards/java_logo.png',
        '/images/memory-cards/javascript_logo.png',
        '/images/memory-cards/kotlin_logo.png',
        '/images/memory-cards/php_logo.png',

        '/images/memory-cards/ruby_logo.png',
        '/images/memory-cards/sql_logo.png',
        '/images/memory-cards/swift_logo.png',
        '/images/memory-cards/typescript_logo.png',
        '/images/memory-cards/spring_logo.png',
        '/images/memory-cards/react_logo.png',
        '/images/memory-cards/angular_logo.png',
        '/images/memory-cards/vue_logo.png',
        '/images/memory-cards/golang_logo.png',
        '/images/memory-cards/fsharp_logo.png',

        '/images/memory-cards/r_logo.png',
        '/images/memory-cards/perl_logo.png',
        '/images/memory-cards/dart_logo.png',
        '/images/memory-cards/lua_logo.png',
        '/images/memory-cards/django_logo.png',
        '/images/memory-cards/nodejs_logo.png',
        '/images/memory-cards/ruby_on_rails_logo.png',
        '/images/memory-cards/laravel_logo.png',
        '/images/memory-cards/symfony_logo.png',
        '/images/memory-cards/asp_dot_net_core_logo.png',

        '/images/memory-cards/hibernate_logo.png',
        '/images/memory-cards/thymeleaf_logo.png'
    ];

    const totalCards = rows * cols;
    const numPairs = totalCards / 2;

    // Losowanie unikalnych obrazkow
    const selectedImages = images
        .sort(() => Math.random() - 0.5)  // Losowe wymieszanie obrazkow
        .slice(0, numPairs); // Wybierz odpowiednia liczbe unikalnych obrazkow

    // Tworzenie kart z obrazkami w parach
    const cards: CardProps[] = [];
    selectedImages.forEach((image, index) => {
        // Dodajemy dwie karty z tym samym obrazkiem (para)
        cards.push({ id: index * 2, image, isFlipped: false, isMatched: false });
        cards.push({ id: index * 2 + 1, image, isFlipped: false, isMatched: false });
    });

    return shuffle(cards);
};

// Funkcja do tasowania kart (shuffle)
const shuffle = (array: CardProps[]): CardProps[] => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export default generateBoard;