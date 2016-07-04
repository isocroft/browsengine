# Browsengine

This is a small library for detecting different browser engines in use all across the web. it works by processing 
the information available from the browser engine and placing these in the <q>class</q> attribute of the &lt;body&gt; tag.

## Usage
 
After including the script to any page you choose, it can be used on its own or in conjunction with *Modernizr*.
The classes added to the &lt;body&gt; tag can be referenced in your CSS file(s) or in JavaScript.

**Example 1**

---

```css
 /* Using the screen dimensions to style the page */
 [class*='1024x600'] .docked-feedback-box,
 [class*='1024x768'] .docked-feedback-box{
	display:none;
 }

 /* styles for mobile view only */
 [aria-view-mode="mobile"] .row > img{
    margin-left: -25px; 
    margin-right: -25px;
 }   
```

**Example 2**

---

```css
/* used to load a polyfill for emulating box-sizing behaviour in old-IE (in standards mode only) */
body[class*='standards IE6'] [class*='column-'],
body[class*='standards IE7'] [class*='column-']{	
   *behavior: url('./boxsizing.htc');
}

/* when in quirks mode, we make the body 100% transparent */
.quirks {
	opacity:0;
	filter:alpha(opacity=0);
	-ms-filter:"alpha(opacity=0)";
}

/* used with Modernizr loaded - border radius */
.borderradius .yes-moz .right-half-pill{  
   -moz-border-radius:0px 4px 4px 0px;
}

/* using SVG to emulate CSS3 gradients in IE 9.0 */
.cssgradient .yes-moz .banner{
	background-image:-moz-linear-gradient(top, #F5F5F5, #E4E4E4);
	background-image:linear-gradient(top, #F5F5F5, #E4E4E4);
}

.cssgradient .yes-opera .banner{
	background-image:-o-linear-gradient(top, #F5F5F5, #E4E4E4);
	background-image:linear-gradient(top, #F5F5F5, #E4E4E4);
}

.no-cssgradient .IE9 .banner{
	background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgo8bGluZWFyR3JhZGllbnQgaWQ9ImcyMDQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Y1RjVGNSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0U0RTRFNCIgb2Zmc2V0PSIxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZzIwNCkiIC8+Cjwvc3ZnPg==);
}
```

## Support

Available on all major browsers including IE - plus **Browsengine** reports the correct version of IE even if IE is in emulation mode !

## Contributing

Please see the CONTRIBUTING.MD file for more details. Thank you.