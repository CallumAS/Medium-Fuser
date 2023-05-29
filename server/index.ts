import express from 'express';
import cors from 'cors'
import "fake-indexeddb/auto";
import { dbContext } from './services/databaseService'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { loadPosts, names } from './services/postService';
dotenv.config()


// Initialize the express engine
const app: express.Application = express();
app.use(cors());

// Take a port 3000 for running server.
const port: number = 3003;

// Handling '/' Request
app.get('/', async (req, res) => {
    const name = req.query.name as string;
    const apikey = req.query.key as string;
    if (apikey !== process.env.API_KEY) {
        return res.send({ "message": "invalid api key" });
    }
    if (!names.includes(name)) {
        names.push(name)
    }
    await loadPosts(name)
    res.send({ message: "Processed User and added to auto-updater" });
});
app.get('/data', async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const db = await dbContext();

    const data = await db.heroes.find().sort({ 'CreatedAt': 'desc' }).limit(limit).skip(offset).exec();
    res.send(data);
});

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});