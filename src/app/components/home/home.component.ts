import { Component, signal } from '@angular/core';
import { Feed } from '../../models/feed';
import { FeedService } from '../../services/feed.service';
import { FeedListComponent } from '../feed/feed-list/feed-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeedListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  

  feedNews = signal<Feed[]>([])

  constructor(private feedService: FeedService) {
    const sources = this.feedService.loadFeedSources()
    sources.forEach(source => {
      this.feedService.fetchFeedNews(source.feedName)
      .then(data => {
        this.feedNews.update(prev => [...prev, ...data])
      })
    })
  }

}
