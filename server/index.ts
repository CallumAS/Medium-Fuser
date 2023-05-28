import express from 'express';
import { GrabPost, GrabContent } from './medium/medium';
import cors from 'cors'
import "fake-indexeddb/auto";
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import {
    addRxPlugin,
    createRxDatabase, RxCollectionCreator, RxDatabase, RxJsonSchema
} from 'rxdb';

import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
addRxPlugin(RxDBQueryBuilderPlugin);

let db: RxDatabase;
interface Content {
    Title: string;
    Creator: {
        Name: string;
        Bio: string;
        Image: string;
        Registered: number;
    };
    Tags: string[];
    CreatedAt: number;
    Slug: string;
    Content: {
        text: string;
        type: string;
        image: string;
    }[];
}
(async () => {
    try {

        db = await createRxDatabase({
            name: 'heroesdb', // the name of the database
            storage: getRxStorageDexie()
        });

        const mySchema: RxJsonSchema<Content> = {
            title: 'heroes schema',
            description: 'Schema definition for the heroes collection',
            version: 0,
            type: 'object',
            properties: {
                Title: { type: 'string' },
                Creator: {
                    type: 'object',
                    properties: {
                        Name: { type: 'string' },
                        Bio: { type: 'string' },
                        Image: { type: 'string' },
                        Registered: { type: 'number' },
                    },
                    required: ['Name', 'Bio', 'Image', 'Registered'],
                },
                Tags: {
                    type: 'array',
                    items: { type: 'string' },
                },
                CreatedAt: { type: 'number' },
                Slug: { type: 'string' },
                Content: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            text: { type: 'string' },
                            type: { type: 'string' },
                            image: { type: 'string' },
                        },
                        required: ['text', 'type'],
                    },
                },
            },
            required: ['Title', 'Creator', 'Tags', 'CreatedAt', 'Slug', 'Content'],
            primaryKey: 'Slug',
        };

        const collectionConfig: RxCollectionCreator = {
            schema: mySchema,
        };
        // add collections
        await db.addCollections({
            heroes: collectionConfig
        });

    } catch (error) {
        console.error('Error occurred while adding collections:', error);
    }

})()



// Initialize the express engine
const app: express.Application = express();
app.use(cors());

// Take a port 3000 for running server.
const port: number = 3003;

// Handling '/' Request
app.get('/', async (req, res) => {
    const name = req.query.name as string;
    var page = ""
    var posts = []
    var active = true;
    while (active) {
        console.log(page)
        var processed = await GrabPost(page, name)
        if (processed.nextPage == null) {
            active = false
            break;
        }
        page = processed.nextPage;
        processed.posts.forEach(async post => {
            // insert a document
            try {
                await db.heroes.insert(post);
            } catch {
                active = false
            }
        })
        posts.push(processed)
    }
    res.send(posts);
});
app.get('/data', async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const data = await db.heroes.find().sort({ 'CreatedAt': 'desc' }).limit(limit).skip(offset).exec();
    res.send(data);
});

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});