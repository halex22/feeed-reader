import { Injectable } from '@angular/core';
import { Feed, FeedSource } from '../models/feed';
import { RedditReader } from '../models/redditReader';
import { RssReader } from '../models/rssReader';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  feedNews: Feed[] = []
  url: string = ''

  sources: FeedSource[] = []

  private readonly SOURCES_KEY = 'feedSources'
  private readonly FAVORITE_NEWS = 'favNews'


  constructor() { 
    const sources = localStorage.getItem(this.SOURCES_KEY)
    if (sources) {
      this.sources = JSON.parse(sources)
    }
   }

  loadNews(source: FeedSource) {
    // se la fonte e reddit 
    let reader;
    if (source.type === 'reddit') {
      reader = new RedditReader(source.feedUrl)
    } else {
      reader = new RssReader(source.feedUrl)
    }
    
    this.feedNews = reader!.parseInfo()

  }

  addFeedSource(source: FeedSource) {
    const newSources = [...this.loadFeedSources(), source]
    localStorage.setItem(this.SOURCES_KEY, JSON.stringify(newSources))
  }

  loadFeedSources(): FeedSource[] {
    const sources = localStorage.getItem(this.SOURCES_KEY)
    const savedSourcesArray = JSON.parse(sources ?? '[]')
    return savedSourcesArray
  }


}
