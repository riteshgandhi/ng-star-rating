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
        this._totalStars = value <= 0 ? 5 : Math.round(value);
        this.onStarsCountChange.next(this._totalStars);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctc3RhcnJhdGluZy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc3Rhci1yYXRpbmcvc3Rhci1yYXRpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQ3RELFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBUy9CLElBQWEsbUJBQW1CLDJCQUFoQyxNQUFhLG1CQUFtQjtJQWtDOUI7UUFqQ1EsVUFBSyxHQUFtQixFQUFFLENBQUM7UUFNM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQWtHdEIsU0FBSSxHQUEwRixJQUFJLFlBQVksRUFBRSxDQUFDO1FBeEV6SCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN6QixJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFD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Q0FBWSxHQUFXLFVBQVUsQ0FBQztBQUNsQyxrQ0FBYyxHQUFXLFlBQVksQ0FBQztBQUVyQjtJQUF4QyxTQUFTLENBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUFzQixVQUFVO3dEQUFDO0FBMkUvRDtJQUFULE1BQU0sRUFBRTs4QkFBTyxZQUFZO2lEQUErRjtBQUU3RTtJQUE3QyxLQUFLLENBQUMscUJBQW1CLENBQUMsaUJBQWlCLENBQUM7Ozt1REFHNUM7QUFFK0M7SUFBL0MsS0FBSyxDQUFDLHFCQUFtQixDQUFDLG1CQUFtQixDQUFDOzs7eURBRzlDO0FBRXFDO0lBQXJDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxTQUFTLENBQUM7OztnREFJcEM7QUFFb0M7SUFBcEMsS0FBSyxDQUFDLHFCQUFtQixDQUFDLFFBQVEsQ0FBQzs7OytDQUluQztBQUV3QztJQUF4QyxLQUFLLENBQUMscUJBQW1CLENBQUMsWUFBWSxDQUFDOzs7bURBR3ZDO0FBRTBDO0lBQTFDLEtBQUssQ0FBQyxxQkFBbUIsQ0FBQyxjQUFjLENBQUM7OztxREFHekM7QUEzSVUsbUJBQW1CO0lBUC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLGdxQkFBMkM7UUFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLFNBQVM7O0tBQzNDLENBQUM7O0dBRVcsbUJBQW1CLENBeVQvQjtTQXpUWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgXHJcbiAgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0YXItcmF0aW5nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3Rhci1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3N0YXItcmF0aW5nLmNvbXBvbmVudC5jc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5TaGFkb3dEb21cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFyUmF0aW5nQ29tcG9uZW50IHtcclxuICBwcml2YXRlIHN0YXJzOiBBcnJheTxFbGVtZW50PiA9IFtdO1xyXG4gIFxyXG4gIHByaXZhdGUgX2NoZWNrZWRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgX3VuQ2hlY2tlZENvbG9yOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcclxuICBwcml2YXRlIF9zaXplOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBfdG90YWxTdGFyczogbnVtYmVyID0gNTtcclxuICBwcml2YXRlIG9uU3RhcnNDb3VudENoYW5nZTogU3ViamVjdDxudW1iZXI+O1xyXG4gIHByaXZhdGUgb25WYWx1ZUNoYW5nZTogU3ViamVjdDxudW1iZXI+O1xyXG4gIHByaXZhdGUgb25DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIG9uVW5DaGVja2VkQ29sb3JDaGFuZ2U6IFN1YmplY3Q8c3RyaW5nPjtcclxuICBwcml2YXRlIG9uU2l6ZUNoYW5nZTogU3ViamVjdDxzdHJpbmc+O1xyXG4gIHByaXZhdGUgb25SZWFkT25seUNoYW5nZTogU3ViamVjdDxib29sZWFuPjtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX0NIRUNLRURfQ09MT1I6IHN0cmluZyA9ICctLWNoZWNrZWRDb2xvcic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVkFSX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJy0tdW5DaGVja2VkQ29sb3InO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZBUl9TSVpFOiBzdHJpbmcgPSAnLS1zaXplJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9XSURUSDogc3RyaW5nID0gJy0taGFsZldpZHRoJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWQVJfSEFMRl9NQVJHSU46IHN0cmluZyA9ICctLWhhbGZNYXJnaW4nO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19DSEVDS0VEX1NUQVI6IHN0cmluZyA9ICdvbic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQ0xTX0RFRkFVTFRfU1RBUjogc3RyaW5nID0gJ3N0YXInO1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IENMU19IQUxGX1NUQVI6IHN0cmluZyA9ICdoYWxmJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ2NoZWNrZWRjb2xvcic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1VOQ0hFQ0tFRF9DT0xPUjogc3RyaW5nID0gJ3VuY2hlY2tlZGNvbG9yJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfVkFMVUU6IHN0cmluZyA9ICd2YWx1ZSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1NJWkU6IHN0cmluZyA9ICdzaXplJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJTlBfUkVBRE9OTFk6IHN0cmluZyA9ICdyZWFkb25seSc7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSU5QX1RPVEFMU1RBUlM6IHN0cmluZyA9ICd0b3RhbHN0YXJzJztcclxuXHJcbiAgQFZpZXdDaGlsZCgnc3Rhck1haW4nLCB7IHN0YXRpYzogdHJ1ZSB9KSBwcml2YXRlIG1haW5FbGVtZW50OiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGlmICghdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uU3RhcnNDb3VudENoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhcnMoKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXBwbHlTaXplQWxsU3RhcnMoKTtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25WYWx1ZUNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUmF0aW5nKCk7XHJcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5vbkNoZWNrZWRDb2xvckNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25VbkNoZWNrZWRDb2xvckNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZUFsbFN0YXJzKGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm9uU2l6ZUNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uU2l6ZUNoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICAgIHRoaXMub25TaXplQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hcHBseVNpemVBbGxTdGFycygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMub25SZWFkT25seUNoYW5nZSkge1xyXG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgICB0aGlzLm9uUmVhZE9ubHlDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlYWRvbmx5ID8gdGhpcy5tYWtlUmVhZE9ubHkoKSA6IHRoaXMubWFrZUVkaXRhYmxlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWRDb2xvcjtcclxuICB9XHJcblxyXG4gIGdldCB1bmNoZWNrZWRjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VuQ2hlY2tlZENvbG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgc2l6ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemUuY29uY2F0KCghdGhpcy5fc2l6ZS5pbmNsdWRlcyhcInB4XCIpID8gXCJweFwiIDogXCJcIikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl9yZWFkT25seSkgPT09IFwidHJ1ZVwiO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHRvdGFsc3RhcnMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl90b3RhbFN0YXJzO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIHJhdGU6IEV2ZW50RW1pdHRlcjx7IG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIsIHN0YXJSYXRpbmc6IFN0YXJSYXRpbmdDb21wb25lbnQgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9DSEVDS0VEX0NPTE9SKSBzZXQgY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NoZWNrZWRDb2xvciA9IHZhbHVlO1xyXG4gICAgdGhpcy5fY2hlY2tlZENvbG9yICYmIHRoaXMub25DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl9jaGVja2VkQ29sb3IpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1VOQ0hFQ0tFRF9DT0xPUikgc2V0IHVuY2hlY2tlZGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3VuQ2hlY2tlZENvbG9yID0gdmFsdWU7XHJcbiAgICB0aGlzLl91bkNoZWNrZWRDb2xvciAmJiB0aGlzLm9uVW5DaGVja2VkQ29sb3JDaGFuZ2UubmV4dCh0aGlzLl91bkNoZWNrZWRDb2xvcik7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfVkFMVUUpIHNldCB2YWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB2YWx1ZSA9ICghdmFsdWUgfHwgdmFsdWUgPT0gbnVsbCkgPyAwIDogdmFsdWU7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5fdmFsdWUgPj0gMCAmJiB0aGlzLm9uVmFsdWVDaGFuZ2UubmV4dCh0aGlzLl92YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoU3RhclJhdGluZ0NvbXBvbmVudC5JTlBfU0laRSkgc2V0IHNpemUodmFsdWU6IHN0cmluZykge1xyXG4gICAgdmFsdWUgPSAoIXZhbHVlIHx8IHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gXCIwcHhcIikgPyBcIjI0cHhcIiA6IHZhbHVlO1xyXG4gICAgdGhpcy5fc2l6ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblNpemVDaGFuZ2UubmV4dCh0aGlzLl9zaXplKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dChTdGFyUmF0aW5nQ29tcG9uZW50LklOUF9SRUFET05MWSkgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9yZWFkT25seSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlLm5leHQodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KFN0YXJSYXRpbmdDb21wb25lbnQuSU5QX1RPVEFMU1RBUlMpIHNldCB0b3RhbHN0YXJzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3RvdGFsU3RhcnMgPSB2YWx1ZSA8PSAwID8gNSA6IE1hdGgucm91bmQodmFsdWUpO1xyXG4gICAgdGhpcy5vblN0YXJzQ291bnRDaGFuZ2UubmV4dCh0aGlzLl90b3RhbFN0YXJzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFrZUVkaXRhYmxlKCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyOiBhbnkpID0+IHtcclxuICAgICAgc3Rhci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcclxuICAgICAgc3Rhci50aXRsZSA9IHN0YXIuZGF0YXNldC5pbmRleDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYWtlUmVhZE9ubHkoKSB7XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC50aXRsZSA9IHRoaXMudmFsdWU7XHJcbiAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gICAgICBzdGFyLnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG4gICAgICBzdGFyLnRpdGxlID0gXCJcIjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRFdmVudHMoKSB7XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMubWFpbkVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5vZmZTdGFyLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xyXG4gICAgdGhpcy5tYWluRWxlbWVudC5uYXRpdmVFbGVtZW50LnRpdGxlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIHN0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uUmF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgc3Rhci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy5vblN0YXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIHN0YXIuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XHJcbiAgICAgIHN0YXIudGl0bGUgPSBzdGFyLmRhdGFzZXQuaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBwcml2YXRlIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25SYXRlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5yZWFkb25seSkgcmV0dXJuO1xyXG4gICAgbGV0IHN0YXI6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PmV2ZW50LnNyY0VsZW1lbnQ7XHJcbiAgICBsZXQgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgdGhpcy52YWx1ZSA9IHBhcnNlSW50KHN0YXIuZGF0YXNldC5pbmRleCk7XHJcbiAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSAxO1xyXG4gICAgfVxyXG4gICAgbGV0IHJhdGVWYWx1ZXMgPSB7IG9sZFZhbHVlOiBvbGRWYWx1ZSwgbmV3VmFsdWU6IHRoaXMudmFsdWUsIHN0YXJSYXRpbmc6IHRoaXMgfTtcclxuICAgIHRoaXMucmF0ZS5lbWl0KHJhdGVWYWx1ZXMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblN0YXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5KSByZXR1cm47XHJcbiAgICBsZXQgc3RhcjogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcclxuICAgIGxldCBjdXJyZW50SW5kZXggPSBwYXJzZUludChzdGFyLmRhdGFzZXQuaW5kZXgpO1xyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjdXJyZW50SW5kZXg7IGluZGV4KyspIHtcclxuICAgICAgdGhpcy5zdGFyc1tpbmRleF0uY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgdGhpcy5hZGREZWZhdWx0Q2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgICB0aGlzLmFkZENoZWNrZWRTdGFyQ2xhc3ModGhpcy5zdGFyc1tpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGluZGV4ID0gY3VycmVudEluZGV4OyBpbmRleCA8IHRoaXMuc3RhcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIHRoaXMuc3RhcnNbaW5kZXhdLmNsYXNzTmFtZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuYWRkRGVmYXVsdENsYXNzKHRoaXMuc3RhcnNbaW5kZXhdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2ZmU3RhcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgdGhpcy5nZW5lcmF0ZVJhdGluZygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREZWZhdWx0Q2xhc3Moc3RhcjogYW55KSB7XHJcbiAgICBzdGFyLmNsYXNzTGlzdC5hZGQoU3RhclJhdGluZ0NvbXBvbmVudC5DTFNfREVGQVVMVF9TVEFSKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkQ2hlY2tlZFN0YXJDbGFzcyhzdGFyOiBhbnkpIHtcclxuICAgIHN0YXIuY2xhc3NMaXN0LmFkZChTdGFyUmF0aW5nQ29tcG9uZW50LkNMU19DSEVDS0VEX1NUQVIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRIYWxmU3RhckNsYXNzKHN0YXI6IGFueSkge1xyXG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0YXJzKCkge1xyXG4gICAgaWYgKCF0aGlzLm1haW5FbGVtZW50KSByZXR1cm47XHJcbiAgICBsZXQgc3RhckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQgPSB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgbWF4U3RhcnMgPSBbLi4uQXJyYXkoTnVtYmVyKHRoaXMudG90YWxzdGFycykpLmtleXMoKV07XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9IDA7XHJcbiAgICBzdGFyQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBtYXhTdGFycy5mb3JFYWNoKHN0YXJOdW1iZXIgPT4ge1xyXG4gICAgICBsZXQgc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICBzdGFyRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gKHN0YXJOdW1iZXIgKyAxKS50b1N0cmluZygpO1xyXG4gICAgICBzdGFyRWxlbWVudC50aXRsZSA9IHN0YXJFbGVtZW50LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhckVsZW1lbnQpO1xyXG4gICAgICB0aGlzLnN0YXJzLnB1c2goc3RhckVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5U2l6ZUFsbFN0YXJzKCkge1xyXG4gICAgaWYgKHRoaXMuX3NpemUpIHtcclxuICAgICAgdGhpcy5zdGFycy5sZW5ndGggPT0gMCAmJiB0aGlzLnNldFN0YXJzKCk7XHJcbiAgICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc3QgbmV3U2l6ZSA9IHRoaXMuX3NpemUubWF0Y2goL1xcZCsvKVswXTtcclxuICAgICAgICAvLyBsZXQgaGFsZlNpemUgPSBwYXJzZUludChuZXdTaXplLCAxMCkgLyAyO1xyXG4gICAgICAgIC8vIGxldCBoYWxmTWFyZ2luID0gMCAtIHBhcnNlSW50KG5ld1NpemUsIDEwKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBuZXdTaXplID0gdGhpcy5zaXplLm1hdGNoKC9cXGQrLylbMF07XHJcbiAgICAgICAgbGV0IGhhbGZTaXplID0gKHBhcnNlSW50KG5ld1NpemUpICogMTApIC8gMjQ7XHJcbiAgICAgICAgbGV0IGhhbGZNYXJnaW4gPSAwIC0gKChwYXJzZUludChuZXdTaXplKSAqIDIwKSAvIDI0KTtcclxuICAgICAgICBzdGFyLnN0eWxlLnNldFByb3BlcnR5KFN0YXJSYXRpbmdDb21wb25lbnQuVkFSX1NJWkUsIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgaWYgKHN0YXIuY2xhc3NMaXN0LmNvbnRhaW5zKFN0YXJSYXRpbmdDb21wb25lbnQuQ0xTX0hBTEZfU1RBUikpIHtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9XSURUSCwgYCR7aGFsZlNpemV9cHhgKTtcclxuICAgICAgICAgIHN0YXIuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfSEFMRl9NQVJHSU4sIGAke2hhbGZNYXJnaW59cHhgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUNvbG9yU3R5bGVBbGxTdGFycyhzZXRDaGVja2VkOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnN0YXJzLmxlbmd0aCA9PSAwICYmIHRoaXMuc2V0U3RhcnMoKTtcclxuICAgIHRoaXMuc3RhcnMuZm9yRWFjaCgoc3RhcjogYW55KSA9PiB7XHJcbiAgICAgIGlmIChzZXRDaGVja2VkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseUNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXBwbHlVbkNoZWNrZWRDb2xvclN0eWxlKHN0YXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlDb2xvclN0eWxlKHN0YXJFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXBwbHlDaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgICB0aGlzLmFwcGx5VW5DaGVja2VkQ29sb3JTdHlsZShzdGFyRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcGx5Q2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfQ0hFQ0tFRF9DT0xPUiwgdGhpcy5jaGVja2VkY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseVVuQ2hlY2tlZENvbG9yU3R5bGUoc3RhckVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCkge1xyXG4gICAgc3RhckVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoU3RhclJhdGluZ0NvbXBvbmVudC5WQVJfVU5DSEVDS0VEX0NPTE9SLCB0aGlzLnVuY2hlY2tlZGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVSYXRpbmcoZm9yY2VHZW5lcmF0ZTpib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0aGlzLnJlYWRvbmx5ICYmICFmb3JjZUdlbmVyYXRlKSByZXR1cm47XHJcbiAgICBpZiAoIXRoaXMubWFpbkVsZW1lbnQpIHJldHVybjtcclxuICAgIHRoaXMuc3RhcnMubGVuZ3RoID09IDAgJiYgdGhpcy5zZXRTdGFycygpO1xyXG4gICAgaWYgKHRoaXMudmFsdWUgPj0gMCkge1xyXG4gICAgICB0aGlzLm1haW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQudGl0bGUgPSB0aGlzLnZhbHVlO1xyXG5cclxuICAgICAgbGV0IGhhc0RlY2ltYWxzOiBib29sZWFuID1cclxuICAgICAgICAoKE51bWJlci5wYXJzZUZsb2F0KHRoaXMudmFsdWUudG9TdHJpbmcoKSkgJSAxKVxyXG4gICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgIC5zdWJzdHJpbmcoMywgMikpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgbGV0IGkgPSAxO1xyXG4gICAgICB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXI6IGFueSkgPT4ge1xyXG4gICAgICAgIHN0YXIuY2xhc3NOYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFwcGx5Q29sb3JTdHlsZShzdGFyKTtcclxuICAgICAgICB0aGlzLmFkZERlZmF1bHRDbGFzcyhzdGFyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPj0gaSkge1xyXG4gICAgICAgICAgLy8gc3RhciBvblxyXG4gICAgICAgICAgdGhpcy5hZGRDaGVja2VkU3RhckNsYXNzKHN0YXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBoYWxmIHN0YXJcclxuICAgICAgICAgIGlmIChoYXNEZWNpbWFscykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhhbGZTdGFyQ2xhc3Moc3Rhcik7XHJcbiAgICAgICAgICAgIGhhc0RlY2ltYWxzID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkrKztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==