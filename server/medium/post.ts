export type PostInfo = Root2[]

export interface Root2 {
    data: Data
}

export interface Data {
    postResult: PostResult
}

export interface PostResult {
    __typename: string
    id: string
    collection: Collection
    content: Content
    creator: Creator2
    inResponseToEntityType: any
    isLocked: boolean
    isMarkedPaywallOnly: boolean
    lockedSource: string
    mediumUrl: string
    primaryTopic: PrimaryTopic
    topics: Topic[]
    isPublished: boolean
    latestPublishedVersion: string
    visibility: string
    postResponses: PostResponses
    allowResponses: boolean
    isLimitedState: boolean
    voterCount: number
    recommenders: any[]
    title: string
    isSeries: boolean
    sequence: any
    uniqueSlug: string
    clapCount: number
    socialTitle: string
    socialDek: string
    noIndex: any
    canonicalUrl: string
    metaDescription: string
    latestPublishedAt: number
    readingTime: number
    previewContent: PreviewContent
    previewImage: PreviewImage
    isShortform: boolean
    seoTitle: string
    firstPublishedAt: number
    updatedAt: number
    shortformType: string
    seoDescription: string
    curationStatus: string
    isIndexable: boolean
    isSuspended: boolean
    license: string
    tags: Tag[]
    pendingCollection: any
    statusForCollection: string
    layerCake: number
}

export interface Collection {
    id: string
    googleAnalyticsId: any
    editors: Editor[]
    name: string
    avatar: Avatar
    domain: any
    slug: string
    __typename: string
    description: string
    subscriberCount: number
    viewerEdge: ViewerEdge
    twitterUsername: string
    facebookPageId: any
    logo: Logo
    customDomainState: any
    creator: Creator
    ptsQualifiedAt: number
}

export interface Editor {
    user: User
    __typename: string
}

export interface User {
    id: string
    __typename: string
}

export interface Avatar {
    id: string
    __typename: string
}

export interface ViewerEdge {
    id: string
    isEditor: boolean
    __typename: string
}

export interface Logo {
    id: string
    originalWidth: number
    originalHeight: number
    __typename: string
}

export interface Creator {
    atsQualifiedAt: number
    __typename: string
    id: string
}

export interface Content {
    isLockedPreviewOnly: boolean
    __typename: string
    bodyModel: BodyModel
    validatedShareKey: string
}

export interface BodyModel {
    sections: Section[]
    paragraphs: Paragraph[]
    __typename: string
}

export interface Section {
    name: string
    startIndex: number
    textLayout: any
    imageLayout: any
    backgroundImage: any
    videoLayout: any
    backgroundVideo: any
    __typename: string
}

export interface Paragraph {
    id: string
    name: string
    type: string
    href: any
    layout?: string
    metadata?: Metadata
    text: string
    hasDropCap: any
    dropCapImage: any
    markups: Markup[]
    __typename: string
    codeBlockMetadata?: CodeBlockMetadata
    iframe: any
    mixtapeMetadata?: MixtapeMetadata
}

export interface Metadata {
    id: string
    originalHeight: number
    originalWidth: number
    focusPercentX: any
    focusPercentY: any
    alt: any
    __typename: string
}

export interface Markup {
    type: string
    start: number
    end: number
    href?: string
    anchorType?: string
    userId: any
    linkMetadata: any
    __typename: string
}

export interface CodeBlockMetadata {
    mode: string
    lang: string
    __typename: string
}

export interface MixtapeMetadata {
    href: string
    mediaResource: MediaResource
    __typename: string
    thumbnailImageId: string
}

export interface MediaResource {
    mediumCatalog: any
    __typename: string
    thumbnailImageId: string
}

export interface Creator2 {
    id: string
    linkedAccounts: LinkedAccounts
    __typename: string
    isSuspended: boolean
    imageId: string
    mediumMemberAt: number
    verifications: Verifications
    name: string
    socialStats: SocialStats
    username: string
    customDomainState: any
    hasSubdomain: boolean
    bio: string
    isPartnerProgramEnrolled: boolean
    viewerEdge: ViewerEdge2
    viewerIsUser: boolean
    newsletterV3: any
    postSubscribeMembershipUpsellShownAt: number
    allowNotes: boolean
    twitterScreenName: string
    atsQualifiedAt: number
}

export interface LinkedAccounts {
    mastodon: any
    __typename: string
    id: string
}

export interface Verifications {
    isBookAuthor: boolean
    __typename: string
}

export interface SocialStats {
    followerCount: number
    __typename: string
}

export interface ViewerEdge2 {
    id: string
    isFollowing: boolean
    isUser: boolean
    __typename: string
}

export interface PrimaryTopic {
    slug: string
    __typename: string
    id: string
    name: string
}

export interface Topic {
    slug: string
    __typename: string
}

export interface PostResponses {
    count: number
    __typename: string
}

export interface PreviewContent {
    subtitle: string
    __typename: string
}

export interface PreviewImage {
    id: string
    alt: any
    focusPercentX: any
    focusPercentY: any
    originalHeight: number
    originalWidth: number
    __typename: string
}

export interface Tag {
    __typename: string
    id: string
    displayTitle: string
    normalizedTagSlug: string
}
