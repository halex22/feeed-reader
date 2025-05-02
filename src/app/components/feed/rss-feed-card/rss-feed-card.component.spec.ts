import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedCardComponent } from './rss-feed-card.component';

describe('RssFeedCardComponent', () => {
  let component: RssFeedCardComponent;
  let fixture: ComponentFixture<RssFeedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RssFeedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RssFeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
