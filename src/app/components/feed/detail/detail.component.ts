import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FeedService } from '../../../services/feed.service';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input() feedName!: string 

  constructor(private feedService: FeedService) {
    this.feedService.fetchFeedNews(this.feedName)
    .then(data => console.log(data)) // questo metodo ti torna una promesa con le news poi vanno messe in un attr della classe per essere usati nel HTML
  }
  // questo deve essere il nome del parametro della ruta dinamica
  // {
  //   path: 'feed/:feedName',
  //   component: DetailComponent
  // }
}
