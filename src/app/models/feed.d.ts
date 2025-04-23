export interface Feed {
  img: string
  title: string
  summary: string
}

export interface FeedSource {
  feedName: string
  feedUrl: string
  type: 'reddit' | 'rss' 
}

