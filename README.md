# Browsengine

This is a small library for detecting different browser engines, their versions and the devices they run on as is used all across the web. it works by processing the information available from the browser engine and placing these in the <q>class</q> attribute of the &lt;body&gt; tag.

## Preamble

The JavaScript community has and will always deal with _browser quirks_ (mostly for CSS and JavaScript). These are the many anomalies that continue and will continue give rise to cross-browser issues (not because the specs from IEEE or W3C don't spell things out well). It's always going to be with us for a long time to come. Why ? because software (like browsers) is built by humans for humans and humans make mistakes and wrong judgement. Some quirks are usually atrributed to one browser at a given version (or a range of versions). Others are attributed to more than one. _Browser Sniffing_ using the **User-Agent** string (`navigator.userAgent`) used to be the way to go in the past to shim or workaround these anomalies. Browser sniffing had issues because the Javascript logic that was written for one version of a given browser could fail when a new version of that same browser was released. In recent times, we now have **Feature Detection** which is more (infact 95%) reliable than **Browser Sniffing**. That's why Javascript libraries like the famous [**Modernizr**](https://github.com/Modernizr/Modernizr) is used heavily on websites and web applications today.

## The Problem

**Feature detection** is a great leap forward and a more gratifying and productive shift from the old way of doing things using **Browser sniffing**. But sometimes, feature detection can give false positives for native browser features. More so, there are known issues with specific browser engine types (not necessarily specific to one browser vendor) e.g **Trident** (the rendering engine for IE and Avant) has a problem with `console.log()` calls whenever the dev tools isn't open in the browser. **Presto** (the rendering engine for old Opera up till version 14) on the other hand supports 2 APIs for registerig DOM events (`atttachEvent()` and `addEventListener()`). These issues cannot usually be dealt with in isolation (and it would be silly to do so).

Here's an excerpt from a book titled **Professional JavaScript for Web Developers** written by Nicholas C. Zakas (Dec 2011)

>As mentioned earlier, the exact name and version of the browser isn't as important as the rendering engine being used. If Firefox, Camino and Netscape all use the same version of _Gecko_, their capabilities will be the same.

However, Zakas, with all due respect to him as the professional, didn't exaclty do justice to this very important manner of thinking in the code examples and explanations that followed the paragraph where this excerpt was taken. For instance, _Opera_ isn't a rending engine, _Presto_ is.

This shows that this manner of dealing with cross-browser quirks is very helpful and effective.

## The Solution

This is where a new concept comes in. I call it **Engine Detection**. It's a concept that plays nice with **Feature detection** too. It compliments **Feature detection** whenever there are false positive reports by a browser (i.e. the browser says it supports something but there are bugs/quirks in the way it supports it). For example, Firefox supports `navigator.onLine`. So, feature detection will report a positive (albeit a false one in versions 4 to 41) for this feature. However, Firefox has [a well known quirk](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine) with its support. In this case (with Firefox), we need a combination of _Feature_ and _Engine_ detection which will help in [shimming](https://codepen.io/isocroft/pen/OxLeBw) this quirk/weird behavior. When it comes to **Engine Detection**, we deal with the version number of the rendering engine (mostly) and not the version of the browser. Why ? Because, it makes more sense as the engine reveals itself even more in what it supports and doesn't support. For instance, Firefox (version 3.6) uses **Gecko version 1.9.2**. Similarly, old Opera (version 11.62) uses **Presto version 2.10.229**.

## Usage
 
```html
  <!DOCTYPE html>
  <html lang="en">
     <head>
	      <meta charest="utf-8">
		    <title>Browsengine - TestDrvie</title>
		  
		    <script type="text/javascript" src="/path/to/Modernizr.js"></script>
		    <script type="text/javascript" src="/path/to/browsengine.js"></script>
	   </head>
	   <body class="page"> <!-- the class attribute of the {body} tag gets filled up after page load -->

        <script type="text/javascript">

            if(window.webpage.engine.webkit){
                alert("webkit rendering engine");
            }else if(window.webpage.engine.blink){
                alert("blink rendering engine");
            }else if(window.webpage.engine.presto){
                alert("presto rendering engine");
            }else if(window.webpage.engine.edgehtml){
                alert("edgehtml rendering engine");
            }else if(window.webpage.engine.trident){
                alert("trident redering engine");
            }else if(window.webpage.engine.gecko){
                alert("gecko rendering engine");
            }

            
                // the console object is never available when dev tools is not open
                if(!window.console && window.webpage.old.ie)){
                    console = {
                        hlog:function(msg){
                            document.body.innerHTML += msg;
                        }
                    }
                }else{
                    window.console.hlog = function(msg){
                            document.body.innerHTML += msg;
                    }
                }

            /* Browsengine exposes an object {webpage} on the global window object */

            console.hlog(document.body.className);
            console.hlog(window.webpage.device.os); // operating system for the device e.g "Windows"
            console.hlog(window.webpage.device.screen.type); // screen type e.g. "retina or "normal"
            console.hlog(window.webpage.device.screen.dpi);
            console.hlog(window.webpage.device.type); // the device type e.g. "mobile", "tablet", "desktop" or "tv"
	
	   /* The `navigator` object now supports `navigator.oscpu` and `navigator.ostitle` non-standard properties - polyfilled (Firefox is the only browser that support `navigator.oscpu` natively */
	
	     console.log(navigator.oscpu); // operating system cpu info e.g. "Windows NT 6.1"
        </script>
	 </body>
  </html>
```
After including the script to any page you choose (like above), it can be used on its own or in conjunction with *Modernizr*. The classes added to the &lt;body&gt; tag can be referenced in your CSS file(s) or in JavaScript.

**Example 1**

---

```css

 /* grouping styles based on engines */

 body.yes-webkit div.top-row{ /* Webkits -> Safari, Chrome, Arora, WebOS browser */
    display:-webkit-flex;
    diaplay:flex;
    -webkit-flex-direction:row-reverse;
    flex-direction:row-reverse;
 }

 body.yes-moz a[data-intro-text]:before{ /* Geckos -> Firefox, WebSpirit, IceDragon */
    content:" This is a link to Facebook"; /* Accessibility for screen readers for visually-impared/non-sighted users */
    width: 1px;
    height:1px;
    overflow:hidden;
    position:absolute;
    top:-10px;
 }

 /* Using the screen dimensions to style the page */

 [class*='1024x600'] .docked-feedback-box,
 [class*='1024x768'] .docked-feedback-box{
	  display:inline-block;
    transform:rotate(-90deg);
    line-height:normal;
    vertical-align:normal;
 }

 /* hide tooltips on tablet view only */

 span.tooltip{
    display:inline-block;
 }

 /* in opera-mini, make tooltips look a bit different */

 body.operamini[aria-view-mode="mobile"] span.tooltip {
    padding:5px;
    display:table-cell;
    vertical-align:middle; /* culled from Ire Aderinokuns' Code Pen */
 }
 
 /* in opera-mobile */
 body.operamobile[aria-view-mode="mobile"] span.tooltip {
    display:inline-block;
 }
 
 [aria-view-mode="tablet"] span.tooltip{
    display:none !important;
 }   

 /* styles for tablet view only */

 body[aria-view-mode="tablet"] .img-col > img{
    margin-left: -25px; 
    margin-right: -25px;
 }   
```


**Example 2**

---

```css

/* prevent double-tap zoom on touch devices (Desktop, Tablet and/or Mobile) */

body[aria-touch-capable="true"] .toggle-btn{
    -ms-touch-action:none;
    touch-action:none;
}


/* load a polyfill for emulating box-sizing behaviour in old-IE (in standards mode only) */

body[class*='standards IE6'] [class*='column-'],
body[class*='standards IE7'] [class*='column-']{	
   *behavior: url('./boxsizing.htc');
}

/* when browser is in quirks mode, we make the body 70% transparent and disable all controls */

.quirks {
	opacity:0.7;
	filter:alpha(opacity=70);
	-ms-filter:"alpha(opacity=70)";
  cursor:not-allowed;
}

/* used with Modernizr loaded - border radius */
.borderradius .yes-moz .right-half-pill{  
   -moz-border-radius:0px 4px 4px 0px;
   background-image:-moz-linear-gradient(top, #F5F5F5, #E4E4E4);
}

/* target all gecko browsers firefox, UC, Maxthone */
html .gecko .banner {
  	max-width:100%;
  	height:400px;
	-moz-transition:all .7s linear;
  	background-size:cover;
}

/* target an edge browser for svg banner image */
.svg .microsoftedge .banner{
   background-size:cover;
   height:400px;
   max-width:100%;
   background-image:url('./assets/img/vectors/flakes.svg');
}

/* ignore the newer blink engine for Opera. only apply gradient to presto engine for Desktop Opera */

.cssgradient .presto.yes-opera .banner{
	background-image:-o-linear-gradient(top, #F5F5F5, #E4E4E4);
}

.cssgradients .banner{	
	background-image:linear-gradient(top, #F5F5F5, #E4E4E4);
}

/* using SVG to emulate CSS3 gradients only for IE 9.0 */
.no-cssgradient.svg .trident.IE9 .banner{
	background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgo8bGluZWFyR3JhZGllbnQgaWQ9ImcyMDQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Y1RjVGNSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0U0RTRFNCIgb2Zmc2V0PSIxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZzIwNCkiIC8+Cjwvc3ZnPg==);
}

/* display an upgrade messsage for users surfing with old browsers */
.browser-update {
  position:relative;
  display:none !important;
}

.browser-update:after {
   content:"This browser is very old. For better experience please upgrade";
   display:block;
   position:absolute;
   top:1px;
   z-index:10;
   color:#fff;
   font-weight:bold;
}

.oldMoz .browser-update,
.oldChrome .browser-update,
.oldSafari .browser-update,
.oldOpera .browser-update{
   display:block;
}

/* target retina displays for styling */
[aria-screen-view="retina"] .dropzone{
   background-color:hsl(120, 100%, 75%);
}
```

## Support

Available on all major browsers including IE - plus **Browsengine** reports the correct version of IE even if IE is in emulation mode !

## Contributing

Please see the CONTRIBUTING.MD file for more details. Thank you.
