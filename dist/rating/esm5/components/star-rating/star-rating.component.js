import { __decorate, __metadata, __read, __spread } from "tslib";
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        var _this = this;
        this.stars = [];
        this._readOnly = false;
        this._totalStars = 5;
        this.rate = new EventEmitter();
        if (!this.onStarsCountChange) {
            this.onStarsCountChange = new Subject();
            this.onStarsCountChange.subscribe(function () {
                _this.setStars();
                _this.generateRating(true);
                _this.applySizeAllStars();
                _this.applyColorStyleAllStars(false);
                _this.addEvents();
                //this.addRemoveEvents();
            });
        }
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
                _this.readonly ? _this.makeReadOnly() : _this.makeEditable();
                //this.addRemoveEvents();
            });
        }
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
            this._totalStars = value <= 0 ? 5 : value;
            this.onStarsCountChange.next(Number(value));
        },
        enumerable: true,
        configurable: true
    });
    // private makeEditable() {
    //   if (!this.mainElement) return;
    //   this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
    //   this.mainElement.nativeElement.style.cursor = "pointer";
    //   this.mainElement.nativeElement.title = this.value;
    //   this.stars.forEach((star: any) => {
    //     star.addEventListener('click', this.onRate.bind(this));
    //     star.addEventListener('mouseenter', this.onStar.bind(this));
    //     star.style.cursor = "pointer";
    //     star.title = star.dataset.index;
    //   });
    // }
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
    // private addRemoveEvents() {
    //   if (this.readonly) {
    //     this.makeReadOnly();
    //   } else {
    //     this.makeEditable();
    //     this.onValueChange.next(this.value);
    //   }
    // }
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
        if (this.value == 0) {
            this.value = 1;
        }
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
                // const newSize = this._size.match(/\d+/)[0];
                // let halfSize = parseInt(newSize, 10) / 2;
                // let halfMargin = 0 - parseInt(newSize, 10);        
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
        if (this.readonly && !forceGenerate)
            return;
        if (!this.mainElement)
            return;
        this.stars.length == 0 && this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            var hasDecimals_1 = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            var i_1 = 1;
            this.stars.forEach(function (star) {
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
            });
        }
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
        ViewChild('starMain', { static: true }),
        __metadata("design:type", ElementRef)
    ], StarRatingComponent.prototype, "mainElement", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], StarRatingComponent.prototype, "rate", void 0);
    __decorate([
        Input(StarRatingComponent_1.INP_CHECKED_COLOR),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StarRatingComponent.prototype, "checkedcolor", null);
    __decorate([
        Input(StarRatingComponent_1.INP_UNCHECKED_COLOR),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StarRatingComponent.prototype, "uncheckedcolor", null);
    __decorate([
        Input(StarRatingComponent_1.INP_VALUE),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StarRatingComponent.prototype, "value", null);
    __decorate([
        Input(StarRatingComponent_1.INP_SIZE),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], StarRatingComponent.prototype, "size", null);
    __decorate([
        Input(StarRatingComponent_1.INP_READONLY),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], StarRatingComponent.prototype, "readonly", null);
    __decorate([
        Input(StarRatingComponent_1.INP_TOTALSTARS),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], StarRatingComponent.prototype, "totalstars", null);
    StarRatingComponent = StarRatingComponent_1 = __decorate([
        Component({
            selector: 'star-rating',
            template: "<div #starMain>\r\n</div>\r\n\r\n<!-- <ng-container *ngFor=\"let star of stars; let i = index;\">\r\n    <span \r\n        (click)=\"!isReadOnly && onRate(i)\" \r\n        (mouseleave)=\"!isReadOnly && generateRating()\"\r\n        (mouseenter)=\"!isReadOnly && onStar(i)\" \r\n        [ngStyle]=\"{\r\n            'font-size': getSize(),\r\n            'width': getSize(),\r\n            pointer: isReadOnly ? 'default' : 'pointer'\r\n        }\" \r\n        [ngClass]=\"{\r\n            on: star.checked,\r\n            half: star.isHalf,\r\n            readOnly: isReadOnly,\r\n            editable: !isReadOnly\r\n        }\"></span>\r\n</ng-container> -->",
            encapsulation: ViewEncapsulation.ShadowDom,
            styles: [":root{--checkedColor:gold;--unCheckedColor:gray;--size:24px;--halfWidth:10px;--halfMargin:-20px}.star{cursor:pointer;color:var(--unCheckedColor);font-size:var(--size);width:var(--size);display:inline-block}.star:last-child{margin-right:0}.star:before{content:'\\2605'}.star.on{color:var(--checkedColor)}.star.half:after{content:'\\2605';color:var(--checkedColor);position:absolute;margin-left:var(--halfMargin);width:var(--halfWidth);overflow:hidden}"]
        }),
        __metadata("design:paramtypes", [])
    ], StarRatingComponent);
    return StarRatingComponent;
}());
export { StarRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFDdEQsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFTL0I7SUFrQ0U7UUFBQSxpQkFpREM7UUFsRk8sVUFBSyxHQUFtQixFQUFFLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQW9HdEIsU0FBSSxHQUEwRixJQUFJLFlBQVksRUFBRSxDQUFDO1FBMUV6SCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQix5QkFBeUI7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMs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QixDQUFDLFNBQVM7O1NBQzNDLENBQUM7O09BRVcsbUJBQW1CLENBaVYvQjtJQUFELDBCQUFDO0NBQUEsQUFqVkQsSUFpVkM7U0FqVlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFxyXG4gIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdGFyLXJhdGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N0YXItcmF0aW5nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdGFyLXJhdGluZy5jb21wb25lbnQuY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBzdGFyczogQXJyYXk8RWxlbWVudD4gPSBbXTtcclxuICBcclxuICBwcml2YXRlIF9jaGVja2VkQ29sb3I6IHN0cmluZztcclxuICBwcml2YXRlIF91bkNoZWNrZWRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfc2l6ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgX3RvdGFsU3RhcnM6IG51bWJlciA9IDU7XHJcbiAgcHJpdmF0ZSBvblN0YXJzQ291bnRDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcclxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcclxuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIG9uUmVhZE9ubHlDaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj47XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS1jaGVja2VkQ29sb3InO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLXVuQ2hlY2tlZENvbG9yJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfU0laRTogc3RyaW5nID0gJy0tc2l6ZSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfV0lEVEg6IHN0cmluZyA9ICctLWhhbGZXaWR0aCc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfTUFSR0lOOiBzdHJpbmcgPSAnLS1oYWxmTWFyZ2luJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfQ0hFQ0tFRF9TVEFSOiBzdHJpbmcgPSAnb24nO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19ERUZBVUxUX1NUQVI6IHN0cmluZyA9ICdzdGFyJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfSEFMRl9TVEFSOiBzdHJpbmcgPSAnaGFsZic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICdjaGVja2VkY29sb3InO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICd1bmNoZWNrZWRjb2xvcic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1ZBTFVFOiBzdHJpbmcgPSAndmFsdWUnO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9TSVpFOiBzdHJpbmcgPSAnc2l6ZSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1JFQURPTkxZOiBzdHJpbmcgPSAncmVhZG9ubHknO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9UT1RBTFNUQVJTOiBzdHJpbmcgPSAndG90YWxzdGFycyc7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAoIXRoaXMub25TdGFyc0NvdW50Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25TdGFyc0NvdW50Q2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXJzKCk7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhdGluZyh0cnVlKTtcclxuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudHMoKTtcclxuICAgICAgICAvL3RoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vblZhbHVlQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcclxuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25TaXplQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVhZG9ubHkgPyB0aGlzLm1ha2VSZWFkT25seSgpIDogdGhpcy5tYWtlRWRpdGFibGUoKTtcclxuICAgICAgICAvL3RoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcclxuICB9XHJcblxyXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRvdGFsc3RhcnMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl90b3RhbFN0YXJzO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHJhdGU6IEV2ZW50RW1pdHRlcjx7IG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIsIHN0YXJSYXRpbmc6IFN0YXJSYXRpbmdDb21wb25lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xyXG4gICAgdGhpcy5fY2hlY2tlZENvbG9yICYmIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1VOQ0hFQ0tFRF9DT0xPUikgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XHJcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciAmJiB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVkFMVUUpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB2YWx1ZSA9ICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkgPyAwIDogdmFsdWU7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdmFsdWUgPj0gMCAmJiB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdmFsdWUgPSAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikgPyBcIjI0cHhcIiA6IHZhbHVlO1xyXG4gICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLm5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1RPVEFMU1RBUlMpIHNldCB0b3RhbHN0YXJzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3RvdGFsU3RhcnMgPSB2YWx1ZSA8PSAwID8gNSA6IHZhbHVlO1xyXG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UubmV4dChOdW1iZXIodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xyXG4gIC8vICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgLy8gICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub2ZmU3Rhci5iaW5kKHRoaXMpKTtcclxuICAvLyAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAvLyAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XHJcbiAgLy8gICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gIC8vICAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblJhdGUuYmluZCh0aGlzKSk7XHJcbiAgLy8gICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25TdGFyLmJpbmQodGhpcykpO1xyXG4gIC8vICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gIC8vICAgICBzdGFyLnRpdGxlID0gc3Rhci5kYXRhc2V0LmluZGV4O1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuICBwcml2YXRlIG1ha2VFZGl0YWJsZSgpIHtcclxuICAgIGlmICghdGhpcy5tYWluRWxlbWVudCkgcmV0dXJuO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgIHN0YXIudGl0bGUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVJlYWRPbmx5KCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBhbnkpID0+IHtcclxuICAgICAgc3Rhci5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgICAgc3Rhci50aXRsZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgYWRkUmVtb3ZlRXZlbnRzKCkge1xyXG4gIC8vICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcclxuICAvLyAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIHRoaXMubWFrZUVkaXRhYmxlKCk7XHJcbiAgLy8gICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRFdmVudHMoKSB7XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uUmF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vblN0YXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgIHN0YXIudGl0bGUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SYXRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkb25seSkgcmV0dXJuO1xyXG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XHJcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XHJcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xyXG4gICAgfVxyXG4gICAgbGV0IHJhdGVWYWx1ZXMgPSB7IG9sZFZhbHVlOiBvbGRWYWx1ZSwgbmV3VmFsdWU6IHRoaXMudmFsdWUsIHN0YXJSYXRpbmc6IHRoaXMgfTtcclxuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5KSByZXR1cm47XHJcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50SW5kZXggPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5zdGFyc1tpbmRleF0uY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gY3VycmVudEluZGV4OyBpbmRleCA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREZWZhdWx0Q2xhc3Moc3RhcjogYW55KSB7XHJcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfREVGQVVMVF9TVEFSKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyOiBhbnkpIHtcclxuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IGFueSkge1xyXG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0YXJzKCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICBsZXQgc3RhckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgbWF4U3RhcnMgPSBbLi4uQXJyYXkoTnVtYmVyKHRoaXMudG90YWxzdGFycykpLmtleXMoKV07XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9IDA7XHJcbiAgICBzdGFyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBtYXhTdGFycy5mb3JFYWNoKHN0YXJOdW1iZXIgPT4ge1xyXG4gICAgICBsZXQgc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gKHN0YXJOdW1iZXIgKyAxKS50b1N0cmluZygpO1xyXG4gICAgICBzdGFyRWxlbWVudC50aXRsZSA9IHN0YXJFbGVtZW50LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhckVsZW1lbnQpO1xyXG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3RhckVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xyXG4gICAgaWYgKHRoaXMuX3NpemUpIHtcclxuICAgICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XHJcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgbmV3U2l6ZSA9IHRoaXMuX3NpemUubWF0Y2goL1xcZCsvKVswXTtcclxuICAgICAgICAvLyBsZXQgaGFsZlNpemUgPSBwYXJzZUludChuZXdTaXplLCAxMCkgLyAyO1xyXG4gICAgICAgIC8vIGxldCBoYWxmTWFyZ2luID0gMCAtIHBhcnNlSW50KG5ld1NpemUsIDEwKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XHJcbiAgICAgICAgbGV0IGhhbGZTaXplID0gKHBhcnNlSW50KG5ld1NpemUpICogMTApIC8gMjQ7XHJcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcclxuICAgICAgICBzdGFyLnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1NJWkUsIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgaWYgKHN0YXIuY2xhc3NMaXN0LmNvbnRhaW5zKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUikpIHtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9NQVJHSU4sIGAke2hhbGZNYXJnaW59cHhgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9PSAwICYmIHRoaXMuc2V0U3RhcnMoKTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfVU5DSEVDS0VEX0NPTE9SLCB0aGlzLnVuY2hlY2tlZGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoZm9yY2VHZW5lcmF0ZTpib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5ICYmICFmb3JjZUdlbmVyYXRlKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMuc3RhcnMubGVuZ3RoID09IDAgJiYgdGhpcy5zZXRTdGFycygpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xyXG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cclxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxyXG4gICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGkgPSAxO1xyXG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gICAgICAgIHN0YXIuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xyXG4gICAgICAgICAgLy8gc3RhciBvblxyXG4gICAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcclxuICAgICAgICAgIGlmIChoYXNEZWNpbWFscykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhhbGZTdGFyQ2xhc3Moc3Rhcik7XHJcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==