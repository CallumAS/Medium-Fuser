import { GrabPost } from './mediumCrawlingService';
import { dbContext } from './databaseService'

export let names: string[] = []

export function updatePosts() {
    console.log("updating posts...")
    names.forEach(async name => {
        console.log(name)
        await loadPosts(name)
    });
}

setInterval(updatePosts, 60 * 60 * 1000);


export async function loadPosts(name: string) {
    const db = await dbContext()
    let page = ""
    const posts = []
    let active = true;
    while (active) {
        console.log(page)
        const processed = await GrabPost(page, name)
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
}
