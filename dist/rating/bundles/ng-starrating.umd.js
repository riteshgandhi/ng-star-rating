(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ng-starrating', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'rxjs'], factory) :
    (global = global || self, factory(global['ng-starrating'] = {}, global.ng.core, global.ng.forms, global.ng.common, global.rxjs));
}(this, (function (exports, core, forms, common, rxjs) { 'use strict';

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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var RatingComponent = /** @class */ (function () {
        function RatingComponent() {
        }
        RatingComponent.prototype.ngOnInit = function () {
        };
        RatingComponent = __decorate([
            core.Component({
                selector: 'lib-rating',
                template: "\n    <p>\n      rating works!\n    </p>\n  "
            })
        ], RatingComponent);
        return RatingComponent;
    }());

    var StarRatingComponent = /** @class */ (function () {
        function StarRatingComponent() {
            var _this = this;
            this.stars = [];
            this._readOnly = false;
            this._totalStars = 5;
            this.rate = new core.EventEmitter();
            this.onStarsCountChange = new rxjs.Subject();
            this.onStarsCountChange.subscribe(function () {
                _this.setStars();
                _this.generateRating(true);
                _this.applySizeAllStars();
                _this.applyColorStyleAllStars(false);
                _this.addEvents();
            });
            this.onValueChange = new rxjs.Subject();
            this.onValueChange.subscribe(function () {
                _this.generateRating();
                _this.applySizeAllStars();
            });
            this.onCheckedColorChange = new rxjs.Subject();
            this.onCheckedColorChange.subscribe(function () {
                _this.applyColorStyleAllStars(true);
            });
            this.onUnCheckedColorChange = new rxjs.Subject();
            this.onUnCheckedColorChange.subscribe(function () {
                _this.applyColorStyleAllStars(false);
            });
            this.onSizeChange = new rxjs.Subject();
            this.onSizeChange.subscribe(function () {
                _this.applySizeAllStars();
            });
            this.onReadOnlyChange = new rxjs.Subject();
            this.onReadOnlyChange.subscribe(function () {
                _this.readonly ? _this.makeReadOnly() : _this.makeEditable();
            });
        }
        StarRatingComponent_1 = StarRatingComponent;
        Object.defineProperty(StarRatingComponent.prototype, "checkedcolor", {
            get: function () {
                return this._checkedColor;
            },
            set: function (value) {
                this._checkedColor = value;
                this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRatingComponent.prototype, "uncheckedcolor", {
            get: function () {
                return this._unCheckedColor;
            },
            set: function (value) {
                this._unCheckedColor = value;
                this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRatingComponent.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                value = (!value || value == null) ? 0 : value;
                this._value = value;
                this._value >= 0 && this.onValueChange.next(this._value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRatingComponent.prototype, "size", {
            get: function () {
                return this._size.concat((!this._size.includes("px") ? "px" : ""));
            },
            set: function (value) {
                value = (!value || value == null || value == "0px") ? "24px" : value;
                this._size = value;
                this.onSizeChange.next(this._size);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRatingComponent.prototype, "readonly", {
            get: function () {
                return String(this._readOnly) === "true";
            },
            set: function (value) {
                this._readOnly = value;
                this.onReadOnlyChange.next(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StarRatingComponent.prototype, "totalstars", {
            get: function () {
                return this._totalStars;
            },
            set: function (value) {
                this._totalStars = value <= 0 ? 5 : Math.round(value);
                this.onStarsCountChange.next(this._totalStars);
            },
            enumerable: true,
            configurable: true
        });
        StarRatingComponent.prototype.makeEditable = function () {
            if (!this.mainElement)
                return;
            this.mainElement.nativeElement.style.cursor = "pointer";
            this.mainElement.nativeElement.title = this.value;
            this.stars.forEach(function (star) {
                star.style.cursor = "pointer";
                star.title = star.dataset.index;
            });
        };
        StarRatingComponent.prototype.makeReadOnly = function () {
            if (!this.mainElement)
                return;
            this.mainElement.nativeElement.style.cursor = "default";
            this.mainElement.nativeElement.title = this.value;
            this.stars.forEach(function (star) {
                star.style.cursor = "default";
                star.title = "";
            });
        };
        StarRatingComponent.prototype.addEvents = function () {
            var _this = this;
            if (!this.mainElement)
                return;
            this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
            this.mainElement.nativeElement.style.cursor = "pointer";
            this.mainElement.nativeElement.title = this.value;
            this.stars.forEach(function (star) {
                star.addEventListener('click', _this.onRate.bind(_this));
                star.addEventListener('mouseenter', _this.onStar.bind(_this));
                star.style.cursor = "pointer";
                star.title = star.dataset.index;
            });
        };
        StarRatingComponent.prototype.ngAfterViewInit = function () {
        };
        StarRatingComponent.prototype.onRate = function (event) {
            if (this.readonly)
                return;
            var star = event.srcElement;
            var oldValue = this.value;
            this.value = parseInt(star.dataset.index);
            // if (this.value == 0) {
            //   this.value = 1;
            // }
            var rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
            this.rate.emit(rateValues);
        };
        StarRatingComponent.prototype.onStar = function (event) {
            if (this.readonly)
                return;
            var star = event.srcElement;
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
        StarRatingComponent.prototype.offStar = function (event) {
            this.generateRating();
        };
        StarRatingComponent.prototype.addDefaultClass = function (star) {
            star.classList.add(StarRatingComponent_1.CLS_DEFAULT_STAR);
        };
        StarRatingComponent.prototype.addCheckedStarClass = function (star) {
            star.classList.add(StarRatingComponent_1.CLS_CHECKED_STAR);
        };
        StarRatingComponent.prototype.addHalfStarClass = function (star) {
            star.classList.add(StarRatingComponent_1.CLS_HALF_STAR);
        };
        StarRatingComponent.prototype.setStars = function () {
            var _this = this;
            if (!this.mainElement)
                return;
            var starContainer = this.mainElement.nativeElement;
            var maxStars = __spread(Array(Number(this.totalstars)).keys());
            this.stars.length = 0;
            starContainer.innerHTML = "";
            maxStars.forEach(function (starNumber) {
                var starElement = document.createElement("span");
                starElement.dataset.index = (starNumber + 1).toString();
                starElement.title = starElement.dataset.index;
                starContainer.appendChild(starElement);
                _this.stars.push(starElement);
            });
        };
        StarRatingComponent.prototype.applySizeAllStars = function () {
            var _this = this;
            if (this._size) {
                this.stars.length == 0 && this.setStars();
                this.stars.forEach(function (star) {
                    var newSize = _this.size.match(/\d+/)[0];
                    var halfSize = (parseInt(newSize) * 10) / 24;
                    var halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                    star.style.setProperty(StarRatingComponent_1.VAR_SIZE, _this.size);
                    if (star.classList.contains(StarRatingComponent_1.CLS_HALF_STAR)) {
                        star.style.setProperty(StarRatingComponent_1.VAR_HALF_WIDTH, halfSize + "px");
                        star.style.setProperty(StarRatingComponent_1.VAR_HALF_MARGIN, halfMargin + "px");
                    }
                });
            }
        };
        StarRatingComponent.prototype.applyColorStyleAllStars = function (setChecked) {
            var _this = this;
            this.stars.length == 0 && this.setStars();
            this.stars.forEach(function (star) {
                if (setChecked) {
                    _this.applyCheckedColorStyle(star);
                }
                else {
                    _this.applyUnCheckedColorStyle(star);
                }
            });
        };
        StarRatingComponent.prototype.applyColorStyle = function (starElement) {
            this.applyCheckedColorStyle(starElement);
            this.applyUnCheckedColorStyle(starElement);
        };
        StarRatingComponent.prototype.applyCheckedColorStyle = function (starElement) {
            starElement.style.setProperty(StarRatingComponent_1.VAR_CHECKED_COLOR, this.checkedcolor);
        };
        StarRatingComponent.prototype.applyUnCheckedColorStyle = function (starElement) {
            starElement.style.setProperty(StarRatingComponent_1.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
        };
        StarRatingComponent.prototype.generateRating = function (forceGenerate) {
            var _this = this;
            if (forceGenerate === void 0) { forceGenerate = false; }
            if (!this.mainElement)
                return;
            if (this.readonly && !forceGenerate)
                return;
            //if (this.value >= 0) {
            this.stars.length == 0 && this.setStars();
            this.mainElement.nativeElement.title = this.value;
            var hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            var i = 1;
            this.stars.forEach(function (star) {
                star.className = "";
                _this.applyColorStyle(star);
                _this.addDefaultClass(star);
                if (_this.value >= i) {
                    // star on
                    _this.addCheckedStarClass(star);
                }
                else {
                    // half star
                    if (hasDecimals) {
                        _this.addHalfStarClass(star);
                        hasDecimals = false;
                    }
                }
                i++;
            });
            //}
        };
        var StarRatingComponent_1;
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
        __decorate([
            core.ViewChild('starMain', { static: true })
        ], StarRatingComponent.prototype, "mainElement", void 0);
        __decorate([
            core.Output()
        ], StarRatingComponent.prototype, "rate", void 0);
        __decorate([
            core.Input(StarRatingComponent_1.INP_CHECKED_COLOR)
        ], StarRatingComponent.prototype, "checkedcolor", null);
        __decorate([
            core.Input(StarRatingComponent_1.INP_UNCHECKED_COLOR)
        ], StarRatingComponent.prototype, "uncheckedcolor", null);
        __decorate([
            core.Input(StarRatingComponent_1.INP_VALUE)
        ], StarRatingComponent.prototype, "value", null);
        __decorate([
            core.Input(StarRatingComponent_1.INP_SIZE)
        ], StarRatingComponent.prototype, "size", null);
        __decorate([
            core.Input(StarRatingComponent_1.INP_READONLY)
        ], StarRatingComponent.prototype, "readonly", null);
        __decorate([
            core.Input(StarRatingComponent_1.INP_TOTALSTARS)
        ], StarRatingComponent.prototype, "totalstars", null);
        StarRatingComponent = StarRatingComponent_1 = __decorate([
            core.Component({
                selector: 'star-rating',
                template: "<div #starMain>\n</div>",
                encapsulation: core.ViewEncapsulation.ShadowDom,
                styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"]
            })
        ], StarRatingComponent);
        return StarRatingComponent;
    }());

    var RatingModule = /** @class */ (function () {
        function RatingModule() {
        }
        RatingModule.prototype.ngDoBootstrap = function () { };
        RatingModule = __decorate([
            core.NgModule({
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
            })
        ], RatingModule);
        return RatingModule;
    }());

    exports.RatingModule = RatingModule;
    exports.StarRatingComponent = StarRatingComponent;
    exports.ɵa = RatingComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-starrating.umd.js.map
