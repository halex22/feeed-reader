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

  private readonly SOURCES_KEY = ''
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


}
