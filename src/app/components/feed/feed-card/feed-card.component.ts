import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'li[feed-card]',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.scss'
  
})
export class FeedCardComponent {

  img = input()
  title = input.required()
  desc = input()
  
}
