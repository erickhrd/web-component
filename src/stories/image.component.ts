import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import * as Images from './image.json';


@Component({
  selector: 'storybook-image',
  standalone: true,
  imports: [CommonModule],
  template: ` 
  <div *ngIf="!gallery" >
  <img
    [ngClass]="classes"
    [src]="src"
    
  >
  </div>
  <ng-container *ngIf="gallery">
    <div  *ngFor="let image of source">
      <div [ngClass]="classes">
        <img class="displayed-img" [src]="image.image" >
        <div class="overlay"></div>
      </div>

      <div class="thumb-bar">
      </div>
      </div>
      </ng-container>`,
  styleUrls: ['./image.css'],
})
export class ImageComponent {

   /**
   * What is the layout of the component?
   */
   @Input()
   layout: 'normal' | 'gallery' | 'slideshow' = 'normal';

   /**
   * What image source to use
   */
   @Input()
   src?: string[];

  public data: any = (Images as any).default;
   
  public get classes(): string[] {
   
    return [`storybook-image--${this.layout}`];
  }

}
