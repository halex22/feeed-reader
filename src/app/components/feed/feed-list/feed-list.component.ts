import { Component } from '@angular/core';
import { FeedCardComponent } from "../feed-card/feed-card.component";

@Component({
  selector: 'app-feed-list',
  standalone: true,
  imports: [FeedCardComponent],
  templateUrl: './feed-list.component.html',
  styleUrl: './feed-list.component.scss'
})
export class FeedListComponent {

}
