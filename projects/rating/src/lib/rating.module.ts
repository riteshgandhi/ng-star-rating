import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        RatingComponent,
        StarRatingComponent
    ],
    exports: [StarRatingComponent]
})
export class RatingModule {ngDoBootstrap() {}}
