export interface Content {
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