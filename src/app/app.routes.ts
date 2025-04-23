import { Routes } from '@angular/router';
import { AddFeedComponent } from './components/form/add-feed/add-feed.component';
import { FavComponent } from './components/fav/fav.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component: listfeedComponent
  // },
  {
    path: 'add',
    component: AddFeedComponent,
  },


  {
    path: 'favorites',
    component: FavComponent,
  }

];
