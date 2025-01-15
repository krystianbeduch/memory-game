//
// // eslint-disable-next-line no-undef
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://krystianbeduch:nqGeO807PWrOblFj@memory-game.dtuib.mongodb.net/?retryWrites=true&w=majority&appName=memory-game";
//
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
//
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
// //         // Ensures that the client will close when you finish/error
// //         await client.close();
// //     }
// // }
// // run().catch(console.dir);
//
// // db.js
// // eslint-disable-next-line no-undef
// const mongoose = require('mongoose');
//
// // Funkcja łącząca z bazą MongoDB
// const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://krystianbeduch:nqGeO807PWrOblFj@memory-game.dtuib.mongodb.net/?retryWrites=true&w=majority&appName=memory-game', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB Connected...');
//     } catch (err) {
//         console.error(err.message);
//         // eslint-disable-next-line no-undef
//         process.exit(1);
//     }
// };
//
// // eslint-disable-next-line no-undef
// module.exports = connectDB;

const mongoose = require('mongoose');
// require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://krystianbeduch:nqGeO807PWrOblFj@memory-game.dtuib.mongodb.net/?retryWrites=true&w=majority&appName=memory-game";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
});

const connectDB = async () => {
    try {
        await client.connect();
        await client.db("memory-game").command({ping: 1});
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Zatrzymaj aplikację w przypadku błędu połączenia
    }
};

module.exports = { connectDB, client };

