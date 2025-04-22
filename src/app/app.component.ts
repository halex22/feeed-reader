import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddFeedComponent } from './components/form/add-feed/add-feed.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddFeedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'feeed-reader';
}
