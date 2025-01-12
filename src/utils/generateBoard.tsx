interface Card {
    id: number;
    image: string;
    isMatched: boolean;
    isFlipped: boolean;
}

const generateBoard = (rows: number, cols: number): Card[] => {
    const images = [
        '/images/assembler_logo.png',
        '/images/c_logo.png',
        '/images/cpp_logo.png',
        '/images/csharp_logo.png',
        '/images/css_logo.png',
        '/images/html_logo.png',
        '/images/java_logo.png',
        '/images/javascript_logo.png',
        '/images/kotlin_logo.png',
        '/images/php_logo.png',
        '/images/ruby_logo.png',
        '/images/sql_logo.png',
        '/images/swift_logo.png',
        '/images/typescript_logo.png',
        '/images/spring_logo.png',
        '/images/react_logo.png',
        '/images/angular_logo.png',
        '/images/vue_logo.png',
    ];

    const totalCards = rows * cols;
    const numPairs = totalCards / 2;

    // Losowanie unikalnych obrazkow
    const selectedImages = images
        .sort(() => Math.random() - 0.5)  // Losowe wymieszanie obrazkow
        .slice(0, numPairs); // Wybierz odpowiednia liczbe unikalnych obrazkow

    // Tworzenie kart z obrazkami w parach
    const cards: Card[] = [];
    selectedImages.forEach((image, index) => {
        // Dodajemy dwie karty z tym samym obrazkiem (para)
        cards.push({ id: index * 2, image, isFlipped: false, isMatched: false });
        cards.push({ id: index * 2 + 1, image, isFlipped: false, isMatched: false });
    });

    return shuffle(cards);
};

// Funkcja do tasowania kart (shuffle)
const shuffle = (array: Card[]): Card[] => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export default generateBoard;