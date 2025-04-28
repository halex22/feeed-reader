import { Component, input } from '@angular/core';
import { FeedCardComponent } from "../feed-card/feed-card.component";
import { Feed } from '../../../models/feed';

@Component({
  selector: 'ul[feed-list]',
  standalone: true,
  imports: [FeedCardComponent],
  templateUrl: './feed-list.component.html',
  styleUrl: './feed-list.component.scss'
})
export class FeedListComponent {

  feedNews = input<Feed[]>()

}
