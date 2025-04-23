import { Routes } from '@angular/router';
import { AddFeedComponent } from './components/form/add-feed/add-feed.component';
import { FavComponent } from './components/fav/fav.component';
import { FeedListComponent } from './components/feed/feed-list/feed-list.component';

export const routes: Routes = [
  {
    path: '',
    component: FeedListComponent
  },
  {
    path: 'add',
    component: AddFeedComponent,
  },
  {
    path: 'favorites',
    component: FavComponent,
  }

];
