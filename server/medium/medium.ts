import { MainContent } from "./models"
import initCycleTLS from 'cycletls';
import fs from 'fs';
import { PostInfo } from "./post";
import { stringify } from "querystring";
const bodyFilePath = 'body.json'; // Replace with the actual file path
let bodyContent = "";
(async () => {
    bodyContent = await fs.readFileSync(bodyFilePath, 'utf-8');
})()

let cycleTLS: any;
(async () => {
    cycleTLS = await initCycleTLS();
})()


const bodyPostFilePath = 'posts.json'; // Replace with the actual file path
let bodyPostContent = "";
(async () => {
    bodyPostContent = await fs.readFileSync(bodyPostFilePath, 'utf-8');
})()



type Nullable<T> = T | null;

export interface Posts {
    nextPage: string | null
    posts: Post[]
}

export interface Post {
    Title: string
    Creator: Creator
    Tags: string[]
    CreatedAt: number
    Slug: string
}

export interface Creator {
    Name: string
    Bio: string
    Image: string
    Registered: number
}


export const GrabContent = async (postId: string = "ebae41d3b5cb"): Promise<any> => {
    // Read the body from a file
    // Send request
    const postData = bodyPostContent.replace("[POSTID]", postId)


    const response = await cycleTLS('https://medium.com/_/graphql', {
        body: postData,
        ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
        userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0',
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Graphql-Operation": "UserProfileQuery",
            "Medium-Frontend-Route": "profile",
            "Origin": "https://medium.com",
            "Ot-Tracer-Sampled": "true",
            "Pragma": "no-cache",
            "Sec-Ch-Ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"macOS\"",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        }
    }, 'post');
    // Cleanly exit CycleTLS
    //cycleTLS.exit();
    var content = response.body as PostInfo;
    return content[0].data.postResult.content.bodyModel.paragraphs.map(x => ({ text: x.text, type: x.type, image: x.metadata != null ? x.metadata?.id : "" }));

}

export const GrabPost = async (page: string = "", name: string = ""): Promise<Posts> => {
    let postData = bodyContent.replace("[PAGE]", page)
    postData = postData.replace("[USERNAME]", name)
    console.log(name)
    // Read the body from a file
    // Send request
    const response = await cycleTLS('https://medium.com/_/graphql', {
        body: postData,
        ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
        userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0',
        headers: {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "Graphql-Operation": "UserProfileQuery",
            "Medium-Frontend-Route": "profile",
            "Origin": "https://medium.com",
            "Ot-Tracer-Sampled": "true",
            "Pragma": "no-cache",
            "Sec-Ch-Ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "\"macOS\"",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        }
    }, 'post');

    // Cleanly exit CycleTLS
    //cycleTLS.exit();
    const content: string | { [key: string]: any } = response.body;
    console.log(content)
    const json = content as MainContent
    console.log(json[0].data.userResult.homepagePostsConnection)
    return {
        nextPage: json[0].data.userResult.homepagePostsConnection.pagingInfo.next !== null
            ? json[0].data.userResult.homepagePostsConnection.pagingInfo.next.from
            : null,
        posts: await Promise.all(
            json[0].data.userResult.homepagePostsConnection.posts.map(async result => {
                return {
                    Title: result.title,
                    Creator: {
                        Name: result.creator.name,
                        Bio: result.creator.bio,
                        Image: result.creator.imageId,
                        Registered: result.creator.mediumMemberAt,
                    },
                    Tags: result.tags.map(x => x.displayTitle),
                    CreatedAt: result.firstPublishedAt,
                    Slug: result.uniqueSlug,
                    Content: await GrabContent(result.uniqueSlug.split("-").pop()),
                };
            })
        ),
    };
}
