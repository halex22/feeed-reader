import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { RedditResponse } from '../../../models/redditResponse';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input() feedName!: string 

  constructor(private feedService: FeedService) {
   
  }

  ngOnInit() {
    console.log(this.feedName)
    this.feedService.fetchFeedNews(this.feedName)
    .then(data => {
      console.log(data)
    })
  }
  
}
