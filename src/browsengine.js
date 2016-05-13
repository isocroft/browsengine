/*!
 * @desc: [Engine Detection Script for Browsers on Any Device]
 * @file: [browsengine.js]
 * @author: https://twitter.com/isocroft
 * @created: 13/11/2014
 * @license: MIT
 * @remarks: with love for the OpenSource Community...
 */
 
 
!function(){
/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */
 
function to_string(obj){
  return ({}).toString.call(obj).toLowerCase();
} 

// @win window reference
// @fn function reference
function contentLoaded (win, fn, obj) {
	var done = false, top = true,

	doc = win.document, root = doc.documentElement,

	add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
	rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
	pre = doc.addEventListener ? '' : 'on',

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) fn.call(win, (e.type || e), obj);
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy', obj);
	else {
		if (doc.createEventObject && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}

}

contentLoaded.apply(null, [window, function(){ 
	
	 w=this, d=w.document, rt = d.documentElement,  dd="documentMode", n= w.navigator, ua = n.userAgent, apn = n.appName; // global objects...
	
	var OS, Screen, pixelDensity, browserName, borwserVersion, isChrWebkit=false, isSafWebkit=false, isOperaWebkit=false, isKDE = false, nk = ua.toLowerCase(),
	
	z = (('orientation' in w) && !('ondeviceorientation' in w)),
	
	j = /(?:chrome[^ ]+:)? (edge)\/(\d+(\.\d+)?)/.exec(nk) || /(webkit)[ \/]([\w.]+)/.exec(nk) || /(opera|opr)(?:.*version)?[ \/]([\w.]+)/.exec(nk) || /(?:(msie) |rv)([\w.]+)/.exec(nk) || !/compatible/.test(nk) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(nk) || [];
	
	var body = d.body || d.getElementsByTagName('body')[0];	
	 
    var isGecko = (!navigator.vendor && (w.crypto && typeof(w.mozInnerScreenX) == 'number') && !d.getBoxObjectFor && /Gecko/g.test(ua)); 

    var isPresto = (/Presto/g.test(ua) && typeof(d.evaluate) == "function" && (('OLink' in body.style) || (to_string(w.opera) == "[object opera]") || isOperaMobile(body)) && w.history.navigationMode);

    var isTrident = (/*@cc_on!@*/false && d.all && /Trident/g.test(ua) && window.execScript && ('behavior' in body.style));

    var isBlink = false;	
	
	if(isTrident || isGecko){
	    
		 pixelDensity = parseInt(w.screen.availWidth / (d.documentElement.clientWidth || w.innerWidth));
		
	}else{
	  
	     pixelDensity = w.devicePixelRatio;
	}
	
	var winHeight = w.innerHeight || rt.clientHeight || body.clientHeight,
	
	winWidth = w.innerWidth || rt.clientWidth || body.clientWidth,
	
	viewfactor = ((winWidth/winHeight).toPrecision(2)),
	
	screenfactor = ((w.screen.width/w.screen.height).toPrecision(4)),
	
    dpi = w.screen.colorDepth; // always '32' ... sometimes '24'
	
	OS = { //detecting OS data...
	  isLinux:function(){ 
	
	      return (n.platform.indexOf("Linux") == 0) 
	}, 
	isMac:function(){ 
	
	      return (n.platform.indexOf("Mac") == 0)

	}, 
	isSun:function(){ 
	
	      return (n.platform.indexOf("Sun") == 0)

	}, 
	isWinPC:function(){ 
	
	   return (n.platform.indexOf("Win32") == 0) 
	
	}, 
	isWinMobile:function(bd){
	
	     return (n.platform.indexOf("Win") == 0) && ((ua.indexOf("Windows Phone") > 0) || (ua.indexOf("IEMobile") > 0) || (ua.indexOf("WPDesktop") > 0));
		 
	},
	isOperaMobile:function(bd){
	
	    return  to_string(window.operamini) == '[object operamini]' && ((ua.indexOf("Opera Mini") > 0) || ('OMiniFold' in bd.style));
		
	},
	isIOS:function(bd){ 
	
	    return (ua.indexOf("iPhone; U;") > 0) || (ua.indexOf("iPad; U;") > 0) || (ua.indexOf("iPod; U;") > 0) || (ua.search(/iPhone OS 3_(1|2)_2/) > 0);

	},
    isAndriod:function(bd){
	
	  return (this.isLinux()) && (ua.indexOf("; Andriod") > 0 && ua.search(/like/ig) == -1);
	  
	},
    isBB:function(bd){
	
	   return (ua.search(/BlackBerry|\bBB\d+/) > -1);
	   
	},
	isWebOS:function(){
	   
	   return (ua.search(/(Web|HPW)OS/) > -1);
	   
	},
	onTablet:function(){
	
	    return ((ua.match(/RIM/i)) || (ua.match(/ipad;/i)) || (ua.match(/Nexus (7|10)/i)) || (ua.match(/KFAPWI/i)) || (ua.match(/tablet/i))) && !this.onMobile();
		
	},
    onMobile:function(){
	
	    return (ua.match(/[^-]mobi|mobile/i)) && ((w.screen.width / pixelDensity) < 768);
	
	}	
	}; 
	
	Screen = {
	     isRetina: function(){
	
	          return (pixelDensity >= 2);
	   
	     }
	};
	
    switch(screenfactor){
          case "1.707": // screendim - 1024x600 - Landscape e.g iPad, Dell Mini, HP Mini
		  case "0.5859": // screendim - 600x1024 - Portrait
		     //(dpi == 32)
			 if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body))){
			    body.className += (screenfactor=="1.707")? " 1024x600" : " 600x1024";
			    if(OS.onTablet())
				   body.setAttribute("aria-view-mode", "tablet");
				else
                   body.setAttribute("aria-view-mode", "desktop");  
			 }else if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndriod(body) || OS.isIOS(body) || OS.isOperaMobile(body))){
			    if(z)
				    body.className += (Math.abs(w.orientation || 0) == 90)? " 1024x600" : " 600x1024";
				else
				    body.className += (screenfactor=="0.5859")? " 600x1024" : " 1024x600";
					
			     if(OS.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 else
                     body.setAttribute("aria-view-mode","mobile");				 
			 }	  
		  break;
		  
		  case "0.563": // screendim - 360X640 - Portriat e.g Samsung Galaxy, 320x568 - Portrait e.g iPhone
		     ;
		  break;
		  
		  case "0.5993": // screendim - 320x534 - Portrait e.g Techno, Nokia-XL
		  case "1.669": // screendim - 534x320 - Landscape
		     if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndriod(body) || OS.isIOS(body) || OS.isOperaMobile(body))){
			     if(z)
				    body.className += (Math.abs(w.orientation || 0) == 90)? " 534x320" : " 320x534";
				else
				    body.className += (screenfactor=="1.669")? " 534x320" : " 320x534";
					
			     if(OS.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 else
                     body.setAttribute("aria-view-mode","mobile");				 
			 }
		  break;
		  
		  case "1.500": // screendim 480x320 - Landscape
		  case "0.6667": // screendim 320x480 - Portrait
		     if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndriod(body) || OS.isIOS(body) || OS.isOperaMobile(body))){
			     if(z)
				    body.className += (Math.abs(w.orientation || 0) == 90)? " 480x320" : " 320x480";
				else
				    body.className += (screenfactor=="0.6667")? " 320x480" : " 480x320";
					
			     if(OS.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 else
                     body.setAttribute("aria-view-mode","mobile");				 
			 }
		  break;
		  
          case "1.333": // screendim - 1024x768, screendim - 800x600, screendim - 480x360 - Landscape
		  case "0.7500": // screendim - 768x1024, screendim - 600x800, screendim - 360x480 - Portrait
		        if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && (w.screen.width >= 768)){
				    body.className += (screenfactor=="1.333")? " 1024x768" : " 768x1024";
				   if(OS.onTablet())	
				      body.setAttribute("aria-view-mode", "tablet");
				   else
                      body.setAttribute("aria-view-mode", "desktop");
				}else if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndriod(body) || OS.isIOS(body) || OS.isOperaMobile(body))){
				      
				    if(OS.onTablet() && (w.screen.width === 800 || w.screen.width === 600)){
					    if(z)
				           body.className += (Math.abs(w.orientation) == 90)? " 800x600" : " 600x800";
						else
						   body.className += (screenfactor=="1.333")? " 800x600" : " 600x800";
						   
                        body.setAttribute("aria-view-mode","tablet");
				    }else{
					    if(z)
				           body.className += (Math.abs(w.orientation) == 90)? " 480x360" : " 360x480";
						else
                           body.className += (screenfactor=="1.333")? " 480x360" : " 360x480";						
                        body.setAttribute("aria-view-mode","mobile");
					}	
                }				   
          break;

          case "1.250": // screendim - 1280x1024 Portrait
		      if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body))){
                 body.className += (screenfactor=="1.250")? " 1280x1024" : " 1024x1280";
			     if(OS.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 else
                     body.setAttribute("aria-view-mode","desktop");
			  }else if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndriod(body) || OS.isOperaMobile(body))){
			     if(OS.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 else
                     body.setAttribute("aria-view-mode","mobile");
			  }	 
          break;

          case "1.779": // screendim - 1366x768 Portrait
		    if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body))){
               body.className += " 1366x768";
			   body.setAttribute("aria-view-mode","desktop");
			}   
          break;
		  
		  case "1.778": // screendim - 1920�1080
		     if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body))){
		       body.className += " 1920�1080";
			   body.setAttribute("aria-view-mode","desktop");
			}   
		  break;
		  
		  case "1.600": // Resolution - 1680�1050, Resolution  - 1440x900, Resolution - 1280�800
		     if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body))){
		        if(w.screen.width === 1680) body.className += " 1680�1050"; 
		        if(w.screen.width === 1440) body.className += " 1440�900";
			    if(w.screen.width === 1280) body.className += " 1280�800";
				
			    body.setAttribute("aria-view-mode","desktop tv"); 
			 }	
		  break;
		  
		  case "1.805": // Resolution - 1386�768
		      if((OS.isWinPC() || OS.isMac() || OS.isLinux())){
		         body.className += " 1386�768";
			     body.setAttribute("aria-view-mode","desktop");
			  }	 
		  break;
		  
		  default:
		     body.setAttribute("aria-view-mode","unknown");
		  break;
    };
	
	body.setAttribute("aria-last-modified", document.lastModified);

    if(Screen.isRetina()) body.setAttribute("aria-screen-view", "retina");	
	
    if(!d[dd] && !isPresto){  // a necessary step to avoid conflict with IE/Opera and others...

         var isChrWebkit = ((d.webkitHidden == false || d.webkitHidden === undefined) && /(Chrome|Crios|Crmo|CrOS)/g.test(ua) && (n.vendor.indexOf("Google Inc") != -1));
	
	     var isSafWebkit = ((navigator.vendor.indexOf("Apple Computer") != -1) && (/Gecko/g.test(ua) || !n.taintEnabled) && 'webkitDashboardRegion' in body.style);
	
	     var isKDE = ((navigator.vendor.indexOf("KDE")) != -1 && /Konqueror/g.test(ua) && ('KhtmlUserInput' in body.style));
		 
		 var isSilk = ((navigator.vendor.indexOf("Amazon")) != -1 && /Silk/g.test(ua));
		 
		 var isYandex = (/YAbrowser/ig.test(ua));
	
	}
   
        browserName = j[1] || "unknown";
	
	    browserVersion = parseInt( j[2] || "0" ).toPrecision(2);  // take out minor version number (if any)
		
		browserVersion = parseFloat(browserVersion);
	
	
	    if(browserVersion  <= 7.0 && browserName == "msie" && isTrident){
	     
     		 body.className += " oldIE";
	    }
		
		if(browserVersion <= 9.0 && browserName == "opera" && isPresto){
		 
		    body.className += " oldOpera";
		}
			
		if(browserVersion <= 3.5 && browserName == "mozilla" && isGecko){
		    body.className += " oldMoz";
		}	
			
		if(browserVersion <= 2.0 && browserName == "webkit"){
		     		   
		    body.className += (isChrWebkit)? " oldChrome" : (isSafWebkit? " oldSafari": "");
		}	
	
        if(OS.isWinPC()){
	
	           body.setAttribute('aria-os-data','Windows');
	
	    }else if(OS.isMac(body)){
	
	           body.setAttribute('aria-os-data','Macintosh');
	
	    }else if(OS.isSun(body)){
		
		       body.setAttribute('aria-os-data','Sun');
		
		}else if(OS.isLinux(body)){
	
	           body.setAttribute('aria-os-data','Linux');
	
	    }else if(OS.isIOS(body)){
	
	           body.setAttribute('aria-os-data', 'iOS');
	
	    }else if(OS.isAndriod(body)){
		
		
		}else{
		       body.setAttribute('aria-os-data','unknown');
		}

		if(d.compatMode == "BackCompat"){
             body.setAttribute('aria-setup-mode','quirks');  // not good for IE especially, Quirk Mode Ouch?!
			 body.className += " quirks";
		}else{
			body.setAttribute('aria-setup-mode','standards');
			body.className += " standards"; 
		}
	


    if (isTrident) { 
		
        var ieVersion = (function(reg){
	           return parseInt(ua.match(reg)[2]);
	    })(/MSIE\s(([0-9]+)[\.0-9]*)/), 
		
		ieTag = " IE"+ieVersion;

	    // Here we are just inserting a marker for IE10+ 

        body.className += (ieVersion >= 10)? " yes-ms" : " yes-old-ms";


      	// Here we are detecting Internet Explorer 7 - 10+...
         
        if(d[dd] && d[dd] === ieVersion  && ("msInterpolationMode" in body.style || 'msLinearGradient' in body.style)){ // IE(7-10)+
		     if(body.className.indexOf(ieTag.substring(1)) == -1)                   
                     body.className += ieTag + " forward-ie"; 
		}else{
		
		     // Here we are detecting Internet Explorer 4 - 6 only...          
                     body.className += ieTag;      		 
		}

		// detecting Microsoft Edge
        if(browserName == "edge" && ('msTextSizeAdjust' in body.style)){
		    body.className += " microsoftedge";
		}		
	
	}

	
    else if (isGecko) {
      
	    // Here we are detecting Firefox from version 3.0+
			
	    if(nk.search(/firefox|iceweasel/) > -1){
           if (body.className.indexOf("yes-moz") == -1)
                  body.className+=" yes-moz firefox gecko";
				  
		   if(browserName == "rv"){
		       if(OS.onTablet() || OS.onMobile()){
			       body.className+=" firefoxos";
			   }
		   }	  
		}
        // there are other gecko browsers that exist - Mathxone, UC Browser, SeaMonkey e.t.c.		

    }
     
    else if(isKDE){
         
		 // Here we are detecting Konqueror
		 
         if (body.className.indexOf("yes-khtml") == -1)
                body.className+=" yes-khtml konqueror";

    }

      // Here we are detecting Chrome from version 3.0+

     else if ((typeof(window["URL"] || window["webkitURL"]) == 'function') || isChrWebkit) {

          if (body.className.indexOf("yes-webkit") == -1)
                       body.className += " yes-webkit chrome webkit";

    }
	
	// Here we are detecting Safari from version 2.0+
	
	else if((typeof(window.webkitURL) == 'undefined' && ua.indexOf('AppleWebkit') != -1) || isSafWebkit){
	  
	          if (body.className.indexOf("yes-webkit") == -1)
                             body.className += " yes-webkit safari gecko";
	
	}
	
	// Here we are detecting Opera from version 5.0+

    else  if (('OBackgroundSize' in body["style"]) || isPresto) {

          if (body.className.indexOf("yes-opera") == -1)
                    body.className +=" yes-opera opera presto";

    }	

 }, {}]);
 
 }();