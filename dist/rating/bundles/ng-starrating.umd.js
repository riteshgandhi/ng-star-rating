(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-starrating', ['exports', '@angular/core', 'rxjs', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-starrating'] = {}),global.ng.core,global.rxjs,global.ng.forms,global.ng.common));
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
            this._readOnly = false;
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
            if (!this.onReadOnlyChange) {
                this.onReadOnlyChange = new rxjs.Subject();
                this.onReadOnlyChange.subscribe(function () {
                    _this.addRemoveEvents();
                });
            }
        }
        Object.defineProperty(StarRatingComponent.prototype, "checkedcolor", {
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
        Object.defineProperty(StarRatingComponent.prototype, "uncheckedcolor", {
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
                return this._size.concat((!this._size.includes("px") ? "px" : ""));
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
        Object.defineProperty(StarRatingComponent.prototype, "readonly", {
            get: /**
             * @return {?}
             */ function () {
                return String(this._readOnly) === "true";
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._readOnly = value;
                this.onReadOnlyChange.next(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        StarRatingComponent.prototype.makeEditable = /**
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
         * @return {?}
         */
        StarRatingComponent.prototype.makeReadOnly = /**
         * @return {?}
         */
            function () {
                this.stars.forEach(function (star) {
                    star.nativeElement.__zone_symbol__clickfalse = null;
                    star.nativeElement.__zone_symbol__mouseoverfalse = null;
                });
            };
        /**
         * @return {?}
         */
        StarRatingComponent.prototype.addRemoveEvents = /**
         * @return {?}
         */
            function () {
                if (this.readonly) {
                    this.makeReadOnly();
                }
                else {
                    this.makeEditable();
                    this.onValueChange.next(this.value);
                }
            };
        /**
         * @return {?}
         */
        StarRatingComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
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
                var star = /** @type {?} */ (event.srcElement);
                this.value = parseInt(star.dataset["index"]);
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
                starElement.style.setProperty('--checkedColor', this.checkedcolor);
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
                starElement.style.setProperty('--unCheckedColor', this.uncheckedcolor);
            };
        /**
         * @return {?}
         */
        StarRatingComponent.prototype.generateRating = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.readonly) {
                    return;
                }
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
            checkedcolor: [{ type: i0.Input, args: ['checkedcolor',] }],
            uncheckedcolor: [{ type: i0.Input, args: ['uncheckedcolor',] }],
            value: [{ type: i0.Input, args: ['value',] }],
            size: [{ type: i0.Input, args: ['size',] }],
            readonly: [{ type: i0.Input, args: ['readonly',] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhcnJhdGluZy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLXN0YXJyYXRpbmcvbGliL3JhdGluZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1zdGFycmF0aW5nL2xpYi9yYXRpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1zdGFycmF0aW5nL2NvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1zdGFycmF0aW5nL2xpYi9yYXRpbmcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGFyUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQnXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1yYXRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgcmF0aW5nIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcbiAgdGVtcGxhdGU6IGBcbiAgPGRpdiAjc3Rhck1haW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjFcIiAjc3RhcjE+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIyXCIgI3N0YXIyPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiM1wiICNzdGFyMz48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjRcIiAjc3RhcjQ+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCI1XCIgI3N0YXI1Pjwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxzdHlsZT5cbiAgICA6cm9vdCB7XG4gICAgICAtLWNoZWNrZWRDb2xvcjogZ29sZDtcbiAgICAgIC0tdW5DaGVja2VkQ29sb3I6IGdyYXk7XG4gICAgICAtLXNpemU6IDI0cHg7XG4gICAgICAtLWhhbGZXaWR0aDogMTBweDtcbiAgICAgIC0taGFsZk1hcmdpbjogLTIwcHg7XG4gICAgfSAgXG4gICAgLnN0YXIge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgY29sb3I6IHZhcigtLXVuQ2hlY2tlZENvbG9yKTtcbiAgICAgIGZvbnQtc2l6ZTogdmFyKC0tc2l6ZSk7XG4gICAgICB3aWR0aDogdmFyKC0tc2l6ZSk7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICAgIC5zdGFyOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgIH1cbiAgICAuc3RhcjpiZWZvcmUge1xuICAgICAgY29udGVudDonXFxcXDI2MDUnO1xuICAgIH1cbiAgICAuc3Rhci5vbiB7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gICAgLnN0YXIuaGFsZjphZnRlciB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgICBjb2xvcjogdmFyKC0tY2hlY2tlZENvbG9yKTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi1sZWZ0OiB2YXIoLS1oYWxmTWFyZ2luKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1oYWxmV2lkdGgpO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG4gIDwvc3R5bGU+XG4gICBgXG59KVxuXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XG4gIHByaXZhdGUgc3RhcnMgPSBbXTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XG4gIHByaXZhdGUgX3NpemU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcbiAgcHJpdmF0ZSBvbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcbiAgcHJpdmF0ZSBvblJlYWRPbmx5Q2hhbmdlOiBTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJykgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjEnKSBwcml2YXRlIHN0YXIxRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjInKSBwcml2YXRlIHN0YXIyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjMnKSBwcml2YXRlIHN0YXIzRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjQnKSBwcml2YXRlIHN0YXI0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnc3RhcjUnKSBwcml2YXRlIHN0YXI1RWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblNpemVDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDb2xvcjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xuICB9XG5cbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fcmVhZE9ubHkpID09PSBcInRydWVcIjtcbiAgfVxuXG4gIEBJbnB1dCgnY2hlY2tlZGNvbG9yJykgc2V0IGNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fY2hlY2tlZENvbG9yID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX2NoZWNrZWRDb2xvcikge1xuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX2NoZWNrZWRDb2xvcik7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCd1bmNoZWNrZWRjb2xvcicpIHNldCB1bmNoZWNrZWRjb2xvcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdW5DaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fdW5DaGVja2VkQ29sb3IpIHtcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5uZXh0KHRoaXMuX3VuQ2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3ZhbHVlJykgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0gMDtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPiA1KSB7XG4gICAgICB2YWx1ZSA9IDU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLl92YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdzaXplJykgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIjBweFwiKSB7XG4gICAgICB2YWx1ZSA9IFwiMjRweFwiO1xuICAgIH1cbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcbiAgfVxuXG4gIEBJbnB1dCgncmVhZG9ubHknKSBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xuICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLnJhdGUuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VSZWFkT25seSgpIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6RWxlbWVudFJlZikgPT4ge1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX2NsaWNrZmFsc2UgPSBudWxsO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50Ll9fem9uZV9zeW1ib2xfX21vdXNlb3ZlcmZhbHNlID0gbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkUmVtb3ZlRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLm1ha2VSZWFkT25seSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1ha2VFZGl0YWJsZSgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLm5leHQodGhpcy52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBwcml2YXRlIHJhdGUoZXZlbnQ6TW91c2VFdmVudCkge1xuICAgIGxldCBzdGFyOkhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PiBldmVudC5zcmNFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xuICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIxRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyMkVsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjNFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI0RWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyNUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlTaXplQWxsU3RhcnMoKSB7XG4gICAgaWYgKHRoaXMuX3NpemUpIHtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjpFbGVtZW50UmVmKSA9PiB7XG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICAgIGxldCBoYWxmU2l6ZSA9IChwYXJzZUludChuZXdTaXplKSAqIDEwKSAvIDI0O1xuICAgICAgICBsZXQgaGFsZk1hcmdpbiA9IDAgLSAoKHBhcnNlSW50KG5ld1NpemUpICogMjApIC8gMjQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2l6ZScsIHRoaXMuc2l6ZSk7XG4gICAgICAgIGlmIChzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFsZlwiKSkge1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oYWxmV2lkdGgnLCBgJHtoYWxmU2l6ZX1weGApO1xuICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1oYWxmTWFyZ2luJywgYCR7aGFsZk1hcmdpbn1weGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHNldENoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICBpZiAoc2V0Q2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIubmF0aXZlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNoZWNrZWRDb2xvcicsIHRoaXMuY2hlY2tlZGNvbG9yKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICBzdGFyRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS11bkNoZWNrZWRDb2xvcicsIHRoaXMudW5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZW5lcmF0ZVJhdGluZygpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXJzKCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xuICAgICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcblxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cbiAgICAgICAgKChOdW1iZXIucGFyc2VGbG9hdCh0aGlzLnZhbHVlLnRvU3RyaW5nKCkpICUgMSlcbiAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICBsZXQgaSA9IDE7XG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goc3RhciA9PiB7XG4gICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzdGFyXCIpO1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID49IGkpIHtcbiAgICAgICAgICAvLyBzdGFyIG9uXG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBoYWxkIHN0YXJcbiAgICAgICAgICBpZiAoaGFzRGVjaW1hbHMpIHtcbiAgICAgICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFsZlwiKTtcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGkrKztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJhdGluZ0NvbXBvbmVudCB9IGZyb20gJy4vcmF0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGFyUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFJhdGluZ0NvbXBvbmVudCwgXG4gICAgU3RhclJhdGluZ0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtTdGFyUmF0aW5nQ29tcG9uZW50XVxuICAvL2VudHJ5Q29tcG9uZW50czogW1N0YXJSYXRpbmdDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50IiwiU3ViamVjdCIsIlZpZXdDaGlsZCIsIklucHV0IiwiTmdNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7NEJBSkQ7Ozs7Ozs7QUNBQTtRQWNFO1NBQWlCOzs7O1FBRWpCLGtDQUFROzs7WUFBUjthQUNDOztvQkFkRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxZQUFZO3dCQUN0QixRQUFRLEVBQUUsOENBSVQ7cUJBRUY7Ozs7OEJBWEQ7Ozs7Ozs7QUNBQTtRQXNFRTtZQUFBLGlCQW9DQzt5QkF4RGUsRUFBRTs2QkFLVyxLQUFLO1lBZ0JoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJQyxZQUFPLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7b0JBQzNCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQzFCLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUlBLFlBQU8sRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDO29CQUNsQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3BDLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FB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