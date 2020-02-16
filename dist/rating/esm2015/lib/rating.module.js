import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
let RatingModule = class RatingModule {
    ngDoBootstrap() { }
};
RatingModule = __decorate([
    NgModule({
        imports: [
            FormsModule,
            CommonModule
        ],
        declarations: [
            RatingComponent,
            StarRatingComponent
        ],
        exports: [StarRatingComponent],
        entryComponents: [StarRatingComponent]
    })
], RatingModule);
export { RatingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXN0YXJyYXRpbmcvIiwic291cmNlcyI6WyJsaWIvcmF0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQWF0RixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBQUUsYUFBYSxLQUFJLENBQUM7Q0FBQyxDQUFBO0FBQWpDLFlBQVk7SUFYeEIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsV0FBVztZQUNYLFlBQVk7U0FDYjtRQUNELFlBQVksRUFBRTtZQUNaLGVBQWU7WUFDZixtQkFBbUI7U0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztRQUM5QixlQUFlLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztLQUN2QyxDQUFDO0dBQ1csWUFBWSxDQUFxQjtTQUFqQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJhdGluZ0NvbXBvbmVudCB9IGZyb20gJy4vcmF0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGFyUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFJhdGluZ0NvbXBvbmVudCwgXG4gICAgU3RhclJhdGluZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtTdGFyUmF0aW5nQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbU3RhclJhdGluZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nTW9kdWxlIHtuZ0RvQm9vdHN0cmFwKCkge319XG4iXX0=