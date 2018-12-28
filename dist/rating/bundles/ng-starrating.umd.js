(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('@angular/common'), require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-starrating', ['exports', '@angular/forms', '@angular/common', '@angular/core', 'rxjs'], factory) :
    (factory((global['ng-starrating'] = {}),global.ng.forms,global.ng.common,global.ng.core,global.rxjs));
}(this, (function (exports,forms,common,core,rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //import { StarRatingComponent } from '../components/star-rating/star-rating.component'
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
            { type: core.Component, args: [{
                        selector: 'lib-rating',
                        template: "\n    <p>\n      rating works!\n    </p>\n  "
                    }] }
        ];
        RatingComponent.ctorParameters = function () { return []; };
        return RatingComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.makeEditable = /**
         * @private
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
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.makeReadOnly = /**
         * @private
         * @return {?}
         */
            function () {
                this.stars.forEach(function (star) {
                    star.nativeElement.__zone_symbol__clickfalse = null;
                    star.nativeElement.__zone_symbol__mouseoverfalse = null;
                });
            };
        /**
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.addRemoveEvents = /**
         * @private
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
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.ngAfterViewInit = /**
         * @private
         * @return {?}
         */
            function () {
            };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        StarRatingComponent.prototype.rate = /**
         * @private
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var star = ( /** @type {?} */(event.srcElement));
                this.value = parseInt(star.dataset.index);
                if (this.value == 0) {
                    this.value = 1;
                }
            };
        /**
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.setStars = /**
         * @private
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
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.applySizeAllStars = /**
         * @private
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
         * @private
         * @param {?} setChecked
         * @return {?}
         */
        StarRatingComponent.prototype.applyColorStyleAllStars = /**
         * @private
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
         * @private
         * @param {?} starElement
         * @return {?}
         */
        StarRatingComponent.prototype.applyColorStyle = /**
         * @private
         * @param {?} starElement
         * @return {?}
         */
            function (starElement) {
                this.applyCheckedColorStyle(starElement);
                this.applyUnCheckedColorStyle(starElement);
            };
        /**
         * @private
         * @param {?} starElement
         * @return {?}
         */
        StarRatingComponent.prototype.applyCheckedColorStyle = /**
         * @private
         * @param {?} starElement
         * @return {?}
         */
            function (starElement) {
                starElement.style.setProperty('--checkedColor', this.checkedcolor);
            };
        /**
         * @private
         * @param {?} starElement
         * @return {?}
         */
        StarRatingComponent.prototype.applyUnCheckedColorStyle = /**
         * @private
         * @param {?} starElement
         * @return {?}
         */
            function (starElement) {
                starElement.style.setProperty('--unCheckedColor', this.uncheckedcolor);
            };
        /**
         * @private
         * @return {?}
         */
        StarRatingComponent.prototype.generateRating = /**
         * @private
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
            { type: core.Component, args: [{
                        selector: 'star-rating',
                        template: "\n  <div #starMain>\n    <span data-index=\"1\" #star1></span>\n    <span data-index=\"2\" #star2></span>\n    <span data-index=\"3\" #star3></span>\n    <span data-index=\"4\" #star4></span>\n    <span data-index=\"5\" #star5></span>\n  </div>\n  <style>\n    :root {\n      --checkedColor: gold;\n      --unCheckedColor: gray;\n      --size: 24px;\n      --halfWidth: 10px;\n      --halfMargin: -20px;\n    }  \n    .star {\n      cursor: pointer;\n      color: var(--unCheckedColor);\n      font-size: var(--size);\n      width: var(--size);\n      display: inline-block;\n    }\n    .star:last-child {\n      margin-right: 0;\n    }\n    .star:before {\n      content:'\\2605';\n    }\n    .star.on {\n      color: var(--checkedColor);\n    }\n    .star.half:after {\n      content:'\\2605';\n      color: var(--checkedColor);\n      position: absolute;\n      margin-left: var(--halfMargin);\n      width: var(--halfWidth);\n      overflow: hidden;\n    }\n  </style>\n   "
                    }] }
        ];
        StarRatingComponent.ctorParameters = function () { return []; };
        StarRatingComponent.propDecorators = {
            mainElement: [{ type: core.ViewChild, args: ['starMain',] }],
            star1Element: [{ type: core.ViewChild, args: ['star1',] }],
            star2Element: [{ type: core.ViewChild, args: ['star2',] }],
            star3Element: [{ type: core.ViewChild, args: ['star3',] }],
            star4Element: [{ type: core.ViewChild, args: ['star4',] }],
            star5Element: [{ type: core.ViewChild, args: ['star5',] }],
            checkedcolor: [{ type: core.Input, args: ['checkedcolor',] }],
            uncheckedcolor: [{ type: core.Input, args: ['uncheckedcolor',] }],
            value: [{ type: core.Input, args: ['value',] }],
            size: [{ type: core.Input, args: ['size',] }],
            readonly: [{ type: core.Input, args: ['readonly',] }]
        };
        return StarRatingComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RatingModule = /** @class */ (function () {
        function RatingModule() {
        }
        /**
         * @return {?}
         */
        RatingModule.prototype.ngDoBootstrap = /**
         * @return {?}
         */
            function () { };
        RatingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            common.CommonModule
                        ],
                        declarations: [
                            RatingComponent,
                            StarRatingComponent
                        ],
                        exports: [StarRatingComponent],
                        entryComponents: [StarRatingComponent]
                    },] }
        ];
        return RatingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.RatingModule = RatingModule;
    exports.StarRatingComponent = StarRatingComponent;
    exports.ɵa = RatingComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ng-starrating.umd.js.map