import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { FeedService } from '../../../services/feed.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input() feedName!: string 

  constructor(private feedService: FeedService, private route: ActivatedRoute ) {
    this.route.params.subscribe(params => {
      this.feedName = params['feedName'];
      this.feedService.fetchFeedNews(this.feedName)
    .then(data => console.log(data)) // questo metodo ti torna una promesa con le news poi vanno messe in un attr della classe per essere usati nel HTML
  });

  // questo deve essere il nome del parametro della ruta dinamica
  // {
  //   path: 'feed/:feedName',
  //   component: DetailComponent
   }
}
