import { Injectable, Signal, signal } from '@angular/core';
import { Feed, FeedSource } from '../models/feed';
import { RssReader } from '../models/rssReader';
import { RedditReader } from '../models/redditReader';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  feedNews: Feed[] = [];
  url: string = '';

  sources = signal<FeedSource[]>([]);
  favNews = signal<Feed[]>([])

  private readonly SOURCES_KEY = 'feedSources';
  private readonly FAVORITE_NEWS = 'favNews';

  constructor() {

    const sources = localStorage.getItem(this.SOURCES_KEY);
    if (sources) this.sources.set(JSON.parse(sources))

    const favNews = localStorage.getItem(this.FAVORITE_NEWS)
    if (favNews) this.favNews.set(JSON.parse(favNews))
  }

  loadNews(source: FeedSource) {
    // se la fonte e reddit
    let reader;
    if (source.type === 'reddit') {
      reader = new RedditReader(source.feedUrl);
    } else {
      reader = new RssReader(source.feedUrl);
    }

    // this.feedNews = reader!.parseInfo()
  }  

/**
 * The addFeedSource function adds a new feed source to the existing list of sources and updates the
 * stored sources.
 * @param {FeedSource} source - The `source` parameter in the `addFeedSource` function is of type
 * `FeedSource`. It is the feed source that you want to add to the list of sources.
 */
  addFeedSource(source: FeedSource) {
    this.sources.update(prev => [...prev, source])
    this.updateStoredSources();
  }

/**
 * The function `updateStoredSources` saves the sources data to localStorage in JSON format.
 */
  updateStoredSources(): void {
    localStorage.setItem(this.SOURCES_KEY, JSON.stringify(this.sources()))
  }

  loadFeedSources(): FeedSource[] {
    const sources = localStorage.getItem(this.SOURCES_KEY);
    const savedSourcesArray = JSON.parse(sources ?? '[]');
    return savedSourcesArray;
  }

  fetchFeedNews(feedName: string): Promise<Feed[]> {
    const sources = this.loadFeedSources();
    const targetFeedSource = sources.find(
      (source) => source.feedName === feedName
    );
    if (!targetFeedSource) throw new Error('No such feed in storage');
    const reader = new RedditReader(targetFeedSource!.feedUrl);
    return reader.fetchInfo();
  }

  loadSavedNews(): Feed[] {
    const savedNews = localStorage.getItem(this.FAVORITE_NEWS);
    return JSON.parse(savedNews ?? '[]');
  }

  saveNewToFav(feedToSave: Feed): void {
    this.favNews.update(prev => [...prev, feedToSave] )
    this.updateFavoritesNews()
  }


  /**
   * The function `updateFavoritesNews` saves the favorite news items to the local storage as a JSON
   * string.
   */
  updateFavoritesNews(): void {
    localStorage.setItem(this.FAVORITE_NEWS, JSON.stringify(this.favNews()))
  }

  /**
   * The function `deleteFeedSource` removes a feed source with a specific name from a list of sources.
   * @param {string} sourceName - The `sourceName` parameter in the `deleteFeedSource` function is a
   * string that represents the name of the feed source that you want to delete from the list of
   * sources.
   */
  deleteFeedSource(sourceName: string) {
    this.sources.update((prev) =>
      prev.filter((source) => source.feedName !== sourceName)
    );
    this.updateStoredSources()
  }
}
