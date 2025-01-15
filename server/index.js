// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const { connectDB, client } = require('./db');
const Score = require('./models/Score');
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello, MongoDB with Express!");
});

app.get('/scores', async (req, res) => {
    try {
        const db = client.db("memory-game");
        const collection = db.collection("memory-game");
        // Pobieranie wszystkich wyników z bazy
        const scores = await collection.find().sort({ createdAt: -1 }).toArray(); // Sortowanie od najnowszego wyniku
        if (scores.length === 0) {
            return res.status(200).json([]);
        }

        console.log('Scores retrieved:', scores); // Dodaj logowanie, aby sprawdzić wyniki
        res.json(scores); // Zwrócenie wyników
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error fetching scores" });
    }
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

// // eslint-disable-next-line no-undef
// const cors = require('cors');
//
// app.use(cors());
//
// app.get('/', (req, res) => {
//     res.send('Hello from our server!')
// })
//
// app.listen(3000, () => {
//     console.log('server listening on port 3000')
// })