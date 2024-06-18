import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ImageComponent } from './image.component';
import * as Data from './card-data.json';

@Component({
  selector: 'storybook-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ImageComponent],
  template: `
  <div [ngClass]="direction">
  <div [ngClass]="getClasses(i)" *ngFor="let data of item; let i = index">
    <div class="storybook-card--img-container" [ngClass]="imgContainer" >
      <storybook-image class="img" [src]="data.image"></storybook-image>
      <p style="font-style: italic;">{{data.caption}}</p>
    </div>
    
    <div class="storybook-card--text-container" [ngClass]="textContainer">
      <h3>{{data.title}}</h3>
      <p>{{isDescriptionExpanded[i] ? data.description : (data.description | slice:0:300) + '...'}}</p>
      <div class="storybook-card--button-wrapper">
      <storybook-button
        size="small"
        [primary]="true"
        popovertarget="popover-{{i}}"
        label="Share"
      ></storybook-button>
      <storybook-button
        size="small"
        [primary]="true"
        (onClick)="toggleDescription(i)"
        label="{{isDescriptionExpanded[i] ? 'Less' : 'More'}}"
      ></storybook-button>
        <div id="popover-{{i}}" popover></div>
          <div class="storybook-card--share-menu">
          <div class="storybook-card--social-share">
            <ul>
              <li><a href="http://www.twitter.com/share?url=http://www.google.com/" target="_blank"><i class="fa fa-twitter"></i><span> Share on Twitter</span></a></li>
              <li><a href="https://www.facebook.com/sharer/sharer.php?u=http://www.google.com/" target="_blank"><i class="fa fa-facebook"></i><span> Share on Facebook</span></a></li>
              <li><a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.google.com/" target="_blank"><i class="fa fa-envelope"></i><span> Share by Email</span></a></li>
            </ul>
          </div>
        </div>
    </div>
    </div>
  </div>
  </div>`,
  styleUrls: ['./card.css'],
})
export class CardComponent {
  /**
   * Direction of the component
   */
  @Input()
  horizontal = false;
  
  /**
   * Import and use data from JSON file
   */
  public item: any = (Data as any).default;

  /**
   * Initialized boolean for the expansion of the description
   */
  public isDescriptionExpanded: boolean[] = [];

  /**
   * Toggle description using the "More" button taking the index of the item
   */
  toggleDescription(index: number){
    this.isDescriptionExpanded[index] = !this.isDescriptionExpanded[index];
  }

  public get classes(): string[] {
    const mode = this.horizontal ? 'storybook-card--horizontal' : 'storybook-card--vertical';
    return [mode];
  }

  public get direction(): string[] {
    const mode = this.horizontal ? 'storybook-card--container-horizontal' : 'storybook-card--container-vertical';

    return [mode];
  }

  public get imgContainer(): string[] {
    const mode = this.horizontal ? 'storybook-card--img-container-horizontal' : '';

    return [mode];
  }

  public get textContainer(): string[] {
    const mode = this.horizontal ? 'storybook-card--text-container-horizontal' : '';

    return [mode];
  }

   /**
   * Push another class when description is expanded taking the index of the item
   */
  public getClasses(index: number): string[] {
    const baseClasses = this.classes;
    if (this.isDescriptionExpanded[index]){
      baseClasses.push('storybook-card--vertical-expanded');
    }
    return baseClasses;
  }
}