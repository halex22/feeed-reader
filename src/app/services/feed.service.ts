import { Injectable, signal } from '@angular/core';
import { Feed, FeedSource } from '../models/feed';
import { RssReader } from '../models/rssReader';
import { RedditReader } from '../models/redditReader';

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
    
    // this.feedNews = reader!.parseInfo()

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

  fetchFeedNews(feedName: string): Promise<Feed[]> {
    const sources = this.loadFeedSources()
    const targetFeedSource = sources.find(source => source.feedName === feedName)
    if (!targetFeedSource) throw new Error('No such feed in storage')
    const reader = new RedditReader(targetFeedSource!.feedUrl)
    return reader.fetchInfo()
  }

  loadSavedNews(): Feed[] {
    const savedNews = localStorage.getItem(this.FAVORITE_NEWS)
    return JSON.parse(savedNews ?? '[]') 
  }

  saveNew(feedToSave: Feed):void {
    const prevFav = this.loadSavedNews()
    const newFav = [...prevFav, feedToSave]
    localStorage.setItem(this.FAVORITE_NEWS, JSON.stringify(newFav))
  }

  deleteFeedSource(sourceName: string) {
    this.sources = this.sources.filter( s => s.feedName !== sourceName)
  }

}
