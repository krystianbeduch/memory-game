const generateBoard = () => {
    const images = [
        '/images/assembler_logo.png',
        '/images/c_logo.png',
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
    ];

    const cards = [...images, ...images]
        .map((image, index) => ({id: index, image, isMatched: false}))
        .sort(() => Math.random() - 0.5);

    return cards;
};

export default generateBoard;