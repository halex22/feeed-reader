import { Component, signal } from '@angular/core';
import { Input } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { RouterModule } from '@angular/router';
import { Feed } from '../../../models/feed';
import { FeedListComponent } from '../feed-list/feed-list.component';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule, FeedListComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input() feedName!: string 

  feedNews = signal<Feed[]>([])

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    console.log(this.feedName)
    this.feedService.fetchFeedNews(this.feedName)
    .then(data => {
      console.log(data)
      this.feedNews.set(data)
    })
  }
  
}
