import { Component, inject, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddFeedComponent } from "../form/add-feed/add-feed.component";
import { MatIcon } from '@angular/material/icon';
import { signal } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { FeedSource } from '../../models/feed';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatSidenavModule, AddFeedComponent, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showFiller = false;

  isSidebarOpen = input(false);
  sources: FeedSource[]
  feedService = inject(FeedService)

  constructor() {
    this.sources = this.feedService.sources
  }

}
