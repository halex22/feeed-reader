import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Feed } from '../../../models/feed';
import { FeedService } from '../../../services/feed.service';


@Component({
  selector: 'li[feed-card]',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.scss'
})
export class FeedCardComponent {

  img = input<string>('')
  title = input.required<string>()
  desc = input<string>('')

  constructor(private feedService: FeedService) {}

  addToFav() {
    const feed: Feed = {
      img :this.img(),
      title: this.title(),
      summary: this.desc()
    }

    console.log('your are trying yo add this feed', feed)
    this.feedService.saveNewToFav(feed)
    // alert('news was added to favorites')
  }
  
}
