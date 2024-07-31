import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'storybook-image',
  standalone: true,
  imports: [CommonModule],
  template: `

      <div *ngIf="layout === 'normal'">
        <figure [style.min-height.px]="minHeight" [style.width.%]="width" [style.max-width.px]="maxWidth" [style.border-radius.px]="borderRadius">
        <img [ngClass]="classes" [src]="src[0]" [alt]="alt[0]" [style.min-height.px]="minHeight" [style.width.%]="width" [style.max-width.px]="maxWidth" [style.border-radius]="topBorderRadius">
        <figcaption [style.border-radius]="bottomBorderRadius">{{caption[0]}}</figcaption>
        </figure>
      </div>

    <div *ngIf="layout === 'gallery'" [ngClass]="classes">
      <div class="storybook-image--gallery-main-image">
        
        <figure [style.min-height.px]="minHeight" [style.width.%]="width" [style.max-width.px]="maxWidth" [style.border-radius.px]="borderRadius">
        <img class="gallery" [src]="selectedImage" [alt]="selectedAltText" [style.height.px]="height" [style.width.%]="width" [style.max-width.px]="maxWidth" [style.border-radius]="topBorderRadius">
        <ng-container *ngIf="selectedCaption !== null; else templateB">
          <figcaption [style.border-radius]="bottomBorderRadius">{{selectedCaption}}</figcaption>
          </ng-container> 
          <ng-template #templateB> 
          <figcaption [style.border-radius]="bottomBorderRadius">No caption</figcaption>
          </ng-template>
        </figure>
      </div>
      <div class="storybook-image--gallery-thumb-bar">
        <img *ngFor="let imageSrc of src; let i = index" [src]="imageSrc" [alt]="altText" (click)="selectImage(imageSrc, alt[i], caption[i])" [style.height.px]="thumbHeight" [style.width.%]="thumbWidth" [style.border-radius.px]="borderRadius">
      </div>
    </div>

      <div *ngIf="layout === 'slideshow'" [ngClass]="classes">
        <div *ngFor="let imageSrc of src; let i = index" [ngClass]="{'mySlides': true, 'fade': true, 'active': i === slideIndex}"  [style.width.%]="width" class="storybook-image--slideshow-image-container">
        <div class="storybook-image--slideshow-image-wrapper">
              
              
               <figure [style.min-height.px]="minHeight" [style.width.%]="width" [style.max-width.px]="maxWidth" [style.border-radius.px]="borderRadius">
                <a class="storybook-image--slideshow-prev" (click)="plusSlides(-1)">&#10094;</a>
                  <img [src]="imageSrc" [alt]="alt[i]" [style.height.px]="slideShowHeight" [style.width.%]="slideShowWidth" [style.border-radius]="topBorderRadius" [style.max-width.px]="slideShowMaxWidth">
                <a class="storybook-image--slideshow-next" (click)="plusSlides(1)">&#10095;</a>
                <ng-container *ngIf="caption[i] !== null; else templateB">
                
                  <figcaption [style.border-radius]="bottomBorderRadius">{{caption[i]}}</figcaption>
                </ng-container> 
                  <ng-template #templateB> 
                  <figcaption [style.border-radius]="bottomBorderRadius">No caption</figcaption>
                  
                  </ng-template>
                
                </figure>
             
              <div class="storybook-image--slideshow-dot-container">
              <span *ngFor="let imageSrc of src; let i = index" class="storybook-image--slideshow-dot" [ngClass]="{'active': i === slideIndex}" (click)="currentSlide(i)"></span>
              </div>
        </div>
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
   * Alternate text source coming from a string array
   */
    @Input() alt?: string[] | undefined;

     /**
   * Caption source coming from a string array
   */
     @Input() caption?: (string | null)[] |  undefined;

    
   /**
   * These are the default property values for the component
   */
  @Input() minHeight: number = 240;
  @Input() height: number = 240;
  @Input() thumbHeight: number = 70;
  @Input() slideShowHeight: number = 240;
  @Input() width: number = 100;
  @Input() maxWidth: number = 320;
  @Input() thumbWidth: number = 25;
  @Input() slideShowWidth: number = 100;
  @Input() slideShowMaxWidth: number = 320;
  @Input() topBorderRadius: string = "20px 20px 0px 0px";
  @Input() bottomBorderRadius: string = "0px 0px 20px 20px";
  @Input() borderRadius: number = 20;


  /**
   * The selected -image- for gallery can be a string or undefined in case no value is assigned
   */
  public selectedImage: string | undefined;

   /**
   * The selected -alt text- for gallery can be a string or undefined in case no value is assigned
   */
   public selectedAltText: string | undefined;

    /**
   * The selected -caption- for gallery can be a string or undefined in case no value is assigned
   */
    public selectedCaption: string | undefined | null;

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
        this.selectedAltText = this.alt ? this.alt[0] : '';
        this.selectedCaption = this.caption ? this.caption[0] : '';
        
        
       
      } else {
        this.layout = this.layout;
        this.selectedImage = this.src[0];
        this.selectedAltText = this.alt ? this.alt[0] : '';
        this.selectedCaption =  this.caption ? this.caption[0] : '';
       
   
        this.showSlides(this.slideIndex);
      }
    }
  }


  /**
   * Sets selectedImage to imageSrc. Helps the gallery layout to change displayed image
   */
  
  selectImage(imageSrc: string, altText: string, capText: string) {
    this.selectedImage = imageSrc;
    this.selectedAltText = altText;
    this.selectedCaption = capText;
  
    console.log(capText)
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