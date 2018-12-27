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
        this._readOnly = false;
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
        if (!this.onReadOnlyChange) {
            this.onReadOnlyChange = new Subject();
            this.onReadOnlyChange.subscribe(function () {
                _this.addRemoveEvents();
            });
        }
    }
    Object.defineProperty(StarRatingComponent.prototype, "checkedcolor", {
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
    Object.defineProperty(StarRatingComponent.prototype, "uncheckedcolor", {
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
            return this._size.concat((!this._size.includes("px") ? "px" : ""));
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
    Object.defineProperty(StarRatingComponent.prototype, "readonly", {
        get: /**
         * @return {?}
         */
        function () {
            return String(this._readOnly) === "true";
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        checkedcolor: [{ type: Input, args: ['checkedcolor',] }],
        uncheckedcolor: [{ type: Input, args: ['uncheckedcolor',] }],
        value: [{ type: Input, args: ['value',] }],
        size: [{ type: Input, args: ['size',] }],
        readonly: [{ type: Input, args: ['readonly',] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc3RhcnJhdGluZy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctc3RhcnJhdGluZy9saWIvcmF0aW5nLnNlcnZpY2UudHMiLCJuZzovL25nLXN0YXJyYXRpbmcvbGliL3JhdGluZy5jb21wb25lbnQudHMiLCJuZzovL25nLXN0YXJyYXRpbmcvY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQudHMiLCJuZzovL25nLXN0YXJyYXRpbmcvbGliL3JhdGluZy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSYXRpbmdTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0YXJSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudCdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLXJhdGluZycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICByYXRpbmcgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3Rhci1yYXRpbmcnLFxuICB0ZW1wbGF0ZTogYFxuICA8ZGl2ICNzdGFyTWFpbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiMVwiICNzdGFyMT48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjJcIiAjc3RhcjI+PC9zcGFuPlxuICAgIDxzcGFuIGRhdGEtaW5kZXg9XCIzXCIgI3N0YXIzPjwvc3Bhbj5cbiAgICA8c3BhbiBkYXRhLWluZGV4PVwiNFwiICNzdGFyND48L3NwYW4+XG4gICAgPHNwYW4gZGF0YS1pbmRleD1cIjVcIiAjc3RhcjU+PC9zcGFuPlxuICA8L2Rpdj5cbiAgPHN0eWxlPlxuICAgIDpyb290IHtcbiAgICAgIC0tY2hlY2tlZENvbG9yOiBnb2xkO1xuICAgICAgLS11bkNoZWNrZWRDb2xvcjogZ3JheTtcbiAgICAgIC0tc2l6ZTogMjRweDtcbiAgICAgIC0taGFsZldpZHRoOiAxMHB4O1xuICAgICAgLS1oYWxmTWFyZ2luOiAtMjBweDtcbiAgICB9ICBcbiAgICAuc3RhciB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBjb2xvcjogdmFyKC0tdW5DaGVja2VkQ29sb3IpO1xuICAgICAgZm9udC1zaXplOiB2YXIoLS1zaXplKTtcbiAgICAgIHdpZHRoOiB2YXIoLS1zaXplKTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG4gICAgLnN0YXI6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgfVxuICAgIC5zdGFyOmJlZm9yZSB7XG4gICAgICBjb250ZW50OidcXFxcMjYwNSc7XG4gICAgfVxuICAgIC5zdGFyLm9uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1jaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgICAuc3Rhci5oYWxmOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6J1xcXFwyNjA1JztcbiAgICAgIGNvbG9yOiB2YXIoLS1jaGVja2VkQ29sb3IpO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luLWxlZnQ6IHZhcigtLWhhbGZNYXJnaW4pO1xuICAgICAgd2lkdGg6IHZhcigtLWhhbGZXaWR0aCk7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbiAgPC9zdHlsZT5cbiAgIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBzdGFycyA9IFtdO1xuICBwcml2YXRlIF9jaGVja2VkQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfdW5DaGVja2VkQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfc2l6ZTogc3RyaW5nO1xuICBwcml2YXRlIF9yZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZTogU3ViamVjdDxudW1iZXI+O1xuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XG4gIHByaXZhdGUgb25VbkNoZWNrZWRDb2xvckNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uU2l6ZUNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xuICBwcml2YXRlIG9uUmVhZE9ubHlDaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgQFZpZXdDaGlsZCgnc3Rhck1haW4nKSBwcml2YXRlIG1haW5FbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMScpIHByaXZhdGUgc3RhcjFFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMicpIHByaXZhdGUgc3RhcjJFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyMycpIHByaXZhdGUgc3RhcjNFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyNCcpIHByaXZhdGUgc3RhcjRFbGVtZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdzdGFyNScpIHByaXZhdGUgc3RhcjVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICghdGhpcy5vblZhbHVlQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uU2l6ZUNoYW5nZSkge1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm9uUmVhZE9ubHlDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVFdmVudHMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaGVja2VkY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHVuY2hlY2tlZGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgZ2V0IHNpemUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZS5jb25jYXQoKCF0aGlzLl9zaXplLmluY2x1ZGVzKFwicHhcIikgPyBcInB4XCIgOiBcIlwiKSk7XG4gIH1cblxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xuICB9XG5cbiAgQElucHV0KCdjaGVja2VkY29sb3InKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jaGVja2VkQ29sb3IgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5fY2hlY2tlZENvbG9yKSB7XG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlLm5leHQodGhpcy5fY2hlY2tlZENvbG9yKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3VuY2hlY2tlZGNvbG9yJykgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl91bkNoZWNrZWRDb2xvcikge1xuICAgICAgdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlLm5leHQodGhpcy5fdW5DaGVja2VkQ29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgndmFsdWUnKSBzZXQgdmFsdWUodmFsdWU6IG51bWJlcikge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSAwO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA+IDUpIHtcbiAgICAgIHZhbHVlID0gNTtcbiAgICB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX3ZhbHVlID49IDApIHtcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMuX3ZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3NpemUnKSBzZXQgc2l6ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IFwiMHB4XCIpIHtcbiAgICAgIHZhbHVlID0gXCIyNHB4XCI7XG4gICAgfVxuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLm9uU2l6ZUNoYW5nZS5uZXh0KHRoaXMuX3NpemUpO1xuICB9XG5cbiAgQElucHV0KCdyZWFkb25seScpIHNldCByZWFkb25seSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRPbmx5ID0gdmFsdWU7XG4gICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLm5leHQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlRWRpdGFibGUoKSB7XG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKHN0YXIgPT4ge1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yYXRlLmJpbmQodGhpcykpO1xuICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMucmF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbWFrZVJlYWRPbmx5KCkge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjpFbGVtZW50UmVmKSA9PiB7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fY2xpY2tmYWxzZSA9IG51bGw7XG4gICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuX196b25lX3N5bWJvbF9fbW91c2VvdmVyZmFsc2UgPSBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRSZW1vdmVFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMubWFrZVJlYWRPbmx5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWFrZUVkaXRhYmxlKCk7XG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgfVxuXG4gIHByaXZhdGUgcmF0ZShldmVudDpNb3VzZUV2ZW50KSB7XG4gICAgbGV0IHN0YXI6SFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+IGV2ZW50LnNyY0VsZW1lbnQ7XG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XG4gICAgaWYgKHRoaXMudmFsdWUgPT0gMCkge1xuICAgICAgdGhpcy52YWx1ZSA9IDE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTdGFycygpIHtcbiAgICBpZiAodGhpcy5zdGFycy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjFFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXIyRWxlbWVudCk7XG4gICAgICB0aGlzLnN0YXJzLnB1c2godGhpcy5zdGFyM0VsZW1lbnQpO1xuICAgICAgdGhpcy5zdGFycy5wdXNoKHRoaXMuc3RhcjRFbGVtZW50KTtcbiAgICAgIHRoaXMuc3RhcnMucHVzaCh0aGlzLnN0YXI1RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNpemVBbGxTdGFycygpIHtcbiAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOkVsZW1lbnRSZWYpID0+IHtcbiAgICAgICAgbGV0IG5ld1NpemUgPSB0aGlzLnNpemUubWF0Y2goL1xcZCsvKVswXTtcbiAgICAgICAgbGV0IGhhbGZTaXplID0gKHBhcnNlSW50KG5ld1NpemUpICogMTApIC8gMjQ7XG4gICAgICAgIGxldCBoYWxmTWFyZ2luID0gMCAtICgocGFyc2VJbnQobmV3U2l6ZSkgKiAyMCkgLyAyNCk7XG4gICAgICAgIHN0YXIubmF0aXZlRWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zaXplJywgdGhpcy5zaXplKTtcbiAgICAgICAgaWYgKHN0YXIubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJoYWxmXCIpKSB7XG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhhbGZXaWR0aCcsIGAke2hhbGZTaXplfXB4YCk7XG4gICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWhhbGZNYXJnaW4nLCBgJHtoYWxmTWFyZ2lufXB4YCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoc2V0Q2hlY2tlZDogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3Rhci5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcbiAgICB0aGlzLmFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQpO1xuICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXJFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY2hlY2tlZENvbG9yJywgdGhpcy5jaGVja2VkY29sb3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xuICAgIHN0YXJFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXVuQ2hlY2tlZENvbG9yJywgdGhpcy51bmNoZWNrZWRjb2xvcik7XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmF0aW5nKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhcnMoKTtcbiAgICBpZiAodGhpcy52YWx1ZSA+PSAwKSB7XG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICBsZXQgaGFzRGVjaW1hbHM6IGJvb2xlYW4gPVxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxuICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgICAgLnN1YnN0cmluZygzLCAyKSkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgIGxldCBpID0gMTtcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaChzdGFyID0+IHtcbiAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN0YXJcIik7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xuICAgICAgICAgIC8vIHN0YXIgb25cbiAgICAgICAgICBzdGFyLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm9uXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGhhbGQgc3RhclxuICAgICAgICAgIGlmIChoYXNEZWNpbWFscykge1xuICAgICAgICAgICAgc3Rhci5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYWxmXCIpO1xuICAgICAgICAgICAgaGFzRGVjaW1hbHMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmF0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi9yYXRpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFN0YXJSYXRpbmdDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUmF0aW5nQ29tcG9uZW50LCBcbiAgICBTdGFyUmF0aW5nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0YXJSYXRpbmdDb21wb25lbnRdXG4gIC8vZW50cnlDb21wb25lbnRzOiBbU3RhclJhdGluZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0lBT0U7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozt3QkFKRDs7Ozs7OztBQ0FBO0lBY0U7S0FBaUI7Ozs7SUFFakIsa0NBQVE7OztJQUFSO0tBQ0M7O2dCQWRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLDhDQUlUO2lCQUVGOzs7OzBCQVhEOzs7Ozs7O0FDQUE7SUFzRUU7UUFBQSxpQkFvQ0M7cUJBeERlLEVBQUU7eUJBS1csS0FBSztRQWdCaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO2dCQUMzQixLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BDLEtB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