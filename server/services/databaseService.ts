import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import {
    addRxPlugin,
    createRxDatabase, RxCollectionCreator, RxDatabase, RxJsonSchema
} from 'rxdb';
import { Content } from '../content'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
addRxPlugin(RxDBQueryBuilderPlugin);

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

let _dbContext: RxDatabase | undefined;
export const dbContext = async (): Promise<RxDatabase> => {
    if (!_dbContext) _dbContext = await createDbContext()
    return _dbContext
}

async function createDbContext(): Promise<RxDatabase> {
    const db = await createRxDatabase({
        name: 'heroesdb', // the name of the database
        storage: getRxStorageDexie()
    });

    // add collections
    await db.addCollections({
        heroes: collectionConfig
    });
    return db
} 
