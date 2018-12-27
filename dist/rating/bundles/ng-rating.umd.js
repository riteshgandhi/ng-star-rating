(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-rating', ['exports', '@angular/core', 'rxjs', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-rating'] = {}),global.ng.core,global.rxjs,global.ng.forms,global.ng.common));
}(this, (function (exports,i0,rxjs,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var RatingService = /** @class */ (function () {
        function RatingService() {
        }
        RatingService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        RatingService.ctorParameters = function () { return []; };
        /** @nocollapse */ RatingService.ngInjectableDef = i0.defineInjectable({ factory: function RatingService_Factory() { return new RatingService(); }, token: RatingService, providedIn: "root" });
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
            { type: i0.Component, args: [{
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
                this.onValueChange = new rxjs.Subject();
                this.onValueChange.subscribe(function () {
                    _this.generateRating();
                    _this.applySizeAllStars();
                });
            }
            if (!this.onCheckedColorChange) {
                this.onCheckedColorChange = new rxjs.Subject();
                this.onCheckedColorChange.subscribe(function () {
                    _this.applyColorStyleAllStars(true);
                });
            }
            if (!this.onUnCheckedColorChange) {
                this.onUnCheckedColorChange = new rxjs.Subject();
                this.onUnCheckedColorChange.subscribe(function () {
                    _this.applyColorStyleAllStars(false);
                });
            }
            if (!this.onSizeChange) {
                this.onSizeChange = new rxjs.Subject();
                this.onSizeChange.subscribe(function () {
                    _this.applySizeAllStars();
                });
            }
            // this.setStars();
        }
        Object.defineProperty(StarRatingComponent.prototype, "checkedColor", {
            get: /**
             * @return {?}
             */ function () {
                return this._checkedColor;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function () {
                return this._unCheckedColor;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function () {
                return this._value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
             */ function () {
                return this._size;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: i0.Component, args: [{
                        selector: 'star-rating',
                        template: "\n  <div #starMain>\n    <span data-index=\"1\" #star1></span>\n    <span data-index=\"2\" #star2></span>\n    <span data-index=\"3\" #star3></span>\n    <span data-index=\"4\" #star4></span>\n    <span data-index=\"5\" #star5></span>\n  </div>\n  <style>\n    :root {\n      --checkedColor: gold;\n      --unCheckedColor: gray;\n      --size: 24px;\n      --halfWidth: 10px;\n      --halfMargin: -20px;\n    }  \n    .star {\n      cursor: pointer;\n      color: var(--unCheckedColor);\n      font-size: var(--size);\n      width: var(--size);\n      display: inline-block;\n    }\n    .star:last-child {\n      margin-right: 0;\n    }\n    .star:before {\n      content:'\\2605';\n    }\n    .star.on {\n      color: var(--checkedColor);\n    }\n    .star.half:after {\n      content:'\\2605';\n      color: var(--checkedColor);\n      position: absolute;\n      margin-left: var(--halfMargin);\n      width: var(--halfWidth);\n      overflow: hidden;\n    }\n  </style>\n   "
                    }] }
        ];
        /** @nocollapse */
        StarRatingComponent.ctorParameters = function () { return []; };
        StarRatingComponent.propDecorators = {
            mainElement: [{ type: i0.ViewChild, args: ['starMain',] }],
            star1Element: [{ type: i0.ViewChild, args: ['star1',] }],
            star2Element: [{ type: i0.ViewChild, args: ['star2',] }],
            star3Element: [{ type: i0.ViewChild, args: ['star3',] }],
            star4Element: [{ type: i0.ViewChild, args: ['star4',] }],
            star5Element: [{ type: i0.ViewChild, args: ['star5',] }],
            checkedColor: [{ type: i0.Input, args: ['checkedColor',] }],
            unCheckedColor: [{ type: i0.Input, args: ['unCheckedColor',] }],
            value: [{ type: i0.Input, args: ['value',] }],
            size: [{ type: i0.Input, args: ['size',] }]
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
            { type: i0.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            common.CommonModule
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

    exports.RatingService = RatingService;
    exports.RatingComponent = RatingComponent;
    exports.RatingModule = RatingModule;
    exports.StarRatingComponent = StarRatingComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmF0aW5nLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctcmF0aW5nL2xpYi9yYXRpbmcuc2VydmljZS50cyIsIm5nOi8vbmctcmF0aW5nL2xpYi9yYXRpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1yYXRpbmcvY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQudHMiLCJuZzovL25nLXJhdGluZy9saWIvcmF0aW5nLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RhclJhdGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItcmF0aW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIHJhdGluZyB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdGFyLXJhdGluZycsXG4gIHRlbXBsYXRlOiBgXG4gIDxkaXYgI3N0YXJNYWluPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIxXCIgI3N0YXIxPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMlwiICNzdGFyMj48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjNcIiAjc3RhcjM+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI0XCIgI3N0YXI0Pjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNVwiICNzdGFyNT48L3NwYW4+XG4gIDwvZGl2PlxuICA8c3R5bGU+XG4gICAgOnJvb3Qge1xuICAgICAgLS1jaGVja2VkQ29sb3I6IGdvbGQ7XG4gICAgICAtLXVuQ2hlY2tlZENvbG9yOiBncmF5O1xuICAgICAgLS1zaXplOiAyNHB4O1xuICAgICAgLS1oYWxmV2lkdGg6IDEwcHg7XG4gICAgICAtLWhhbGZNYXJnaW46IC0yMHB4O1xuICAgIH0gIFxuICAgIC5zdGFyIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGNvbG9yOiB2YXIoLS11bkNoZWNrZWRDb2xvcik7XG4gICAgICBmb250LXNpemU6IHZhcigtLXNpemUpO1xuICAgICAgd2lkdGg6IHZhcigtLXNpemUpO1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cbiAgICAuc3RhcjpsYXN0LWNoaWxkIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG4gICAgLnN0YXI6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICB9XG4gICAgLnN0YXIub24ge1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgfVxuICAgIC5zdGFyLmhhbGY6YWZ0ZXIge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgICAgY29sb3I6IHZhcigtLWNoZWNrZWRDb2xvcik7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBtYXJnaW4tbGVmdDogdmFyKC0taGFsZk1hcmdpbik7XG4gICAgICB3aWR0aDogdmFyKC0taGFsZldpZHRoKTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgfVxuICA8L3N0eWxlPlxuICAgYFxufSlcblxuZXhwb3J0IGNsYXNzIFN0YXJSYXRpbmdDb21wb25lbnQge1xuICBwcml2YXRlIHN0YXJzID0gW107XG4gIHByaXZhdGUgX2NoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF91bkNoZWNrZWRDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBvblZhbHVlQ2hhbmdlOlN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvbkNoZWNrZWRDb2xvckNoYW5nZTpTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25VbkNoZWNrZWRDb2xvckNoYW5nZTpTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25TaXplQ2hhbmdlOlN1YmplY3Q8c3RyaW5nPjtcblxuICBAVmlld0NoaWxkKCdzdGFyTWFpbicpIHByaXZhdGUgbWFpbkVsZW1lbnQ6IGFueTtcbiAgQFZpZXdDaGlsZCgnc3RhcjEnKSBwcml2YXRlIHN0YXIxRWxlbWVudDogYW55O1xuICBAVmlld0NoaWxkKCdzdGFyMicpIHByaXZhdGUgc3RhcjJFbGVtZW50OiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3N0YXIzJykgcHJpdmF0ZSBzdGFyM0VsZW1lbnQ6IGFueTtcbiAgQFZpZXdDaGlsZCgnc3RhcjQnKSBwcml2YXRlIHN0YXI0RWxlbWVudDogYW55O1xuICBAVmlld0NoaWxkKCdzdGFyNScpIHByaXZhdGUgc3RhcjVFbGVtZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IFxuICAgIGlmICghdGhpcy5vblZhbHVlQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uU2l6ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5zZXRTdGFycygpO1xuICB9XG4gIFxuICBnZXQgY2hlY2tlZENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bkNoZWNrZWRDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICBASW5wdXQoJ2NoZWNrZWRDb2xvcicpIHNldCBjaGVja2VkQ29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl9jaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgndW5DaGVja2VkQ29sb3InKSBzZXQgdW5DaGVja2VkQ29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3VuQ2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCd2YWx1ZScpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID4gNSkge1xuICAgICAgdmFsdWUgPSA1O1xuICAgIH1cbiAgICBcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID49MCkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy5fdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnc2l6ZScpIHNldCBzaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikge1xuICAgICAgdmFsdWUgPSBcIjI0cHhcIjtcbiAgICB9XG4gICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xuICAgIHRoaXMub25TaXplQ2hhbmdlLm5leHQodGhpcy5fc2l6ZSk7XG4gIH1cblxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnJhdGUuYmluZCh0aGlzKSk7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5yYXRlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByYXRlKGV2ZW50KSB7XG4gICAgbGV0IHN0YXIgPSBldmVudC5zcmNFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XG4gICAgaWYgKHRoaXMudmFsdWUgPT0gMCkge1xuICAgICAgdGhpcy52YWx1ZSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBpZiAodGhpcy5zdGFycy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjFFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyM0VsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjRFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI1RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgICBsZXQgbmV3U2l6ZSA9IHRoaXMuc2l6ZS5tYXRjaCgvXFxkKy8pWzBdO1xuICAgICAgICBsZXQgaGFsZlNpemUgPSAocGFyc2VJbnQobmV3U2l6ZSkgKiAxMCkvMjQ7XG4gICAgICAgIGxldCBoYWxmTWFyZ2luID0gMC0oKHBhcnNlSW50KG5ld1NpemUpICogMjApLzI0KTtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXNpemUnLCB0aGlzLnNpemUpO1xuICAgICAgICBpZiAoc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhhbGZcIikpe1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oYWxmV2lkdGgnLCBgJHtoYWxmU2l6ZX1weGApO1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oYWxmTWFyZ2luJywgYCR7aGFsZk1hcmdpbn1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHNldENoZWNrZWQ6Ym9vbGVhbikge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBhbnkpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogYW55KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2hlY2tlZENvbG9yJywgdGhpcy5jaGVja2VkQ29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IGFueSkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXVuQ2hlY2tlZENvbG9yJywgdGhpcy51bkNoZWNrZWRDb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKCkge1xuICAgIHRoaXMuc2V0U3RhcnMoKTtcbiAgICBpZiAodGhpcy52YWx1ZSA+PTApIHtcbiAgICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XG5cbiAgICAgIGxldCBoYXNEZWNpbWFsczogYm9vbGVhbiA9IFxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxuICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgLnN1YnN0cmluZygzLCAyKSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGxldCBpID0gMTtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN0YXJcIik7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xuICAgICAgICAgIC8vIHN0YXIgb25cbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm9uXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGhhbGQgc3RhclxuICAgICAgICAgIGlmIChoYXNEZWNpbWFscykge1xuICAgICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYWxmXCIpO1xuICAgICAgICAgICAgaGFzRGVjaW1hbHMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi9yYXRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXJSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUmF0aW5nQ29tcG9uZW50LCBcbiAgICBTdGFyUmF0aW5nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0YXJSYXRpbmdDb21wb25lbnRdXG4gIC8vZW50cnlDb21wb25lbnRzOiBbU3RhclJhdGluZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb21wb25lbnQiLCJTdWJqZWN0IiwiVmlld0NoaWxkIiwiSW5wdXQiLCJOZ01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFB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