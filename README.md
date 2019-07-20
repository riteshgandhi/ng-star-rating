# ng-starrating

[![npm version](https://img.shields.io/badge/npm-v1.0.7-brightgreen.svg)](https://www.npmjs.com/package/ng-starrating/v/1.0.7)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/riteshgandhi/ng-star-rating)

Simple, highly Customizable and Responsive Star Rating Library built using Angular.

For production, use the files from the `dist/` folder.

[Demo](https://angular-smk2vr.stackblitz.io/)

## Why it's better

 - Simple and customizable
 - Light weight. Built using CSS only
 - Responsive


## Installation

Use one of the following methods to add the Star Rating library to your project:

- [Download ZIP](https://github.com/riteshgandhi/ng-star-rating/archive/master.zip)
- `npm install ng-starrating`

## Usage

```TypeScript
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, RatingModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```html
<div style="text-align:center">
  <h1>
    ng-starrating demo
  </h1>
  <star-rating value="5" checkedcolor="red" uncheckedcolor="black" size="24px"    readonly="false" (rate)="onRate($event)"></star-rating>
</div>
```

```TypeScript
//app.components.ts
import { Component } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor() { }

  ngOnInit() { }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
}
```

## Options

Here are the default options

```html
checkedcolor: "gold",
uncheckedcolor: "gray",
size: "24px",
value: 0,
readonly: false,
```

### checkedcolor:

Type: `String`

Checked color for the star. Default color is "gold". You can even use color codes.

### uncheckedcolor:

Type: `String`

Un-checked color for the star. Default color is "gray". You can even use color codes.

### size:

Type: `String`

Size of the Stars in pixels. Default size is 24px.

### value:

Type: `Number`

Value of the Star Rating. Default value is 0. It can be between 0 to 5. It also supports half rating.

### readonly:

Type: `Boolean`

Determines whether the star rating component is readonly. 

## Events

### rate:

Type: EventEmitter

Custom Event, triggers on change of rating value. 

## Build

Star Rating uses [npm](https://www.npmjs.com/get-npm) to manage package dependencies.

## Compatibility

- All modern browsers

## Contributing

All changes should be committed to the files in `src/`.

## Changelog

`v1.0.7 - [2019-07-20]`
- Upgraded to latest Angular version 8.1.1

`v1.0.6 - [2019-01-03]`
- Added custom event "rate"

`v1.0.5 - [2018-12-31]`
- Rating can now be only changed by clicking on the star or by manually setting the value property. Mouse hover won't change the rating

`v1.0.4 - [2018-12-26]`
- Added demo site

`v1.0.3 - [2018-12-26]`
- Removed unwanted packages and updated readme file

`v1.0.2 - [2018-12-26]`
- Minor fixes

`v1.0.1 - [2018-12-26]`
- Initial release

## License

[MIT](/LICENSE)