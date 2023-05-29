
export type MainContent = Root2[];

export interface Root2 {
    data: Data
}

export interface Data {
    userResult: UserResult
}

export interface UserResult {
    __typename: string
    id: string
    name: string
    viewerIsUser: boolean
    viewerEdge: ViewerEdge
    homePostsPublished: HomePostsPublished
    username: string
    hasSubdomain: boolean
    customDomainState: any
    linkedAccounts: LinkedAccounts
    customStyleSheet: CustomStyleSheet
    imageId: string
    mediumMemberAt: number
    verifications: Verifications
    socialStats: SocialStats
    isPartnerProgramEnrolled: boolean
    newsletterV3: NewsletterV3
    postSubscribeMembershipUpsellShownAt: number
    homepagePostsConnection: HomepagePostsConnection
    bio: string
    twitterScreenName: string
    navItems: NavItem[]
    isSuspended: boolean
    authoredBooks: AuthoredBook[]
    referredMembershipCustomHeadline: string
    referredMembershipCustomBody: string
}

export interface ViewerEdge {
    id: string
    isFollowing: boolean
    __typename: string
    isUser: boolean
}

export interface HomePostsPublished {
    posts: Post[]
    __typename: string
}

export interface Post {
    id: string
    __typename: string
}

export interface LinkedAccounts {
    mastodon: Mastodon
    __typename: string
    id: string
}

export interface Mastodon {
    username: string
    __typename: string
    id: string
}

export interface CustomStyleSheet {
    id: string
    global: Global
    header: Header
    __typename: string
    navigation: any
}

export interface Global {
    colorPalette: any
    __typename: string
    fonts: Fonts
}

export interface Fonts {
    font1: Font1
    font2: Font2
    font3: Font3
    __typename: string
}

export interface Font1 {
    name: string
    __typename: string
}

export interface Font2 {
    name: string
    __typename: string
}

export interface Font3 {
    name: string
    __typename: string
}

export interface Header {
    headerScale: string
    backgroundImageDisplayMode: string
    backgroundImageVerticalAlignment: string
    backgroundColorDisplayMode: string
    backgroundColor: BackgroundColor
    secondaryBackgroundColor: any
    postBackgroundColor: any
    backgroundImage: BackgroundImage
    __typename: string
    logoImage: any
    appNameColor: any
    appNameTreatment: string
    nameTreatment: string
}

export interface BackgroundColor {
    alpha: string
    rgb: string
    __typename: string
}

export interface BackgroundImage {
    id: string
    originalWidth: number
    __typename: string
}

export interface Verifications {
    isBookAuthor: boolean
    __typename: string
}

export interface SocialStats {
    followerCount: number
    __typename: string
    followingCount: number
}

export interface NewsletterV3 {
    id: string
    type: string
    slug: string
    name: string
    collection: any
    user: User
    __typename: string
    description: string
    promoHeadline: string
    promoBody: string
    showPromo: boolean
}

export interface User {
    id: string
    name: string
    username: string
    newsletterV3: NewsletterV32
    __typename: string
}

export interface NewsletterV32 {
    id: string
    __typename: string
}

export interface HomepagePostsConnection {
    posts: Post2[]
    pagingInfo: PagingInfo
    __typename: string
}

export interface Post2 {
    inResponseToPostResult: any
    id: string
    postResponses: PostResponses
    collection?: Collection
    creator: Creator
    __typename: string
    mediumUrl: string
    extendedPreviewContent: ExtendedPreviewContent
    firstPublishedAt: number
    isLocked: boolean
    isSeries: boolean
    latestPublishedAt: number
    inResponseToCatalogResult: any
    pinnedAt: number
    pinnedByCreatorAt: number
    previewImage: PreviewImage
    readingTime: number
    sequence: any
    title: string
    uniqueSlug: string
    visibility: string
    pendingCollection: any
    statusForCollection?: string
    isPublished: boolean
    allowResponses: boolean
    isLimitedState: boolean
    voterCount: number
    recommenders: any[]
    clapCount: number
    inResponseToEntityType: any
    tags: Tag[]
}

export interface PostResponses {
    count: number
    __typename: string
}

export interface Collection {
    id: string
    viewerEdge: ViewerEdge2
    __typename: string
    name: string
    domain: any
    slug: string
}

export interface ViewerEdge2 {
    id: string
    isEditor: boolean
    __typename: string
}

export interface Creator {
    id: string
    __typename: string
    verifications: Verifications2
    name: string
    username: string
    mediumMemberAt: number
    socialStats: SocialStats2
    customDomainState: any
    hasSubdomain: boolean
    bio: string
    imageId: string
}

export interface Verifications2 {
    isBookAuthor: boolean
    __typename: string
}

export interface SocialStats2 {
    followerCount: number
    __typename: string
}

export interface ExtendedPreviewContent {
    bodyModel: BodyModel
    isFullContent: boolean
    __typename: string
    subtitle: string
}

export interface BodyModel {
    sections: Section[]
    paragraphs: Paragraph[]
    __typename: string
}

export interface Section {
    name: string
    startIndex: number
    textLayout?: string
    imageLayout?: string
    backgroundImage: any
    videoLayout?: string
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
    hasDropCap?: boolean
    dropCapImage: any
    markups: Markup[]
    __typename: string
    codeBlockMetadata: any
    iframe?: Iframe
    mixtapeMetadata?: MixtapeMetadata
}

export interface Metadata {
    id: string
    originalHeight: number
    originalWidth: number
    focusPercentX?: number
    focusPercentY?: number
    alt?: string
    __typename: string
}

export interface Markup {
    type: string
    start: number
    end: number
    href?: string
    anchorType?: string
    userId?: string
    linkMetadata: any
    __typename: string
}

export interface Iframe {
    mediaResource: MediaResource
    __typename: string
}

export interface MediaResource {
    id: string
    iframeSrc: string
    iframeHeight: number
    iframeWidth: number
    title: string
    __typename: string
}

export interface MixtapeMetadata {
    href: string
    mediaResource: MediaResource2
    __typename: string
    thumbnailImageId: string
}

export interface MediaResource2 {
    mediumCatalog: any
    __typename: string
}

export interface PreviewImage {
    id: string
    focusPercentX: any
    focusPercentY: any
    __typename: string
}

export interface Tag {
    __typename: string
    id: string
    displayTitle: string
    normalizedTagSlug: string
}

export interface PagingInfo {
    next: Next
    __typename: string
}


export interface Next {
    from: string | null
    limit: number
    __typename: string
}

export interface NavItem {
    title: string
    __typename: string
}

export interface AuthoredBook {
    authors: Author[]
    description: string
    title: string
    links: Link[]
    publicationDate: number
    coverImageId: string
    __typename: string
}

export interface Author {
    name: string
    user: User2
    __typename: string
}

export interface User2 {
    id: string
    __typename: string
}

export interface Link {
    title: string
    url: string
    __typename: string
}





