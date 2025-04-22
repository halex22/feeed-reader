import { Component, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddFeedComponent } from "../form/add-feed/add-feed.component";
import { MatIcon } from '@angular/material/icon';


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
}
