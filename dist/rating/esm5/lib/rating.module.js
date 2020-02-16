import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating.component';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
var RatingModule = /** @class */ (function () {
    function RatingModule() {
    }
    RatingModule.prototype.ngDoBootstrap = function () { };
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
    return RatingModule;
}());
export { RatingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXN0YXJyYXRpbmcvIiwic291cmNlcyI6WyJsaWIvcmF0aW5nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQWF0RjtJQUFBO0lBQTZDLENBQUM7SUFBbkIsb0NBQWEsR0FBYixjQUFpQixDQUFDO0lBQWhDLFlBQVk7UUFYeEIsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFdBQVc7Z0JBQ1gsWUFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGVBQWU7Z0JBQ2YsbUJBQW1CO2FBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDOUIsZUFBZSxFQUFFLENBQUMsbUJBQW1CLENBQUM7U0FDdkMsQ0FBQztPQUNXLFlBQVksQ0FBcUI7SUFBRCxtQkFBQztDQUFBLEFBQTlDLElBQThDO1NBQWpDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi9yYXRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXJSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUmF0aW5nQ29tcG9uZW50LCBcbiAgICBTdGFyUmF0aW5nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0YXJSYXRpbmdDb21wb25lbnRdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtTdGFyUmF0aW5nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdNb2R1bGUge25nRG9Cb290c3RyYXAoKSB7fX1cbiJdfQ==