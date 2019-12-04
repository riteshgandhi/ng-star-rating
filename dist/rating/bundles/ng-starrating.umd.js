(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-starrating', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'rxjs'], factory) :
    (global = global || self, factory(global['ng-starrating'] = {}, global.ng.core, global.ng.forms, global.ng.common, global.rxjs));
}(this, function (exports, core, forms, common, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @nocollapse */
        RatingComponent.ctorParameters = function () { return []; };
        return RatingComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var StarRatingComponent = /** @class */ (function () {
        function StarRatingComponent() {
            var _this = this;
            this.stars = [];
            this._readOnly = false;
            this._totalStars = 5;
            this.rate = new core.EventEmitter();
            if (!this.onStarsCountChange) {
                this.onStarsCountChange = new rxjs.Subject();
                this.onStarsCountChange.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.setStars();
                    _this.generateRating(true);
                    _this.applySizeAllStars();
                    _this.applyColorStyleAllStars(false);
                    _this.addRemoveEvents();
                }));
            }
            if (!this.onValueChange) {
                this.onValueChange = new rxjs.Subject();
                this.onValueChange.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.generateRating();
                    _this.applySizeAllStars();
                }));
            }
            if (!this.onCheckedColorChange) {
                this.onCheckedColorChange = new rxjs.Subject();
                this.onCheckedColorChange.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.applyColorStyleAllStars(true);
                }));
            }
            if (!this.onUnCheckedColorChange) {
                this.onUnCheckedColorChange = new rxjs.Subject();
                this.onUnCheckedColorChange.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.applyColorStyleAllStars(false);
                }));
            }
            if (!this.onSizeChange) {
                this.onSizeChange = new rxjs.Subject();
                this.onSizeChange.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.applySizeAllStars();
                }));
            }
            if (!this.onReadOnlyChange) {
                this.onReadOnlyChange = new rxjs.Subject();
                this.onReadOnlyChange.subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.addRemoveEvents();
                }));
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
                this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
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
                this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
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
                value = (!value || value == null) ? 0 : value;
                value > this.stars.length && (value = this.stars.length);
                this._value = value;
                this._value >= 0 && this.onValueChange.next(this._value);
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
                value = (!value || value == null || value == "0px") ? "24px" : value;
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
        Object.defineProperty(StarRatingComponent.prototype, "totalstars", {
            get: /**
             * @return {?}
             */
            function () {
                return this._totalStars;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._totalStars = value <= 0 ? 5 : value;
                this.onStarsCountChange.next(Number(value));
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
            this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
            this.mainElement.nativeElement.style.cursor = "pointer";
            this.mainElement.nativeElement.title = this.value;
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            function (star) {
                star.addEventListener('click', _this.onRate.bind(_this));
                star.addEventListener('mouseenter', _this.onStar.bind(_this));
                star.style.cursor = "pointer";
                star.title = star.dataset.index;
            }));
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
            this.mainElement.nativeElement.__zone_symbol__mouseleavefalse = null;
            this.mainElement.nativeElement.style.cursor = "default";
            this.mainElement.nativeElement.title = this.value;
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            function (star) {
                star.__zone_symbol__clickfalse = null;
                star.__zone_symbol__mouseenterfalse = null;
                star.style.cursor = "default";
                star.title = "";
            }));
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
        StarRatingComponent.prototype.onRate = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var star = (/** @type {?} */ (event.srcElement));
            /** @type {?} */
            var oldValue = this.value;
            this.value = parseInt(star.dataset.index);
            if (this.value == 0) {
                this.value = 1;
            }
            /** @type {?} */
            var rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
            this.rate.emit(rateValues);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        StarRatingComponent.prototype.onStar = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var star = (/** @type {?} */ (event.srcElement));
            /** @type {?} */
            var currentIndex = parseInt(star.dataset.index);
            for (var index = 0; index < currentIndex; index++) {
                this.stars[index].className = "";
                this.addDefaultClass(this.stars[index]);
                this.addCheckedStarClass(this.stars[index]);
            }
            for (var index = currentIndex; index < this.stars.length; index++) {
                this.stars[index].className = "";
                this.addDefaultClass(this.stars[index]);
            }
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        StarRatingComponent.prototype.offStar = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.generateRating();
        };
        /**
         * @private
         * @param {?} star
         * @return {?}
         */
        StarRatingComponent.prototype.addDefaultClass = /**
         * @private
         * @param {?} star
         * @return {?}
         */
        function (star) {
            star.classList.add(StarRatingComponent.CLS_DEFAULT_STAR);
        };
        /**
         * @private
         * @param {?} star
         * @return {?}
         */
        StarRatingComponent.prototype.addCheckedStarClass = /**
         * @private
         * @param {?} star
         * @return {?}
         */
        function (star) {
            star.classList.add(StarRatingComponent.CLS_CHECKED_STAR);
        };
        /**
         * @private
         * @param {?} star
         * @return {?}
         */
        StarRatingComponent.prototype.addHalfStarClass = /**
         * @private
         * @param {?} star
         * @return {?}
         */
        function (star) {
            star.classList.add(StarRatingComponent.CLS_HALF_STAR);
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
            var _this = this;
            /** @type {?} */
            var starContainer = this.mainElement.nativeElement;
            /** @type {?} */
            var maxStars = __spread(Array(Number(this.totalstars)).keys());
            this.stars.length = 0;
            starContainer.innerHTML = "";
            maxStars.forEach((/**
             * @param {?} starNumber
             * @return {?}
             */
            function (starNumber) {
                /** @type {?} */
                var starElement = document.createElement("span");
                starElement.dataset.index = (starNumber + 1).toString();
                starElement.title = starElement.dataset.index;
                starContainer.appendChild(starElement);
                _this.stars.push(starElement);
            }));
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
                this.stars.length == 0 && this.setStars();
                this.stars.forEach((/**
                 * @param {?} star
                 * @return {?}
                 */
                function (star) {
                    /** @type {?} */
                    var newSize = _this.size.match(/\d+/)[0];
                    /** @type {?} */
                    var halfSize = (parseInt(newSize) * 10) / 24;
                    /** @type {?} */
                    var halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                    star.style.setProperty(StarRatingComponent.VAR_SIZE, _this.size);
                    if (star.classList.contains(StarRatingComponent.CLS_HALF_STAR)) {
                        star.style.setProperty(StarRatingComponent.VAR_HALF_WIDTH, halfSize + "px");
                        star.style.setProperty(StarRatingComponent.VAR_HALF_MARGIN, halfMargin + "px");
                    }
                }));
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
            this.stars.length == 0 && this.setStars();
            this.stars.forEach((/**
             * @param {?} star
             * @return {?}
             */
            function (star) {
                if (setChecked) {
                    _this.applyCheckedColorStyle(star);
                }
                else {
                    _this.applyUnCheckedColorStyle(star);
                }
            }));
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
            starElement.style.setProperty(StarRatingComponent.VAR_CHECKED_COLOR, this.checkedcolor);
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
            starElement.style.setProperty(StarRatingComponent.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
        };
        /**
         * @private
         * @param {?=} forceGenerate
         * @return {?}
         */
        StarRatingComponent.prototype.generateRating = /**
         * @private
         * @param {?=} forceGenerate
         * @return {?}
         */
        function (forceGenerate) {
            var _this = this;
            if (forceGenerate === void 0) { forceGenerate = false; }
            if (this.readonly && !forceGenerate) {
                return;
            }
            this.stars.length == 0 && this.setStars();
            if (this.value >= 0) {
                this.mainElement.nativeElement.title = this.value;
                /** @type {?} */
                var hasDecimals_1 = ((Number.parseFloat(this.value.toString()) % 1)
                    .toString()
                    .substring(3, 2)) ? true : false;
                /** @type {?} */
                var i_1 = 1;
                this.stars.forEach((/**
                 * @param {?} star
                 * @return {?}
                 */
                function (star) {
                    star.className = "";
                    _this.applyColorStyle(star);
                    _this.addDefaultClass(star);
                    if (_this.value >= i_1) {
                        // star on
                        _this.addCheckedStarClass(star);
                    }
                    else {
                        // half star
                        if (hasDecimals_1) {
                            _this.addHalfStarClass(star);
                            hasDecimals_1 = false;
                        }
                    }
                    i_1++;
                }));
            }
        };
        StarRatingComponent.VAR_CHECKED_COLOR = '--checkedColor';
        StarRatingComponent.VAR_UNCHECKED_COLOR = '--unCheckedColor';
        StarRatingComponent.VAR_SIZE = '--size';
        StarRatingComponent.VAR_HALF_WIDTH = '--halfWidth';
        StarRatingComponent.VAR_HALF_MARGIN = '--halfMargin';
        StarRatingComponent.CLS_CHECKED_STAR = 'on';
        StarRatingComponent.CLS_DEFAULT_STAR = 'star';
        StarRatingComponent.CLS_HALF_STAR = 'half';
        StarRatingComponent.INP_CHECKED_COLOR = 'checkedcolor';
        StarRatingComponent.INP_UNCHECKED_COLOR = 'uncheckedcolor';
        StarRatingComponent.INP_VALUE = 'value';
        StarRatingComponent.INP_SIZE = 'size';
        StarRatingComponent.INP_READONLY = 'readonly';
        StarRatingComponent.INP_TOTALSTARS = 'totalstars';
        StarRatingComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'star-rating',
                        template: "<div #starMain>\r\n</div>",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"]
                    }] }
        ];
        /** @nocollapse */
        StarRatingComponent.ctorParameters = function () { return []; };
        StarRatingComponent.propDecorators = {
            mainElement: [{ type: core.ViewChild, args: ['starMain', { static: true },] }],
            rate: [{ type: core.Output }],
            checkedcolor: [{ type: core.Input, args: [StarRatingComponent.INP_CHECKED_COLOR,] }],
            uncheckedcolor: [{ type: core.Input, args: [StarRatingComponent.INP_UNCHECKED_COLOR,] }],
            value: [{ type: core.Input, args: [StarRatingComponent.INP_VALUE,] }],
            size: [{ type: core.Input, args: [StarRatingComponent.INP_SIZE,] }],
            readonly: [{ type: core.Input, args: [StarRatingComponent.INP_READONLY,] }],
            totalstars: [{ type: core.Input, args: [StarRatingComponent.INP_TOTALSTARS,] }]
        };
        return StarRatingComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

    exports.RatingModule = RatingModule;
    exports.StarRatingComponent = StarRatingComponent;
    exports.ɵa = RatingComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-starrating.umd.js.map
