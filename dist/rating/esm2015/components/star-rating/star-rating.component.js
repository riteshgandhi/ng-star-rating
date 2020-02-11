var StarRatingComponent_1;
import { __decorate, __metadata } from "tslib";
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
let StarRatingComponent = StarRatingComponent_1 = class StarRatingComponent {
    constructor() {
        this.stars = [];
        this._readOnly = false;
        this._totalStars = 5;
        this.rate = new EventEmitter();
        if (!this.onStarsCountChange) {
            this.onStarsCountChange = new Subject();
            this.onStarsCountChange.subscribe(() => {
                this.setStars();
                this.generateRating(true);
                this.applySizeAllStars();
                this.applyColorStyleAllStars(false);
                this.addEvents();
                //this.addRemoveEvents();
            });
        }
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
        if (!this.onReadOnlyChange) {
            this.onReadOnlyChange = new Subject();
            this.onReadOnlyChange.subscribe(() => {
                this.readonly ? this.makeReadOnly() : this.makeEditable();
                //this.addRemoveEvents();
            });
        }
    }
    get checkedcolor() {
        return this._checkedColor;
    }
    get uncheckedcolor() {
        return this._unCheckedColor;
    }
    get value() {
        return this._value;
    }
    get size() {
        return this._size.concat((!this._size.includes("px") ? "px" : ""));
    }
    get readonly() {
        return String(this._readOnly) === "true";
    }
    get totalstars() {
        return this._totalStars;
    }
    set checkedcolor(value) {
        this._checkedColor = value;
        this._checkedColor && this.onCheckedColorChange.next(this._checkedColor);
    }
    set uncheckedcolor(value) {
        this._unCheckedColor = value;
        this._unCheckedColor && this.onUnCheckedColorChange.next(this._unCheckedColor);
    }
    set value(value) {
        value = (!value || value == null) ? 0 : value;
        this._value = value;
        this._value >= 0 && this.onValueChange.next(this._value);
    }
    set size(value) {
        value = (!value || value == null || value == "0px") ? "24px" : value;
        this._size = value;
        this.onSizeChange.next(this._size);
    }
    set readonly(value) {
        this._readOnly = value;
        this.onReadOnlyChange.next(value);
    }
    set totalstars(value) {
        this._totalStars = value <= 0 ? 5 : value;
        this.onStarsCountChange.next(Number(value));
    }
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
    makeEditable() {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        });
    }
    makeReadOnly() {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.style.cursor = "default";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.style.cursor = "default";
            star.title = "";
        });
    }
    // private addRemoveEvents() {
    //   if (this.readonly) {
    //     this.makeReadOnly();
    //   } else {
    //     this.makeEditable();
    //     this.onValueChange.next(this.value);
    //   }
    // }
    addEvents() {
        if (!this.mainElement)
            return;
        this.mainElement.nativeElement.addEventListener('mouseleave', this.offStar.bind(this));
        this.mainElement.nativeElement.style.cursor = "pointer";
        this.mainElement.nativeElement.title = this.value;
        this.stars.forEach((star) => {
            star.addEventListener('click', this.onRate.bind(this));
            star.addEventListener('mouseenter', this.onStar.bind(this));
            star.style.cursor = "pointer";
            star.title = star.dataset.index;
        });
    }
    ngAfterViewInit() {
    }
    onRate(event) {
        if (this.readonly)
            return;
        let star = event.srcElement;
        let oldValue = this.value;
        this.value = parseInt(star.dataset.index);
        if (this.value == 0) {
            this.value = 1;
        }
        let rateValues = { oldValue: oldValue, newValue: this.value, starRating: this };
        this.rate.emit(rateValues);
    }
    onStar(event) {
        if (this.readonly)
            return;
        let star = event.srcElement;
        let currentIndex = parseInt(star.dataset.index);
        for (let index = 0; index < currentIndex; index++) {
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
            this.addCheckedStarClass(this.stars[index]);
        }
        for (let index = currentIndex; index < this.stars.length; index++) {
            this.stars[index].className = "";
            this.addDefaultClass(this.stars[index]);
        }
    }
    offStar(event) {
        this.generateRating();
    }
    addDefaultClass(star) {
        star.classList.add(StarRatingComponent_1.CLS_DEFAULT_STAR);
    }
    addCheckedStarClass(star) {
        star.classList.add(StarRatingComponent_1.CLS_CHECKED_STAR);
    }
    addHalfStarClass(star) {
        star.classList.add(StarRatingComponent_1.CLS_HALF_STAR);
    }
    setStars() {
        if (!this.mainElement)
            return;
        let starContainer = this.mainElement.nativeElement;
        let maxStars = [...Array(Number(this.totalstars)).keys()];
        this.stars.length = 0;
        starContainer.innerHTML = "";
        maxStars.forEach(starNumber => {
            let starElement = document.createElement("span");
            starElement.dataset.index = (starNumber + 1).toString();
            starElement.title = starElement.dataset.index;
            starContainer.appendChild(starElement);
            this.stars.push(starElement);
        });
    }
    applySizeAllStars() {
        if (this._size) {
            this.stars.length == 0 && this.setStars();
            this.stars.forEach((star) => {
                // const newSize = this._size.match(/\d+/)[0];
                // let halfSize = parseInt(newSize, 10) / 2;
                // let halfMargin = 0 - parseInt(newSize, 10);        
                let newSize = this.size.match(/\d+/)[0];
                let halfSize = (parseInt(newSize) * 10) / 24;
                let halfMargin = 0 - ((parseInt(newSize) * 20) / 24);
                star.style.setProperty(StarRatingComponent_1.VAR_SIZE, this.size);
                if (star.classList.contains(StarRatingComponent_1.CLS_HALF_STAR)) {
                    star.style.setProperty(StarRatingComponent_1.VAR_HALF_WIDTH, `${halfSize}px`);
                    star.style.setProperty(StarRatingComponent_1.VAR_HALF_MARGIN, `${halfMargin}px`);
                }
            });
        }
    }
    applyColorStyleAllStars(setChecked) {
        this.stars.length == 0 && this.setStars();
        this.stars.forEach((star) => {
            if (setChecked) {
                this.applyCheckedColorStyle(star);
            }
            else {
                this.applyUnCheckedColorStyle(star);
            }
        });
    }
    applyColorStyle(starElement) {
        this.applyCheckedColorStyle(starElement);
        this.applyUnCheckedColorStyle(starElement);
    }
    applyCheckedColorStyle(starElement) {
        starElement.style.setProperty(StarRatingComponent_1.VAR_CHECKED_COLOR, this.checkedcolor);
    }
    applyUnCheckedColorStyle(starElement) {
        starElement.style.setProperty(StarRatingComponent_1.VAR_UNCHECKED_COLOR, this.uncheckedcolor);
    }
    generateRating(forceGenerate = false) {
        if (this.readonly && !forceGenerate)
            return;
        if (!this.mainElement)
            return;
        this.stars.length == 0 && this.setStars();
        if (this.value >= 0) {
            this.mainElement.nativeElement.title = this.value;
            let hasDecimals = ((Number.parseFloat(this.value.toString()) % 1)
                .toString()
                .substring(3, 2)) ? true : false;
            let i = 1;
            this.stars.forEach((star) => {
                star.className = "";
                this.applyColorStyle(star);
                this.addDefaultClass(star);
                if (this.value >= i) {
                    // star on
                    this.addCheckedStarClass(star);
                }
                else {
                    // half star
                    if (hasDecimals) {
                        this.addHalfStarClass(star);
                        hasDecimals = false;
                    }
                }
                i++;
            });
        }
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
export { StarRatingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQ3RELFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBUy9CLElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFtQjtJQWtDOUI7UUFqQ1EsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQW9HdEIsU0FBSSxHQUEwRixJQUFJLFlBQVksRUFBRSxDQUFDO1FBMUV6SCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIseUJBQXlCO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUks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OlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFxyXG4gIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdGFyLXJhdGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N0YXItcmF0aW5nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdGFyLXJhdGluZy5jb21wb25lbnQuY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uU2hhZG93RG9tXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XHJcbiAgcHJpdmF0ZSBzdGFyczogQXJyYXk8RWxlbWVudD4gPSBbXTtcclxuICBcclxuICBwcml2YXRlIF9jaGVja2VkQ29sb3I6IHN0cmluZztcclxuICBwcml2YXRlIF91bkNoZWNrZWRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfc2l6ZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgX3RvdGFsU3RhcnM6IG51bWJlciA9IDU7XHJcbiAgcHJpdmF0ZSBvblN0YXJzQ291bnRDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcclxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2U6IFN1YmplY3Q8bnVtYmVyPjtcclxuICBwcml2YXRlIG9uQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBvblVuQ2hlY2tlZENvbG9yQ2hhbmdlOiBTdWJqZWN0PHN0cmluZz47XHJcbiAgcHJpdmF0ZSBvblNpemVDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIG9uUmVhZE9ubHlDaGFuZ2U6IFN1YmplY3Q8Ym9vbGVhbj47XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9DSEVDS0VEX0NPTE9SOiBzdHJpbmcgPSAnLS1jaGVja2VkQ29sb3InO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLXVuQ2hlY2tlZENvbG9yJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfU0laRTogc3RyaW5nID0gJy0tc2l6ZSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfV0lEVEg6IHN0cmluZyA9ICctLWhhbGZXaWR0aCc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0hBTEZfTUFSR0lOOiBzdHJpbmcgPSAnLS1oYWxmTWFyZ2luJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfQ0hFQ0tFRF9TVEFSOiBzdHJpbmcgPSAnb24nO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19ERUZBVUxUX1NUQVI6IHN0cmluZyA9ICdzdGFyJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBDTFNfSEFMRl9TVEFSOiBzdHJpbmcgPSAnaGFsZic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICdjaGVja2VkY29sb3InO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9VTkNIRUNLRURfQ09MT1I6IHN0cmluZyA9ICd1bmNoZWNrZWRjb2xvcic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1ZBTFVFOiBzdHJpbmcgPSAndmFsdWUnO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9TSVpFOiBzdHJpbmcgPSAnc2l6ZSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1JFQURPTkxZOiBzdHJpbmcgPSAncmVhZG9ubHknO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElOUF9UT1RBTFNUQVJTOiBzdHJpbmcgPSAndG90YWxzdGFycyc7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ3N0YXJNYWluJywgeyBzdGF0aWM6IHRydWUgfSkgcHJpdmF0ZSBtYWluRWxlbWVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBpZiAoIXRoaXMub25TdGFyc0NvdW50Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25TdGFyc0NvdW50Q2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXJzKCk7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVJhdGluZyh0cnVlKTtcclxuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseUNvbG9yU3R5bGVBbGxTdGFycyhmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudHMoKTtcclxuICAgICAgICAvL3RoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vblZhbHVlQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVSYXRpbmcoKTtcclxuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uQ2hlY2tlZENvbG9yQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnModHJ1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vblVuQ2hlY2tlZENvbG9yQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXBwbHlDb2xvclN0eWxlQWxsU3RhcnMoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25TaXplQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlID0gbmV3IFN1YmplY3QoKTtcclxuICAgICAgdGhpcy5vblNpemVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5U2l6ZUFsbFN0YXJzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5vblJlYWRPbmx5Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25SZWFkT25seUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVhZG9ubHkgPyB0aGlzLm1ha2VSZWFkT25seSgpIDogdGhpcy5tYWtlRWRpdGFibGUoKTtcclxuICAgICAgICAvL3RoaXMuYWRkUmVtb3ZlRXZlbnRzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcclxuICB9XHJcblxyXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRvdGFsc3RhcnMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl90b3RhbFN0YXJzO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHJhdGU6IEV2ZW50RW1pdHRlcjx7IG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIsIHN0YXJSYXRpbmc6IFN0YXJSYXRpbmdDb21wb25lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xyXG4gICAgdGhpcy5fY2hlY2tlZENvbG9yICYmIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1VOQ0hFQ0tFRF9DT0xPUikgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XHJcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciAmJiB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVkFMVUUpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB2YWx1ZSA9ICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkgPyAwIDogdmFsdWU7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdmFsdWUgPj0gMCAmJiB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdmFsdWUgPSAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikgPyBcIjI0cHhcIiA6IHZhbHVlO1xyXG4gICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLm5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1RPVEFMU1RBUlMpIHNldCB0b3RhbHN0YXJzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3RvdGFsU3RhcnMgPSB2YWx1ZSA8PSAwID8gNSA6IHZhbHVlO1xyXG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UubmV4dChOdW1iZXIodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xyXG4gIC8vICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgLy8gICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMub2ZmU3Rhci5iaW5kKHRoaXMpKTtcclxuICAvLyAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAvLyAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XHJcbiAgLy8gICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gIC8vICAgICBzdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vblJhdGUuYmluZCh0aGlzKSk7XHJcbiAgLy8gICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMub25TdGFyLmJpbmQodGhpcykpO1xyXG4gIC8vICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gIC8vICAgICBzdGFyLnRpdGxlID0gc3Rhci5kYXRhc2V0LmluZGV4O1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gfVxyXG5cclxuICBwcml2YXRlIG1ha2VFZGl0YWJsZSgpIHtcclxuICAgIGlmICghdGhpcy5tYWluRWxlbWVudCkgcmV0dXJuO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgIHN0YXIudGl0bGUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZVJlYWRPbmx5KCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBhbnkpID0+IHtcclxuICAgICAgc3Rhci5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgICAgc3Rhci50aXRsZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgYWRkUmVtb3ZlRXZlbnRzKCkge1xyXG4gIC8vICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcclxuICAvLyAgICAgdGhpcy5tYWtlUmVhZE9ubHkoKTtcclxuICAvLyAgIH0gZWxzZSB7XHJcbiAgLy8gICAgIHRoaXMubWFrZUVkaXRhYmxlKCk7XHJcbiAgLy8gICAgIHRoaXMub25WYWx1ZUNoYW5nZS5uZXh0KHRoaXMudmFsdWUpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRFdmVudHMoKSB7XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uUmF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vblN0YXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgIHN0YXIudGl0bGUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SYXRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkb25seSkgcmV0dXJuO1xyXG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XHJcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XHJcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xyXG4gICAgfVxyXG4gICAgbGV0IHJhdGVWYWx1ZXMgPSB7IG9sZFZhbHVlOiBvbGRWYWx1ZSwgbmV3VmFsdWU6IHRoaXMudmFsdWUsIHN0YXJSYXRpbmc6IHRoaXMgfTtcclxuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5KSByZXR1cm47XHJcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50SW5kZXggPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5zdGFyc1tpbmRleF0uY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gY3VycmVudEluZGV4OyBpbmRleCA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREZWZhdWx0Q2xhc3Moc3RhcjogYW55KSB7XHJcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfREVGQVVMVF9TVEFSKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyOiBhbnkpIHtcclxuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IGFueSkge1xyXG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0YXJzKCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICBsZXQgc3RhckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgbWF4U3RhcnMgPSBbLi4uQXJyYXkoTnVtYmVyKHRoaXMudG90YWxzdGFycykpLmtleXMoKV07XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9IDA7XHJcbiAgICBzdGFyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBtYXhTdGFycy5mb3JFYWNoKHN0YXJOdW1iZXIgPT4ge1xyXG4gICAgICBsZXQgc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gKHN0YXJOdW1iZXIgKyAxKS50b1N0cmluZygpO1xyXG4gICAgICBzdGFyRWxlbWVudC50aXRsZSA9IHN0YXJFbGVtZW50LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhckVsZW1lbnQpO1xyXG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3RhckVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xyXG4gICAgaWYgKHRoaXMuX3NpemUpIHtcclxuICAgICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XHJcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgbmV3U2l6ZSA9IHRoaXMuX3NpemUubWF0Y2goL1xcZCsvKVswXTtcclxuICAgICAgICAvLyBsZXQgaGFsZlNpemUgPSBwYXJzZUludChuZXdTaXplLCAxMCkgLyAyO1xyXG4gICAgICAgIC8vIGxldCBoYWxmTWFyZ2luID0gMCAtIHBhcnNlSW50KG5ld1NpemUsIDEwKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XHJcbiAgICAgICAgbGV0IGhhbGZTaXplID0gKHBhcnNlSW50KG5ld1NpemUpICogMTApIC8gMjQ7XHJcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcclxuICAgICAgICBzdGFyLnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1NJWkUsIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgaWYgKHN0YXIuY2xhc3NMaXN0LmNvbnRhaW5zKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUikpIHtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9NQVJHSU4sIGAke2hhbGZNYXJnaW59cHhgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9PSAwICYmIHRoaXMuc2V0U3RhcnMoKTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfVU5DSEVDS0VEX0NPTE9SLCB0aGlzLnVuY2hlY2tlZGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoZm9yY2VHZW5lcmF0ZTpib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5ICYmICFmb3JjZUdlbmVyYXRlKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMuc3RhcnMubGVuZ3RoID09IDAgJiYgdGhpcy5zZXRTdGFycygpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xyXG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cclxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxyXG4gICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGkgPSAxO1xyXG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gICAgICAgIHN0YXIuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xyXG4gICAgICAgICAgLy8gc3RhciBvblxyXG4gICAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcclxuICAgICAgICAgIGlmIChoYXNEZWNpbWFscykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhhbGZTdGFyQ2xhc3Moc3Rhcik7XHJcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==