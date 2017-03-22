﻿# Browsengine

This is a small library for detecting different browser engines in use all across the web. it works by processing 
the information available from the browser engine and placing these in the <q>class</q> attribute of the &lt;body&gt; tag.

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
            console.hlog(window.webpage.device.os);
            console.hlog(window.webpage.device.screen.type);
            console.hlog(window.webpage.device.screen.dpi);
            console.hlog(window.webpage.device.type);
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
    -webkit-flex-direction:row-reverse;
 }

 body.yes-moz a[data-intro-text]:before{ /* Geckos -> Firefox, WebSpirit, IceDragon */
    content:"* \a0\a0\a0";
    position:absolute;
    top:50%;
 }

 /* Using the screen dimensions to style the page */

 [class*='1024x600'] .docked-feedback-box,
 [class*='1024x768'] .docked-feedback-box{
	display:none;
 }

 /* hide tooltips on mobile view only */

 span.tooltip{
    display:inline-block;
 }
 
 [aria-view-mode="mobile"] span.tooltip{
    display:none !important;
 }   

 /* styles for tablet view only */

 [aria-view-mode="tablet"] .col > img{
    margin-left: -25px; 
    margin-right: -25px;
 }   
```


**Example 2**

---

```css
/* load a polyfill for emulating box-sizing behaviour in old-IE (in standards mode only) */

body[class*='standards IE6'] [class*='column-'],
body[class*='standards IE7'] [class*='column-']{	
   *behavior: url('./boxsizing.htc');
}

/* when browser is in quirks mode, we make the body 70% transparent */
.quirks {
	opacity:0.7;
	filter:alpha(opacity=70);
	-ms-filter:"alpha(opacity=70)";
}

/* used with Modernizr loaded - border radius */
.borderradius .yes-moz .right-half-pill{  
   -moz-border-radius:0px 4px 4px 0px;
   background-image:-moz-linear-gradient(top, #F5F5F5, #E4E4E4);
}

/* target all gecko browsers firefox,UC,Maxthone */
html .gecko .banner{
	transform:rotate(30degs);
}

/* target an edge browser for svg logo */
.svg .microsoftedge .logo{
   background-size:cover;
   height:30px;
   max-width:100%;
   background-image:url('./assets/img/vectors/flakes.svg');
}

/* ignore the newer blink engine for Opera. only apply gradient to presto engine for Opera */
.cssgradient .presto.yes-opera .banner{
	background-image:-o-linear-gradient(top, #F5F5F5, #E4E4E4);
}

.cssgradients .banner{	
	background-image:linear-gradient(top, #F5F5F5, #E4E4E4);
}

/* using SVG to emulate CSS3 gradients only for IE 9.0 */
.no-cssgradient.svg .IE9 .banner{
	background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgo8bGluZWFyR3JhZGllbnQgaWQ9ImcyMDQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Y1RjVGNSIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0U0RTRFNCIgb2Zmc2V0PSIxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZzIwNCkiIC8+Cjwvc3ZnPg==);
}

/* display an upgrade messsage for users surfing with old browsers */
.browser-update{
  position:relaive;
  display:none !important;
}

.browser-update:after{
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
