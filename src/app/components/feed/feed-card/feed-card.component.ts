import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-feed-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed-card.component.html',
  styleUrl: './feed-card.component.scss'
  
})
export class FeedCardComponent {
  redditData = {
    kind: "Listing",
    data: {
      modhash: "",
      dist: 3,
      children: [
        {
          kind: "t3",
          data: {
            title: "Supreme Court rules in favor of free speech in landmark case",
            url: "https://www.reddit.com/r/news/comments/abc123/supreme_court_rules_in_favor_of_free_speech/",
            author: "newsuser1",
            score: 12345,
            created_utc: 1682345678,
            permalink: "/r/news/comments/abc123/supreme_court_rules_in_favor_of_free_speech/",
            num_comments: 456
          }
        },
        {
          kind: "t3",
          data: {
            title: "New study reveals climate change impact on coastal cities",
            url: "https://www.reddit.com/r/news/comments/def456/new_study_reveals_climate_change_impact/",
            author: "newsuser2",
            score: 9876,
            created_utc: 1682348901,
            permalink: "/r/news/comments/def456/new_study_reveals_climate_change_impact/",
            num_comments: 321
          }
        },
        {
          kind: "t3",
          data: {
            title: "Tech company announces breakthrough in AI technology",
            url: "https://www.reddit.com/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            author: "newsuser3",
            score: 8765,
            created_utc: 1682351234,
            permalink: "/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            num_comments: 210
          }
        },
        {
          kind: "t3",
          data: {
            title: "Tech company announces breakthrough in AI technology",
            url: "https://www.reddit.com/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            author: "newsuser3",
            score: 8765,
            created_utc: 1682351234,
            permalink: "/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            num_comments: 210
          }
        },
        {
          kind: "t3",
          data: {
            title: "Tech company announces breakthrough in AI technology",
            url: "https://www.reddit.com/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            author: "newsuser3",
            score: 8765,
            created_utc: 1682351234,
            permalink: "/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            num_comments: 210
          }
        },
        {
          kind: "t3",
          data: {
            title: "Tech company announces breakthrough in AI technology",
            url: "https://www.reddit.com/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            author: "newsuser3",
            score: 8765,
            created_utc: 1682351234,
            permalink: "/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            num_comments: 210
          }
        },
        {
          kind: "t3",
          data: {
            title: "Tech company announces breakthrough in AI technology",
            url: "https://www.reddit.com/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            author: "newsuser3",
            score: 8765,
            created_utc: 1682351234,
            permalink: "/r/news/comments/ghi789/tech_company_announces_ai_breakthrough/",
            num_comments: 210
          }
        }
      ],
      after: "t3_ghi789",
      before: null
    }
  };
}
