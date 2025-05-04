import { Component, input, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from "./components/head/head.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FeedSource } from './models/feed';
import { FeedService } from './services/feed.service';
import { Feed } from './models/feed';
import { RedditReader } from './models/redditReader';
import { RssReader } from './models/rssReader';
import { FeedListComponent } from "./components/feed/feed-list/feed-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, HeadComponent, MatSidenavModule, MatIcon, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showFiller = false;
  title = 'feeed-reader';

  selectFeed = signal<FeedSource|  null>(null)


  isHomeSidenavOpen = false;

  feedSources: FeedSource[]

  feedNews = signal<Feed[]>([])
  

  constructor(private feedService: FeedService) {
    this.feedSources = this.feedService.loadFeedSources()
    if (!this.selectFeed()) {
      // prendere tutti le news di tutti i feed
    } else {
      // prendere le news del feed scelto
      const feedUrl = this.selectFeed()!.feedUrl
      let reader
      if (this.selectFeed()?.type === 'reddit') {
        reader = new RedditReader(feedUrl)
      } else {
        reader = new RssReader(feedUrl)
      }
      // this.feedNews.set(reader.parseInfo())
    }
  }
  
  

  openSidenav() {
    this.isHomeSidenavOpen = !this.isHomeSidenavOpen
  }


  isSidebarOpen = input(false);

  loadFeedNames() {
    
  }

 }
