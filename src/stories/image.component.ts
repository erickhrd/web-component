import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'storybook-image',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div *ngIf="layout === 'normal' && src && src.length > 0">
        <img [ngClass]="classes" [src]="src[0]">
      </div>

    <div *ngIf="layout === 'gallery'" [ngClass]="classes">
      <div class="storybook-image--gallery-main-image">
        <img [src]="selectedImage">
      </div>
      <div class="storybook-image--gallery-thumb-bar">
        <img *ngFor="let imageSrc of src; let i = index" [src]="imageSrc" (click)="selectImage(imageSrc)">
      </div>
    </div>

      <div *ngIf="layout === 'slideshow'" [ngClass]="classes">
        <div *ngFor="let imageSrc of src; let i = index" [ngClass]="{'mySlides': true, 'fade': true, 'active': i === slideIndex}" class="storybook-image--slideshow-image-container">
        <div class="storybook-image--slideshow-image-wrapper">
              
              <a class="storybook-image--slideshow-prev" (click)="plusSlides(-1)">&#10094;</a>
              <img [src]="imageSrc">
              <a class="storybook-image--slideshow-next" (click)="plusSlides(1)">&#10095;</a>
              
        </div>
        </div>
        <div>
          <span *ngFor="let imageSrc of src; let i = index" class="storybook-image--slideshow-dot" [ngClass]="{'active': i === slideIndex}" (click)="currentSlide(i)"></span>
        </div>
      </div>
  `,
  styleUrls: ['./image.css'],
})
export class ImageComponent implements OnInit {
  /**
   * Different types of layouts
   */
  @Input() layout: 'normal' | 'gallery' | 'slideshow' = 'normal';
  /**
   * Image source coming from a string array
   */
  @Input() src?: string[];

  /**
   * The selected image for gallery or slideshow can be a string or undefined in case no value is assigned
   */
  public selectedImage: string | undefined;
  /**
   * This is used to keep track of the current slide index for the slideshow
   */
  public slideIndex = 0;

  /**
   * Initializing the layout that will be used depending on length
   */
  ngOnInit() {
    if (this.src && this.src.length > 0) {
      if (this.src.length === 1) {
        this.layout = 'normal';
        this.selectedImage = this.src[0];
      } else {
        this.layout = this.layout;
        this.selectedImage = this.src[0];
        this.showSlides(this.slideIndex);
      }
    }
  }

  /**
   * Sets selectedImage to imageSrc. Helps the gallery layout to change displayed image
   */
  selectImage(imageSrc: string) {
    this.selectedImage = imageSrc;
  }

  /**
   * This makes sure the slideIndex lands within a valid range for the array of images
   */
  showSlides(n: number) {
    if (!this.src) return;
    this.slideIndex = (n + this.src.length) % this.src.length;
  }

   /**
   * Changes the index depending on the 'n' value. Used for next/previous buttons
   */
   plusSlides(n: number) {
    this.showSlides(this.slideIndex + n);
  }

  /**
   * Sets the slide index to 'n'
   */
  currentSlide(n: number) {
    this.showSlides(n);
  }

  public get classes(): string[] {
    return [`storybook-image--${this.layout}`];
  }
}