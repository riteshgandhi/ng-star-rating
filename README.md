# ng-starrating

[![npm version](https://img.shields.io/badge/npm-v1.0.20-brightgreen.svg)](https://www.npmjs.com/package/ng-starrating/v/1.0.20)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/riteshgandhi/ng-star-rating)

Simple, highly Customizable and Responsive Star Rating Library built using Angular.

For production, use the files from the `dist/` folder.

[Demo](https://ng-starratingdemo.stackblitz.io/)

Edge browser support: Import webcomponents bundle for Edge browser
```
<script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.4.1/webcomponents-bundle.min.js"></script>
```

## Why it's better

 - Simple and customizable
 - Light weight. Built using CSS only
 - Responsive
 - Parameterized total number of stars 

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
  <star-rating value="5" totalstars="5" checkedcolor="red" uncheckedcolor="black" size="24px" readonly="false" (rate)="onRate($event)"></star-rating>
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
totalstars: 5
```

### totalstars:

Type: `Number`

Adds the number of stars. Default value is 5

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

`v1.0.20 -  [2020-02-16]`
- Added missing keywords and repository information

`v1.0.19,18..16 -  [2020-02-16]`
- Fixed issues with Angular 9 upgrade. Star Rating now works with Ivy renderer

`v1.0.15 - [2020-02-11]`

`v1.0.14 - [2020-02-11]`

`v1.0.13 - [2020-02-11]`
- minor fixes 

`v1.0.12 - [2020-02-10]`
- Fixed issue with rating not initializing with more than 5 stars when total stars equals 10 
- Upgraded to latest Angular version 9.0.0

`v1.0.11 - [2019-12-10]`
- Minor bug fix

`v1.0.10 - [2019-12-03]`
- Fixed issue with readonly property

`v1.0.9 - [2019-12-02]`
- Added new property "totalstars" to allow parameterization of number of stars

`v1.0.8 - Beta [2019-12-02]`
- Added new property "totalstars" to allow parameterization of number of stars

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