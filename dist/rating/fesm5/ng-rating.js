import { Injectable, Component, NgModule, Input, ViewChild, defineInjectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RatingService = /** @class */ (function () {
    function RatingService() {
    }
    RatingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    RatingService.ctorParameters = function () { return []; };
    /** @nocollapse */ RatingService.ngInjectableDef = defineInjectable({ factory: function RatingService_Factory() { return new RatingService(); }, token: RatingService, providedIn: "root" });
    return RatingService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
    }
    /**
     * @return {?}
     */
    RatingComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    RatingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'lib-rating',
                    template: "\n    <p>\n      rating works!\n    </p>\n  "
                }] }
    ];
    /** @nocollapse */
    RatingComponent.ctorParameters = function () { return []; };
    return RatingComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.stars = [];
        if (!this.onValueChange) {
            this.onValueChange = new Subject();
            this.onValueChange.subscribe(function () {
                _this.generateRating();
                _this.applySizeAllStars();
            });
        }
        if (!this.onCheckedColorChange) {
            this.onCheckedColorChange = new Subject();
            this.onCheckedColorChange.subscribe(function () {
                _this.applyColorStyleAllStars(true);
            });
        }
        if (!this.onUnCheckedColorChange) {
            this.onUnCheckedColorChange = new Subject();
            this.onUnCheckedColorChange.subscribe(function () {
                _this.applyColorStyleAllStars(false);
            });
        }
        if (!this.onSizeChange) {
            this.onSizeChange = new Subject();
            this.onSizeChange.subscribe(function () {
                _this.applySizeAllStars();
            });
        }
        // this.setStars();
    }
    Object.defineProperty(StarRatingComponent.prototype, "checkedColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._checkedColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._checkedColor = value;
            if (this._checkedColor) {
                this.onCheckedColorChange.next(this._checkedColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "unCheckedColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._unCheckedColor;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._unCheckedColor = value;
            if (this._unCheckedColor) {
                this.onUnCheckedColorChange.next(this._unCheckedColor);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StarRatingComponent.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value || value == null || value == "0px") {
                value = "24px";
            }
            this._size = value;
            this.onSizeChange.next(this._size);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.stars.forEach(function (star) {
            star.nativeElement.addEventListener('click', _this.rate.bind(_this));
            star.nativeElement.addEventListener('mouseover', _this.rate.bind(_this));
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    StarRatingComponent.prototype.rate = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var star = event.srcElement;
        this.value = star.dataset.index;
        if (this.value == 0) {
            this.value = 1;
        }
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.setStars = /**
     * @return {?}
     */
    function () {
        if (this.stars.length == 0) {
            this.stars.push(this.star1Element);
            this.stars.push(this.star2Element);
            this.stars.push(this.star3Element);
            this.stars.push(this.star4Element);
            this.stars.push(this.star5Element);
        }
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.applySizeAllStars = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._size) {
            this.stars.forEach(function (star) {
                /** @type {?} */
                var newSize = _this.size.match(/\d+/)[0];
                /** @type {?} */
                var halfSize = (parseInt(newSize) * 10) / 24;
                /** @type {?} */
                var halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.nativeElement.style.setProperty('--size', _this.size);
                if (star.nativeElement.classList.contains("half")) {
                    star.nativeElement.style.setProperty('--halfWidth', halfSize + "px");
                    star.nativeElement.style.setProperty('--halfMargin', halfMargin + "px");
                }
            });
        }
    };
    /**
     * @param {?} setChecked
     * @return {?}
     */
    StarRatingComponent.prototype.applyColorStyleAllStars = /**
     * @param {?} setChecked
     * @return {?}
     */
    function (setChecked) {
        var _this = this;
        this.stars.forEach(function (star) {
            if (setChecked) {
                _this.applyCheckedColorStyle(star.nativeElement);
            }
            else {
                _this.applyUnCheckedColorStyle(star.nativeElement);
            }
        });
    };
    /**
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyColorStyle = /**
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    };
    /**
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyCheckedColorStyle = /**
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        starElement.style.setProperty('--checkedColor', this.checkedColor);
    };
    /**
     * @param {?} starElement
     * @return {?}
     */
    StarRatingComponent.prototype.applyUnCheckedColorStyle = /**
     * @param {?} starElement
     * @return {?}
     */
    function (starElement) {
        starElement.style.setProperty('--unCheckedColor', this.unCheckedColor);
    };
    /**
     * @return {?}
     */
    StarRatingComponent.prototype.generateRating = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            /** @type {?} */
            var hasDecimals_1 = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            /** @type {?} */
            var i_1 = 1;
            this.stars.forEach(function (star) {
                star.nativeElement.classList = [];
                _this.applyColorStyle(star.nativeElement);
                star.nativeElement.classList.add("star");
                if (_this.value >= i_1) {
                    // star on
                    star.nativeElement.classList.add("on");
                }
                else {
                    // hald star
                    if (hasDecimals_1) {
                        star.nativeElement.classList.add("half");
                        hasDecimals_1 = false;
                    }
                }
                i_1++;
            });
        }
    };
    StarRatingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'star-rating',
                    template: "\n  <div #starMain>\n    <span data-index=\"1\" #star1></span>\n    <span data-index=\"2\" #star2></span>\n    <span data-index=\"3\" #star3></span>\n    <span data-index=\"4\" #star4></span>\n    <span data-index=\"5\" #star5></span>\n  </div>\n  <style>\n    :root {\n      --checkedColor: gold;\n      --unCheckedColor: gray;\n      --size: 24px;\n      --halfWidth: 10px;\n      --halfMargin: -20px;\n    }  \n    .star {\n      cursor: pointer;\n      color: var(--unCheckedColor);\n      font-size: var(--size);\n      width: var(--size);\n      display: inline-block;\n    }\n    .star:last-child {\n      margin-right: 0;\n    }\n    .star:before {\n      content:'\\2605';\n    }\n    .star.on {\n      color: var(--checkedColor);\n    }\n    .star.half:after {\n      content:'\\2605';\n      color: var(--checkedColor);\n      position: absolute;\n      margin-left: var(--halfMargin);\n      width: var(--halfWidth);\n      overflow: hidden;\n    }\n  </style>\n   "
                }] }
    ];
    /** @nocollapse */
    StarRatingComponent.ctorParameters = function () { return []; };
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
    return StarRatingComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RatingModule = /** @class */ (function () {
    function RatingModule() {
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
    return RatingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { RatingService, RatingComponent, RatingModule, StarRatingComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1yYXRpbmcvbGliL3JhdGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1yYXRpbmcvbGliL3JhdGluZy5jb21wb25lbnQudHMiLCJuZzovL25nLXJhdGluZy9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudC50cyIsIm5nOi8vbmctcmF0aW5nL2xpYi9yYXRpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGFyUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1yYXRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgcmF0aW5nIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiAjc3Rhck1haW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjFcIiAjc3RhcjE+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIyXCIgI3N0YXIyPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiM1wiICNzdGFyMz48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjRcIiAjc3RhcjQ+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI1XCIgI3N0YXI1Pjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzdHlsZT5cbiAgICA6cm9vdCB7XG4gICAgICAtLWNoZWNrZWRDb2xvcjogZ29sZDtcbiAgICAgIC0tdW5DaGVja2VkQ29sb3I6IGdyYXk7XG4gICAgICAtLXNpemU6IDI0cHg7XG4gICAgICAtLWhhbGZXaWR0aDogMTBweDtcbiAgICAgIC0taGFsZk1hcmdpbjogLTIwcHg7XG4gICAgfSAgXG4gICAgLnN0YXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6IHZhcigtLXVuQ2hlY2tlZENvbG9yKTtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tc2l6ZSk7XG4gICAgICB3aWR0aDogdmFyKC0tc2l6ZSk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5zdGFyOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgICAuc3RhcjpiZWZvcmUge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgIH1cbiAgICAuc3Rhci5vbiB7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gICAgLnN0YXIuaGFsZjphZnRlciB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1oYWxmTWFyZ2luKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1oYWxmV2lkdGgpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gIDwvc3R5bGU+XG4gICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XG4gIHByaXZhdGUgc3RhcnMgPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6U3ViamVjdDxudW1iZXI+O1xuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOlN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOlN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6U3ViamVjdDxzdHJpbmc+O1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJykgcHJpdmF0ZSBtYWluRWxlbWVudDogYW55O1xuICBAVmlld0NoaWxkKCdzdGFyMScpIHByaXZhdGUgc3RhcjFFbGVtZW50OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIyJykgcHJpdmF0ZSBzdGFyMkVsZW1lbnQ6IGFueTtcbiAgQFZpZXdDaGlsZCgnc3RhcjMnKSBwcml2YXRlIHN0YXIzRWxlbWVudDogYW55O1xuICBAVmlld0NoaWxkKCdzdGFyNCcpIHByaXZhdGUgc3RhcjRFbGVtZW50OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3N0YXI1JykgcHJpdmF0ZSBzdGFyNUVsZW1lbnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgXG4gICAgaWYgKCF0aGlzLm9uVmFsdWVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25TaXplQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLnNldFN0YXJzKCk7XG4gIH1cbiAgXG4gIGdldCBjaGVja2VkQ29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHVuQ2hlY2tlZENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgnY2hlY2tlZENvbG9yJykgc2V0IGNoZWNrZWRDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWRDb2xvcikge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX2NoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCd1bkNoZWNrZWRDb2xvcicpIHNldCB1bkNoZWNrZWRDb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdW5DaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdW5DaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3ZhbHVlJykgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPiA1KSB7XG4gICAgICB2YWx1ZSA9IDU7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5fdmFsdWUgPj0wKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdzaXplJykgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIHByaXZhdGUgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLnJhdGUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJhdGUoZXZlbnQpIHtcbiAgICBsZXQgc3RhciA9IGV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgdGhpcy52YWx1ZSA9IHN0YXIuZGF0YXNldC5pbmRleDtcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XG4gICAgICB0aGlzLnZhbHVlID0gMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFN0YXJzKCkge1xuICAgIGlmICh0aGlzLnN0YXJzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMUVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjJFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIzRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNEVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xuICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKS8yNDtcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwLSgocGFyc2VJbnQobmV3U2l6ZSkgKiAyMCkvMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2l6ZScsIHRoaXMuc2l6ZSk7XG4gICAgICAgIGlmIChzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFsZlwiKSl7XG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhhbGZXaWR0aCcsIGAke2hhbGZTaXplfXB4YCk7XG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhhbGZNYXJnaW4nLCBgJHtoYWxmTWFyZ2lufXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoc2V0Q2hlY2tlZDpib29sZWFuKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgaWYgKHNldENoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IGFueSkge1xuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBhbnkpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jaGVja2VkQ29sb3InLCB0aGlzLmNoZWNrZWRDb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogYW55KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tdW5DaGVja2VkQ29sb3InLCB0aGlzLnVuQ2hlY2tlZENvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoKSB7XG4gICAgdGhpcy5zZXRTdGFycygpO1xuICAgIGlmICh0aGlzLnZhbHVlID49MCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID0gXG4gICAgICAgICgoTnVtYmVyLnBhcnNlRmxvYXQodGhpcy52YWx1ZS50b1N0cmluZygpKSAlIDEpXG4gICAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgICAuc3Vic3RyaW5nKDMsIDIpKSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgbGV0IGkgPSAxO1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3RhclwiKTtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA+PSBpKSB7XG4gICAgICAgICAgLy8gc3RhciBvblxuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwib25cIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaGFsZCBzdGFyXG4gICAgICAgICAgaWYgKGhhc0RlY2ltYWxzKSB7XG4gICAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhbGZcIik7XG4gICAgICAgICAgICBoYXNEZWNpbWFscyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuL3JhdGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RhclJhdGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBSYXRpbmdDb21wb25lbnQsIFxuICAgIFN0YXJSYXRpbmdDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU3RhclJhdGluZ0NvbXBvbmVudF1cbiAgLy9lbnRyeUNvbXBvbmVudHM6IFtTdGFyUmF0aW5nQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7SUFPRTtLQUFpQjs7Z0JBTGxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3dCQUpEOzs7Ozs7O0FDQUE7SUFjRTtLQUFpQjs7OztJQUVqQixrQ0FBUTs7O0lBQVI7S0FDQzs7Z0JBZEYsU0FBUyxTQUFDO29CQUNU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