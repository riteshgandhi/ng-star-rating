import { Injectable, Component, NgModule, Input, ViewChild, defineInjectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RatingService {
    constructor() { }
}
RatingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RatingService.ctorParameters = () => [];
/** @nocollapse */ RatingService.ngInjectableDef = defineInjectable({ factory: function RatingService_Factory() { return new RatingService(); }, token: RatingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RatingComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
RatingComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-rating',
                template: `
    <p>
      rating works!
    </p>
  `
            }] }
];
/** @nocollapse */
RatingComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StarRatingComponent {
    constructor() {
        this.stars = [];
        if (!this.onValueChange) {
            this.onValueChange = new Subject();
            this.onValueChange.subscribe(() => {
                this.generateRating();
                this.applySizeAllStars();
            });
        }
        if (!this.onCheckedColorChange) {
            this.onCheckedColorChange = new Subject();
            this.onCheckedColorChange.subscribe(() => {
                this.applyColorStyleAllStars(true);
            });
        }
        if (!this.onUnCheckedColorChange) {
            this.onUnCheckedColorChange = new Subject();
            this.onUnCheckedColorChange.subscribe(() => {
                this.applyColorStyleAllStars(false);
            });
        }
        if (!this.onSizeChange) {
            this.onSizeChange = new Subject();
            this.onSizeChange.subscribe(() => {
                this.applySizeAllStars();
            });
        }
        // this.setStars();
    }
    /**
     * @return {?}
     */
    get checkedColor() {
        return this._checkedColor;
    }
    /**
     * @return {?}
     */
    get unCheckedColor() {
        return this._unCheckedColor;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set checkedColor(value) {
        this._checkedColor = value;
        if (this._checkedColor) {
            this.onCheckedColorChange.next(this._checkedColor);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set unCheckedColor(value) {
        this._unCheckedColor = value;
        if (this._unCheckedColor) {
            this.onUnCheckedColorChange.next(this._unCheckedColor);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!value || value == null) {
            value = 0;
        }
        if (value > 5) {
            value = 5;
        }
        this._value = value;
        if (this._value >= 0) {
            this.onValueChange.next(this._value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set size(value) {
        if (!value || value == null || value == "0px") {
            value = "24px";
        }
        this._size = value;
        this.onSizeChange.next(this._size);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.stars.forEach(star => {
            star.nativeElement.addEventListener('click', this.rate.bind(this));
            star.nativeElement.addEventListener('mouseover', this.rate.bind(this));
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    rate(event) {
        /** @type {?} */
        let star = event.srcElement;
        this.value = star.dataset.index;
        if (this.value == 0) {
            this.value = 1;
        }
    }
    /**
     * @return {?}
     */
    setStars() {
        if (this.stars.length == 0) {
            this.stars.push(this.star1Element);
            this.stars.push(this.star2Element);
            this.stars.push(this.star3Element);
            this.stars.push(this.star4Element);
            this.stars.push(this.star5Element);
        }
    }
    /**
     * @return {?}
     */
    applySizeAllStars() {
        if (this._size) {
            this.stars.forEach(star => {
                /** @type {?} */
                let newSize = this.size.match(/\d+/)[0];
                /** @type {?} */
                let halfSize = (parseInt(newSize) * 10) / 24;
                /** @type {?} */
                let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.nativeElement.style.setProperty('--size', this.size);
                if (star.nativeElement.classList.contains("half")) {
                    star.nativeElement.style.setProperty('--halfWidth', `${halfSize}px`);
                    star.nativeElement.style.setProperty('--halfMargin', `${halfMargin}px`);
                }
            });
        }
    }
    /**
     * @param {?} setChecked
     * @return {?}
     */
    applyColorStyleAllStars(setChecked) {
        this.stars.forEach(star => {
            if (setChecked) {
                this.applyCheckedColorStyle(star.nativeElement);
            }
            else {
                this.applyUnCheckedColorStyle(star.nativeElement);
            }
        });
    }
    /**
     * @param {?} starElement
     * @return {?}
     */
    applyColorStyle(starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    }
    /**
     * @param {?} starElement
     * @return {?}
     */
    applyCheckedColorStyle(starElement) {
        starElement.style.setProperty('--checkedColor', this.checkedColor);
    }
    /**
     * @param {?} starElement
     * @return {?}
     */
    applyUnCheckedColorStyle(starElement) {
        starElement.style.setProperty('--unCheckedColor', this.unCheckedColor);
    }
    /**
     * @return {?}
     */
    generateRating() {
        this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            /** @type {?} */
            let hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            /** @type {?} */
            let i = 1;
            this.stars.forEach(star => {
                star.nativeElement.classList = [];
                this.applyColorStyle(star.nativeElement);
                star.nativeElement.classList.add("star");
                if (this.value >= i) {
                    // star on
                    star.nativeElement.classList.add("on");
                }
                else {
                    // hald star
                    if (hasDecimals) {
                        star.nativeElement.classList.add("half");
                        hasDecimals = false;
                    }
                }
                i++;
            });
        }
    }
}
StarRatingComponent.decorators = [
    { type: Component, args: [{
                selector: 'star-rating',
                template: `
  <div #starMain>
    <span data-index="1" #star1></span>
    <span data-index="2" #star2></span>
    <span data-index="3" #star3></span>
    <span data-index="4" #star4></span>
    <span data-index="5" #star5></span>
  </div>
  <style>
    :root {
      --checkedColor: gold;
      --unCheckedColor: gray;
      --size: 24px;
      --halfWidth: 10px;
      --halfMargin: -20px;
    }  
    .star {
      cursor: pointer;
      color: var(--unCheckedColor);
      font-size: var(--size);
      width: var(--size);
      display: inline-block;
    }
    .star:last-child {
      margin-right: 0;
    }
    .star:before {
      content:'\\2605';
    }
    .star.on {
      color: var(--checkedColor);
    }
    .star.half:after {
      content:'\\2605';
      color: var(--checkedColor);
      position: absolute;
      margin-left: var(--halfMargin);
      width: var(--halfWidth);
      overflow: hidden;
    }
  </style>
   `
            }] }
];
/** @nocollapse */
StarRatingComponent.ctorParameters = () => [];
StarRatingComponent.propDecorators = {
    mainElement: [{ type: ViewChild, args: ['starMain',] }],
    star1Element: [{ type: ViewChild, args: ['star1',] }],
    star2Element: [{ type: ViewChild, args: ['star2',] }],
    star3Element: [{ type: ViewChild, args: ['star3',] }],
    star4Element: [{ type: ViewChild, args: ['star4',] }],
    star5Element: [{ type: ViewChild, args: ['star5',] }],
    checkedColor: [{ type: Input, args: ['checkedColor',] }],
    unCheckedColor: [{ type: Input, args: ['unCheckedColor',] }],
    value: [{ type: Input, args: ['value',] }],
    size: [{ type: Input, args: ['size',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RatingModule {
}
RatingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    CommonModule
                ],
                declarations: [
                    RatingComponent,
                    StarRatingComponent
                ],
                exports: [StarRatingComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { RatingService, RatingComponent, RatingModule, StarRatingComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1yYXRpbmcvbGliL3JhdGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1yYXRpbmcvbGliL3JhdGluZy5jb21wb25lbnQudHMiLCJuZzovL25nLXJhdGluZy9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudC50cyIsIm5nOi8vbmctcmF0aW5nL2xpYi9yYXRpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGFyUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1yYXRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgcmF0aW5nIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiAjc3Rhck1haW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjFcIiAjc3RhcjE+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIyXCIgI3N0YXIyPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiM1wiICNzdGFyMz48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjRcIiAjc3RhcjQ+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI1XCIgI3N0YXI1Pjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzdHlsZT5cbiAgICA6cm9vdCB7XG4gICAgICAtLWNoZWNrZWRDb2xvcjogZ29sZDtcbiAgICAgIC0tdW5DaGVja2VkQ29sb3I6IGdyYXk7XG4gICAgICAtLXNpemU6IDI0cHg7XG4gICAgICAtLWhhbGZXaWR0aDogMTBweDtcbiAgICAgIC0taGFsZk1hcmdpbjogLTIwcHg7XG4gICAgfSAgXG4gICAgLnN0YXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6IHZhcigtLXVuQ2hlY2tlZENvbG9yKTtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tc2l6ZSk7XG4gICAgICB3aWR0aDogdmFyKC0tc2l6ZSk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5zdGFyOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgICAuc3RhcjpiZWZvcmUge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgIH1cbiAgICAuc3Rhci5vbiB7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gICAgLnN0YXIuaGFsZjphZnRlciB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1oYWxmTWFyZ2luKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1oYWxmV2lkdGgpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gIDwvc3R5bGU+XG4gICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XG4gIHByaXZhdGUgc3RhcnMgPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6U3ViamVjdDxudW1iZXI+O1xuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOlN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOlN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6U3ViamVjdDxzdHJpbmc+O1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJykgcHJpdmF0ZSBtYWluRWxlbWVudDogYW55O1xuICBAVmlld0NoaWxkKCdzdGFyMScpIHByaXZhdGUgc3RhcjFFbGVtZW50OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIyJykgcHJpdmF0ZSBzdGFyMkVsZW1lbnQ6IGFueTtcbiAgQFZpZXdDaGlsZCgnc3RhcjMnKSBwcml2YXRlIHN0YXIzRWxlbWVudDogYW55O1xuICBAVmlld0NoaWxkKCdzdGFyNCcpIHByaXZhdGUgc3RhcjRFbGVtZW50OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3N0YXI1JykgcHJpdmF0ZSBzdGFyNUVsZW1lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgaWYgKCF0aGlzLm9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25TaXplQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLnNldFN0YXJzKCk7XG4gIH1cbiAgXG4gIGdldCBjaGVja2VkQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHVuQ2hlY2tlZENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2hlY2tlZENvbG9yJykgc2V0IGNoZWNrZWRDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWRDb2xvcikge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX2NoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCd1bkNoZWNrZWRDb2xvcicpIHNldCB1bkNoZWNrZWRDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdW5DaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdW5DaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3ZhbHVlJykgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPiA1KSB7XG4gICAgICB2YWx1ZSA9IDU7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fdmFsdWUgPj0wKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdzaXplJykgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLnJhdGUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJhdGUoZXZlbnQpIHtcbiAgICBsZXQgc3RhciA9IGV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgdGhpcy52YWx1ZSA9IHN0YXIuZGF0YXNldC5pbmRleDtcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XG4gICAgICB0aGlzLnZhbHVlID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFN0YXJzKCkge1xuICAgIGlmICh0aGlzLnN0YXJzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMUVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjJFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIzRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNEVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xuICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKS8yNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwLSgocGFyc2VJbnQobmV3U2l6ZSkgKiAyMCkvMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2l6ZScsIHRoaXMuc2l6ZSk7XG4gICAgICAgIGlmIChzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFsZlwiKSl7XG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhhbGZXaWR0aCcsIGAke2hhbGZTaXplfXB4YCk7XG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhhbGZNYXJnaW4nLCBgJHtoYWxmTWFyZ2lufXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoc2V0Q2hlY2tlZDpib29sZWFuKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgaWYgKHNldENoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IGFueSkge1xuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBhbnkpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jaGVja2VkQ29sb3InLCB0aGlzLmNoZWNrZWRDb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogYW55KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdW5DaGVja2VkQ29sb3InLCB0aGlzLnVuQ2hlY2tlZENvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoKSB7XG4gICAgdGhpcy5zZXRTdGFycygpO1xuICAgIGlmICh0aGlzLnZhbHVlID49MCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID0gXG4gICAgICAgICgoTnVtYmVyLnBhcnNlRmxvYXQodGhpcy52YWx1ZS50b1N0cmluZygpKSAlIDEpXG4gICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAuc3Vic3RyaW5nKDMsIDIpKSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgbGV0IGkgPSAxO1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3RhclwiKTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSBpKSB7XG4gICAgICAgICAgLy8gc3RhciBvblxuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib25cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGFsZCBzdGFyXG4gICAgICAgICAgaWYgKGhhc0RlY2ltYWxzKSB7XG4gICAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhbGZcIik7XG4gICAgICAgICAgICBoYXNEZWNpbWFscyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuL3JhdGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RhclJhdGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBSYXRpbmdDb21wb25lbnQsIFxuICAgIFN0YXJSYXRpbmdDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU3RhclJhdGluZ0NvbXBvbmVudF1cbiAgLy9lbnRyeUNvbXBvbmVudHM6IFtTdGFyUmF0aW5nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFPRSxpQkFBaUI7OztZQUxsQixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7QUNKRDtJQWNFLGlCQUFpQjs7OztJQUVqQixRQUFRO0tBQ1A7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFB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