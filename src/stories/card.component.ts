import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import * as Data from './card-data.json';

@Component({
  selector: 'storybook-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: ` 
  <div class="storybook-card" *ngFor="let data of item; let i = index">
    <div class="storybook-card--img-container">
      <img [src]="data.image">
    </div>
    <div class="storybook-card--text-container">
      <p style="font-style: italic;">{{data.caption}}</p>
      <h3>{{data.title}}</h3>
      <p>{{isDescriptionExpanded[i] ? data.description : (data.description | slice:0:300) + '...'}}</p>
    </div>
    <div class="storybook-card--buttons">
      <storybook-button
        size="small"
        [primary]="true"
        (onClick)="togglePopover(i)"
        label="Share"
      ></storybook-button>
      <storybook-button
        size="small"
        [primary]="true"
        (onClick)="toggleDescription(i)"
        label="{{isDescriptionExpanded[i] ? 'Less' : 'More'}}"
      ></storybook-button>
    </div>
    <div *ngIf="isPopoverVisible[i]" class="popover">
      <button class="popover-close" (click)="closePopover(i)">X</button>
      <div class="social-share">
        <ul>
          <li><a href="http://www.twitter.com/share?url=http://www.google.com/" target="_blank"><i class="fa fa-twitter"></i><span> Share on Twitter</span></a></li>
          <li><a href="https://www.facebook.com/sharer/sharer.php?u=http://www.google.com/" target="_blank"><i class="fa fa-facebook"></i><span> Share on Facebook</span></a></li>
          <li><a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.google.com/" target="_blank"><i class="fa fa-envelope"></i><span> Share by Email</span></a></li>
        </ul>
      </div>
    </div>
  </div>`,
  styleUrls: ['./card.css'],
})
export class CardComponent {
  @Output() onShare = new EventEmitter<Event>();
  @Output() onMore = new EventEmitter<Event>();

  public item: any = (Data as any).default;
  public isPopoverVisible: boolean[] = [];
  public isDescriptionExpanded: boolean[] = [];

  togglePopover(index: number) {
    this.isPopoverVisible[index] = !this.isPopoverVisible[index];
  }

  closePopover(index: number) {
    this.isPopoverVisible[index] = false;
  }

  toggleDescription(index: number) {
    this.isDescriptionExpanded[index] = !this.isDescriptionExpanded[index];
  }
}