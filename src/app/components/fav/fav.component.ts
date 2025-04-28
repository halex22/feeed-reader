import { Component } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Feed } from '../../models/feed';
import { signal } from '@angular/core';
import { FeedListComponent } from '../feed/feed-list/feed-list.component';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [FeedListComponent],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.scss'
})
export class FavComponent {

  feedNews = signal<Feed[]>([])

  constructor (private feedService: FeedService) {
    this.feedNews.set(this.feedService.loadSavedNews())
  }
}
