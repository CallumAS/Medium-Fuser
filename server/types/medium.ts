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

