import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from "./components/head/head.component";
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, RouterOutlet, HeadComponent, MatSidenavModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showFiller = false;
  title = 'feeed-reader';


  isHomeSidenavOpen = false;
  

  openSidenav() {
    this.isHomeSidenavOpen = !this.isHomeSidenavOpen
  }


  isSidebarOpen = input(false);

 }
