import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddFeedComponent } from './components/form/add-feed/add-feed.component';
import { HeadComponent } from "./components/head/head.component";
import { HomeComponent } from "./components/home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddFeedComponent, RouterOutlet, HeadComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'feeed-reader';

  
  isHomeSidenavOpen = false;

  openSidenav() {
    this.isHomeSidenavOpen = !this.isHomeSidenavOpen
  }
}
