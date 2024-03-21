/*!
 * @desc: [Engine Detection Script for Browsers on Any Device]
 * @file: [browsengine.js]
 * @version: 0.2.2
 * @author: https://twitter.com/isocroft (@isocroft)
 * @created: 13/11/2014
 * @updated: 20/08/2022
 * @license: MIT
 * @remarks: with love for the OpenSource Community...
 *
 * All Rights Reserved. Copyright (c) 2014 - 2022
 */



 
!function(hasInterface, undefined){

 
function to_string(obj){
  return ({}).toString.call(obj).toLowerCase();
} 

function is_own_prop(obj, prop){
  return ({}).hasOwnProperty.call(obj, prop);
} 
	
function has_pcredentials_iconurl(){
	try{
		var cred = new window.PasswordCredential({
			name:"-",
			iconURL:"http://lab.example.com",
			password:"-",
			id:"-"
		});
		return (cred.iconURL === "http://lab.example.com/");
	}catch(ex){
		return false;
	}
}

function get_text_blob_method(method_name) {
  try {
     var blob = new Blob(['xxxx'], {type: 'text/plain'});
     return ((method_name in blob) && blob[method_name]);
  } catch(error) {
     return false;
  }
}

function actual_non_emulated_IE_major_version() {
    // Detects the actual version of IE in use, even if it's in an older-IE emulation mode.
    // IE JavaScript conditional compilation ( @cc_on )
	
    // See: https://msdn.microsoft.com/library/8ka90k2e%28v=vs.94%29.aspx

    var jscriptVersion = new Function('/*@cc_on return @_jscript_version; @*/')(); // jshint ignore:line
    
    if (jscriptVersion === undefined) {
       jscriptVersion = 11; // IE11+ not in emulation mode
    }
    
    return jscriptVersion; // IE7, IE8, IE9 or IE10 in any mode, or IE11 in non-IE11 mode
}

function polyfill_oscpu_lang(eng, av){
	if(window.navigator.oscpu === undefined){
		var e_index = -1, b_index = av.indexOf(' ') + 1, splited = [""];
		if(eng.webkit || eng.blink || eng.edgehtml){
   			var e_index = av.indexOf(')');
			window.navigator.oscpu = (av.substring(b_index + 1, e_index)).replace('(', '').trim();
		}else if(eng.trident){
			splited = av.split(';');
			window.navigator.oscpu = splited[3];
		}else if(!eng.gecko){
			//presto -> old Opera
			splited = av.split(';');
			window.navigator.oscpu = (splited[0] || "").substring(b_index);
		}
	}
		
	if (window.navigator.language === undefined) {  // in Opera, the language, browserLanguage and userLanguage properties are equivalent
		window.navigator.language = window.navigator.systemLanguage || window.navigator.userLanguage || window.navigator.browserLanguage;
	}
}
	

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
	
	var w=this, d=w.document, rt = d.documentElement, mm = (w.matchMedia || function () { return {matches: false} }), dd="documentMode", ci = (w.clientInformation || {}), n= w.navigator, eid = (ci.productSub || n.productSub || (w.opera && w.opera.buildNumber())), ua = (ci.userAgent || n.userAgent), apn = n.appName, apv = (ci.appVersion || n.appVersion), /* global objects... */
	
	body, Device, isGecko = false, isEdgeHTML = false, isChromiumBlink = false, isBlink = false, isTrident = false, isSilk = false, isYandex = false, isPresto = false, Screen, pixelDensity, vMode, browserName, browserVersion, isChrWebkit=false, isSafWebkit=false, isEdgeChromium = false, isKDE = false, nk = ua.toLowerCase(),
	
	_engineFragment = ((w.chrome || ('onafterprint' in w) || d.readyState) && ('clientInformation' in w)), z = (('orientation' in w) && !('ondeviceorientation' in w)),
	
	j = /(?:chrome[^ ]+:)? (edg(?:[ea]|ios)?)\/(\d+(\.\d+)?)/.exec(nk) || /(webkit)[ \/]([\w.]+)/.exec(nk) || /; (flock)\/(\d+(\.\d+)?)/.exec(nk) || /; (vivaldi)\/(\d+(\.\d+)?)/.exec(nk) || /(opera|opr|opios)(?:.*version)?[ \/]([\w.]+)/.exec(nk) || /(?:(msie) |rv)([\w.]+)/.exec(nk) || !/compatible/.test(nk) && !/seamonkey/.test(nk) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(nk) || [],
	
	osver_map = {
		"Windows NT 5.1":"Windows XP; Intel - 32 bits",
		"Windows NT 6.1":"Windows 7; Intel - 32 bits",
		"Windows NT 6.1; Win64; x64":"Windows 7; Intel - 64 bits",
		"Windows NT 6.2":"Windows 8; Intel - 32 bits",
		"Windows NT 6.2; Win64; x64":"Windows 8; Intel - 64 bits",
		"Windows NT 10.0":"Windows 10 Pro; Intel - 32 bits",
		"Windows NT 10.0; Win64; x64":"Windows 10 Pro; Intel - 64 bits",
		"Macintosh; Intel Mac OS X 10_13_2":"Macintosh OS X 10; Intel - 64 bits",
		"Linux; Andriod 6.0; Nexus 5 Build/MRA58N":"Linux Android Oreo {6.0}; ARM - 64 bits",
		"Linux; Andriod 4.1.2; Nokia_XL Build/JZO54K":"Linux Android Jelly Bean {4.1}; ARM - 32 bits" // 'Linux armv71' { armv8 and above is 64 bits }
	},
	    
	OS = { //detecting OS data...
	  	isLinux:function(){ 
	
	      		return (n.platform.indexOf("Linux") == 0); 
		}, 
		isMac:function(){ 
		
		      return (n.platform.indexOf("Mac") == 0);

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
		isOperaMini:function(bd){ // available on Android & IOS & Windows Mobile OSes only
		
		    return  (to_string(w.operamini) == '[object operamini]' && !!(bd.className += " operamini")) || ((ua.indexOf("Opera Mini") > 0) || (bd && ('OMiniFold' in bd.style) && !!(bd.className += " operamini")));
			
		},
		isOperaMobile:function(bd){ // available on Android & Windows Mobile OSes only
		
		    return (typeof w.operamini === undefined) && (OS.isAndroid(bd) || OS.isWinMobile(bd)) && (n.vendor === 'Opera Software ASA' || typeof n.share === 'function') && _engineFragment && !!(bd && (bd.className += " operamobile"));
		},
		isIOS:function(bd){ 
		
		    	return !(OS.isWinMobile(bd)) && (!!n.platform && !w.MSStream && /iPad|iPhone|iPod/.test(n.platform)) || (ua.indexOf("iPhone;") > 0) || (ua.indexOf("iPad;") > 0) || (ua.indexOf("iPod;") > 0) || (ua.search(/iPhone OS 3_(1|2)_2/) > 0);

		},
    		isAndroid:function(bd){
		
		  	return !(OS.isWinMobile(bd)) && (this.isLinux()) && ((ua.search(/\; Andriod(?:[\d]+\.[\d]+)/) > 0) && (ua.search(/like/ig) == -1));
		  
		},
    		isBB:function(bd){
		
			// @See: http://ryanmorr.com/the-state-of-browser-detection/
			return ('blackberry' in w) && (ua.search(/BlackBerry|\bBB\d+/) > -1);
		   
		},
		isWebOS:function(bd){
			
		   	// @See: http://ryanmorr.com/the-state-of-browser-detection/
		   	return (('PalmSystem' in w) && (ua.search(/(Web|HPW)OS/) > -1));
		   
		}	
	},

	 body = d.body || d.getElementsByTagName('body')[0],

	/* Gecko has so many browsers using it (or worse it's name in their [navigator.product] property). so, we have to be kia-ful when detecting it. */	
	 
     isGecko = (n.vendor === "" && (n.oscpu && (!is_own_prop(n, 'oscpu')) && typeof w.mozInnerScreenX == 'number') && ('registerContentHandler' in n || 'registerProtocolHandler' in n) && (/Gecko/g.test(ua) || typeof w['InstallTrigger'] !== 'undefined')), 

     /* Presto is the only rendering engine used by older Opeara browsers, so we include the presence of {opera} object as a factor */

     isPresto = ((/Presto/g.test(ua) || n.appName === 'Opera') && ((to_string(w.opera) == "[object opera]"))) && ('navigationMode' in w.history),

     /* Trident is the rendering engine used by older versions of IE - 9 - 11 */

     isTrident = _engineFragment && ((/*@cc_on!@*/false || d.createEventObject || ('webdriver' in n)) && (/Trident/g.test(ua) || typeof n.cpuClass === 'string') && (!!w.toStaticHTML)),

    /* EdgeHTML rendering engine is a 'well-standardized' fork of the Trident rendering engine (specifically from IE 11 ) */

     isEdgeHTML = _engineFragment && (typeof get_text_blob_method('msDetachStream') === 'function' || typeof w.RTCIceGatherer === 'function') && (('msCredentials' in w) || ('msTemplatePrinter' in w) || !!w.StyleMedia) && n.vendor === "" && ('oncompassneedscalibration' in w) && !isTrident,

    /* Blink rendering engine is the new successor to Webkit for Chrome and other browsers like the newer version of Edge & Opera */

     isBlink = _engineFragment && (!!w.Intl) && (!!w.CSS) && ((!!n.usb) && typeof n.usb.getDevices === 'function' || (typeof w['Credential'] === 'function')),

    /* Blink rendering engine for specific distributions of Chromium specifically newer versions of Chrome */

     isChromiumBlink = isBlink && !!(w.Intl.v8BreakIterator) && (has_pcredentials_iconurl()),
		
     isFirefoxBrowser = ("ondevicelight" in w) && !('webkitSpeechRecognition' in w) && ("onbeforescriptexecute" in d),
		
     isSafariBrowserOnIOS = ("gesturechange" in w),

     isSafraiBrowserOnMac = ("webkitmouseforcedown" in w);
	
	/* setup info object - {webpage} */

	w.webpage = {engine:{ old_impl: Boolean(w.applicationCache), pointer_enabled: n.pointerEnabled },old:{},device:{screen:{},os:'',browser_build:''}};

	var winHeight = w.innerHeight > rt.clientHeight ? w.innerHeight : rt.clientHeight,
	
	winWidth = w.innerWidth > rt.clientWidth ? w.innerWidth : rt.clientWidth,
	
	viewfactor = ((winWidth/winHeight).toPrecision(2)),
	
	screenfactor = ((w.screen.width/w.screen.height).toPrecision(4)),
	
    	dpz = w.screen.colorDepth || w.screen.pixelDepth;

        

    	w.webpage.device.screen.color_depth = dpz;

   	 	/* 
			if the engine in use is Gecko (firefox, flock, webspirit, e.t.c) 
			or the engine in use is Trident (IE), [pixel-density] is calculated in
			the most approximate manner - 89% correct {probability}.
		*/
	
	if(isTrident || (isGecko && ((w.File && new File([], "") || {}).lastModified !== (new Date).getTime()))){
	    /*
	      On Firefox 18 Mozilla changes the `window.devicePixelRatio` value on manual zoom (cmd/ctrl +/-), 
	      making it impossible to know whether the browser is in zoom mode or if it is a retina device.
	    */
	    pixelDensity = (
	      typeof w.getInterface === "undefined" 
		&& !isTrident 
		? parseFloat((w.screen.availHeight/ (320 * (w.screen.availHeight > 1000 ? 2 : 1))).toPrecision(w.screen.availHeight > 1000 ? 1 : 3))
		: Math.sqrt(w.screen.logicalXDPI * w.screen.logicalYDPI) / 96
	    );
		
	} else {
            pixelDensity = w.devicePixelRatio || (mm('(resolution: 1dppx)').matches && 1) || (mm('(resolution: 2dppx)').matches && 2) || 0;
        }
	
	w.webpage.device.screen.pixel_density = pixelDensity;

	var Device = {
		isTouchCapable:function(){
			var canTouch = ("ontouchstart" in w || (w.DocumentTouch && d instanceof w.DocumentTouch))
                        var isTouchSupported = (function () {
                            try{ d.createEvent("TouchEvent"); return true; }
                            catch(e){ return canTouch; }
                        }());

			return (isTouchSupported && ('ontouchstart' in w))  || ((n.maxTouchPoints || n.msMaxTouchPoints || 1) === 10) || (w.operamini && w.operamini.features.touch) || ('onmsgesturechange' in w && !is_own_prop(w, 'onmsgesturechange'));
		},
		onDesktop:function(){

			return ((isSafraiBrowserOnMac || (~~pixelDensity) <= 1 || (~~pixelDensity) >= 2) && (w.screen.width >= 1024 && ( w.screen.width <= 1920 || !this.onTV())) && !(this.onTablet(true)));
		},
		onTV:function(){

			if(!this.isTouchCapable()) return false;

			return ((~~pixelDensity) == 1.5) && (w.screen.width >= 1920);
		},
		onTablet:function(){

				if(!this.isTouchCapable()) return false;
		
		    	return ((ua.match(/RIM/i)) || (ua.match(/ipad;/i)) || (ua.match(/nexus (7|10)/i)) || (ua.match(/KFAPWI/i)) || (ua.match(/tablet/i))) && !this.onMobile();
			
		},
	    	onMobile:function(){

	    		if(!this.isTouchCapable()) return false; /* All smartphones/mobile-devices that can surf the net are touch-enabled */

	    	
	    		/* see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent  */
		
		    	return ((ua.match(/[^-]mobi|mobile/i) || isSafariBrowserOnIOS) && (w.screen.width <= 760) && (w.screen.width / pixelDensity) < 760) && (String(pixelDensity).indexOf("1.3") !== 0 && w.screen.width !== 601);
		
		}
	},
	
	
	Screen = {
	  isRetina: function() {
	    return (pixelDensity >= 2);
	  }
	};
	
    switch(screenfactor){
    	  case "1.706": // screendim - 1024x600 {falsely-reported as 819x480} - Landscape
    	  case "1.708": // scrrendim - 1024x600 {falsely-reported as 820x480} - Landscape
          case "1.707": // screendim - 1024x600 - Landscape e.g iPad, Dell Mini, HP Mini
	  case "0.5859": // screendim - 600x1024 - Portrait
		     
			 if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && w.screen.width >= 600){
			    body.className += (screenfactor.search(/^(?:1\.70(?:[6-8]))$/)==0)? " 1024x600" : " 600x1024";
			    
			    if(Device.onTablet())
				   body.setAttribute("aria-view-mode", "tablet");
				
				if(Device.onDesktop())
                   			body.setAttribute("aria-view-mode", "desktop");

			 } else if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndroid(body) || OS.isIOS(body) || OS.isOperaMini(body) || OS.isOperaMobile(body))){
			    if(z)
				    body.className += (Math.abs(w.orientation || 0) == 90)? " 1024x600" : " 600x1024";
				else
				    body.className += (screenfactor=="0.5859")? " 600x1024" : " 1024x600";
					
			     if(Device.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 
				 if(Device.onMobile())
                     body.setAttribute("aria-view-mode","mobile");				 
			 }	  
  	break;
		  
  	case "0.5634": // screendim - 320x568 - Portriat e.g Samsung Galaxy S3, 
  	case "0.5625": // screedim - 900x1600 Portrait, screendim - 720x1280, screendim - 360x640 - Portrait e.g iPhone
  	case "0.5622": // screen - 375x667 - Portrait e.g
		  	if(OS.isWinMobile(body) || OS.isBB(body) || OS.isAndroid(body) || OS.isIOS(body) || OS.isOperaMini(body) || OS.isOperaMobile(body)){
			    	 
				 if(Device.onMobile())
	                     		body.setAttribute("aria-view-mode","mobile");
				
				if(Device.onTablet())
					body.setAttribute("aria-view-mode","tablet");
            		}     
  	break;
		  
  	case "0.5993": // screendim - 320x534 - Portrait e.g Techno, Samsung Galaxy S4, Nokia XL
  	case "1.669": // screendim - 534x320 - Landscape
		     if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndroid(body) || OS.isIOS(body) || OS.isOperaMini(body) || OS.isOperaMobile(body))){
			     if(z)
				    body.className += (Math.abs(w.orientation || 0) == 90)? " 534x320" : " 320x534";
				else
				    body.className += (screenfactor=="1.669")? " 534x320" : " 320x534";
				 
				 if(Device.onMobile())
                     			body.setAttribute("aria-view-mode","mobile");				 
			 }
  	break;
		  
  	case "1.500": // screendim 480x320 - Landscape
  	case "0.6667": // screendim 320x480 - Portrait
		     if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndroid(body) || OS.isIOS(body) || OS.isOperaMini(body) || OS.isOperaMobile(body))){
			     	if(z)
				    body.className += (Math.abs(w.orientation || 0) == 90)? " 480x320" : " 320x480";
				 else
				    body.className += (screenfactor=="0.6667")? " 320x480" : " 480x320";
				 
				 if(Device.onMobile())
                     			body.setAttribute("aria-view-mode","mobile");				 
			 }
		  break;
		  
  	case "1.333": // screendim - 1600x1200, screendim - 1152x864, screendim - 1024x768, screendim - 800x600, screendim - 480x360, screendim - 640x480 - Landscape
  	case "0.7500": // screendim - 1200x1600, screendim - 864x1152, screendim - 768x1024, screendim - 600x800, screendim - 360x480, screendim - 480x640 - Portrait e.g Nokia-XL
  	case "0.7496": // IPad Pro
		        if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && (w.screen.width >= 768)){
				   body.className += (screenfactor=="1.333")? (w.screen.width <= 1024? " 1024x768" : " 1152x864") : (w.screen.width <= 768?" 768x1024" : " 864x1152");
				   
				   if(Device.onTablet())	
				      	body.setAttribute("aria-view-mode", "tablet");
				   
				   if(Device.onDesktop())
                      			body.setAttribute("aria-view-mode", "desktop");

				}else if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndroid(body) || OS.isIOS(body) || OS.isOperaMini(body) || OS.isOperaMobile(body))){
				      
				    if(Device.onTablet() && (w.screen.width >= 800)){
					    if(z)
				           body.className += (Math.abs(w.orientation) == 90)? " 800x600" : " 600x800";
						else
						   body.className += (screenfactor=="1.333")? " 800x600" : " 600x800";
						   
                        		   body.setAttribute("aria-view-mode","tablet");
				    }else if(Device.onMobile() && w.screen.width >= 360){
					    if(z)
				           body.className += (Math.abs(w.orientation || 0) == 90)?  " 480x360 640x480" : " 360x480 480x640";
						else
                           body.className += (screenfactor=="1.333")? " 480x360 640x480" : " 360x480 480x640";
                        
                        body.setAttribute("aria-view-mode", "mobile");
					}	
                }				   
          break;

          case "1.250": // screendim - 1280x1024 Portrait
		      if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && w.screen.width >= 768){
                 body.className += (screenfactor=="1.250")? " 1280x1024" : " 1024x1280";
			     
			     if(Device.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 
				 if(Device.onDesktop())
                     body.setAttribute("aria-view-mode","desktop");

			  }else if((OS.isWinMobile(body) || OS.isBB(body) || OS.isAndriod(body) || OS.isOperaMobile(body))){
			     if(Device.onTablet())
                     body.setAttribute("aria-view-mode","tablet");
				 
				 if(Device.onMobile())
                     body.setAttribute("aria-view-mode","mobile");
			  }	 
          break;

          case "1.779": // screendim - 1366x768 Portrait
		    if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && w.screen.width >= 768){
               			body.className += " 1366x768";

               			if(Device.onTablet())
               				body.setAttribute("aria-view-mode","tablet");
               
               			if(Device.onDesktop())
			   		body.setAttribute("aria-view-mode","desktop");
			}   
          break;
		  
	  case "1.778": // screendim - 1920x1080 Portrait, screendim - 1600x900 Portrait, screendim - 1280x720, screendim - 640x360 Landscape
		     if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && w.screen.width >= 768){
		       	    body.className += (w.screen.availWidth !== 1600 ? " 1920x1080" : "1600x900");
		       
		       	    if(Device.onDesktop())
			   		body.setAttribute("aria-view-mode","desktop");
			     
			    if(Device.onTV())
			   		body.setAttribute("aria-view-mode","tv");
			}else{
				if(z)
				   body.className += (Math.abs(w.orientation) == 90)? " 640x360" : " 1080x1920";
			}   
		  break;
		  
	    case "0.6000": // Resolution screendim - 480x800
	    case "1.667":
		    if(!(OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && w.screen.width <= 768){
               			body.className += " 480x800";

               			if(Device.onTablet())
               				body.setAttribute("aria-view-mode", "tablet");
               
               			if(Device.onDesktop())
			   		body.setAttribute("aria-view-mode","desktop");
			}   
		    break;
		  case "1.600": // Resolution - 1680x1050, Resolution  - 1440x900, Resolution - 1280x800
		     if((OS.isWinPC(body) || OS.isMac(body) || OS.isLinux(body)) && w.screen.width >= 768){
		        if(w.screen.width > 1440 && w.screen.width <= 1680) body.className += " 1680x1050"; 
		        if(w.screen.width > 1280 && w.screen.width <= 1440) body.className += " 1440x900";
			    if(w.screen.width <= 1280) body.className += " 1280x800";
				
				if(Device.onTablet())
					body.setAttribute("aria-view-mode", "tablet");

				if(Device.onDesktop())
			    	    body.setAttribute("aria-view-mode","desktop"); 
			 }	
		  break;
		  
		  case "1.805": // Resolution - 1386x768
		      if((OS.isWinPC() || OS.isMac() || OS.isLinux()) && w.screen.width >= 768){
		         body.className += " 1386x768";

		         if(Device.onDesktop())
			     	body.setAttribute("aria-view-mode","desktop");
			  }	 
		  break;
		  
		  default:
			if(Device.onDesktop()) {
			  body.setAttribute("aria-view-mode","desktop");
			  w.webpage.device.type = 'desktop';
			} else if(Device.onTablet()) {
			  body.setAttribute("aria-view-mode","tablet");
			  w.webpage.device.type = 'tablet';
			} else if(Device.onMobile()) {
			  body.setAttribute("aria-view-mode","mobile");
			  w.webpage.device.type = 'mobile';
			} else {
			  body.setAttribute("aria-view-mode","unknown");
			}

		  break;
    };
	
	body.setAttribute("aria-last-detected", document.lastModified);

	body.setAttribute("aria-touch-capable", String(Device.isTouchCapable()));
	w.webpage.device.touch_capable = Device.isTouchCapable();

    if(Screen.isRetina()){

    	body.setAttribute("aria-screen-view", "retina");

    	w.webpage.device.screen.type = 'retina';

    }else{

    	body.setAttribute("aria-screen-view", "normal");

    	w.webpage.device.screen.type = 'normal';
    } 	
	
	
    w.webpage.device.zoom_level = (w.webpage.device.screen.pixel_density * 100).toFixed();
	
	
	    if(!d[dd] && !isPresto){  // a necessary step to avoid conflict with old IE/Opera and others...

	          isChrWebkit = _engineFragment && ((d.webkitHidden === false || d.webkitHidden === undefined) && (!!w.chrome.webstore || !!w.chrome.runtime || !!w.crypto) && /(Chrome|Crios|Crmo|CrOS)/g.test(ua) && (n.vendor.indexOf("Google Inc.") !== -1));
		
		  isSafWebkit = ((n.vendor.indexOf("Apple Computer, Inc.") !== -1) && (/constructor/i.test(w.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]" }(!w.safari || (typeof w.safari !== 'undefined' && w.safari.pushNotification)))) && (typeof n.share === 'function' || !n.presentation)); // && ('webkitDashboardRegion' in body.style);
										       
		  isEdgeChromium = isChrWebkit && isBlink && (!!n.presentation) && (typeof n.share === 'function') && (typeof n.canShare === 'function');
										       
		  isKDE = ((n.vendor.indexOf("KDE")) !== -1 && /Konqueror/g.test(ua)) && ('KhtmlUserInput' in body.style);
			 
		  isSilk = ((n.vendor.indexOf("Amazon")) != -1 && /Silk/ig.test(ua));
			 
		  isYandex = (/YAbrowser/ig.test(ua));
		
	     }
	
	     var isSafariAndiOS12OrLater = function(){
		return isSafWebkit && (typeof n.share === 'function' && typeof w['IntersectionObserver'] === 'function') && (String(w.IntersectionObserver) === 'function IntersectionObserver() { [native code] }');
             }
	     
	     w.isOpera15OrLater = function(){
	     	return isBlink && !isPresto && ((!!w.opr && !!w.opr.addons) && (!!w.CSS && typeof w.CSS.supports === 'function'));
	     }

             var isOpera33OrLater = function(){
		return isBlink && !isPresto && ((!!w.opr && !!w.opr.addons) && (!!w.CSS && typeof w.CSS.supports === 'function')) && (String(w.caches) === '[object CacheStorage]'); 
  	     }

	     var isEdge17OrLater = function(){
		return (isEdgeChromium || isEdgeHTML) && (typeof w.PushManager === 'function') && (String(w.PushManager) === 'function PushManager() { [native code] }');
	     }
	
	     var isChrome40OrLater = function(){
		var i = d.createElement('input');
   		return isChrWebkit && isChromiumBlink && (typeof i['reportValidity'] === 'function') && (String(i['reportValidity']) === 'function reportValidity() { [native code] }');
 	     }

             var isFirefox19OrLater = function() {
                return ((w.File && new w.File([], "") || {}).lastModified === (new Date).getTime())
             }

	     var isFirefox44OrLater = function(){
		return isGecko && typeof d.charset !== "undefined" && (typeof w.PushManager === 'function') && (String(w.PushManager) === 'function PushManager() {\n    [native code]\n}');
	     }
	
	     var isSamsungInternet4OrLater = function(){ return false; }
	     
	     w.navigator.isSWCapable = function() {
		return isSafariAndiOS12OrLater() 
				|| isOpera33OrLater() 
					|| isEdge17OrLater() 
						|| isChrome40OrLater() 
							|| isFirefox44OrLater() 
								|| isSamsungInternet4OrLater();
	     };
   
   		/* retrieve browser build name (if any) */

        	browserName = j[1] || "unknown";
	
		/* take out minor version number and/or patch version number (if any) */

	    	browserVersion = parseFloat( j[2] || "0" );  
	
	
	    if(browserVersion  <= 9.0 && browserName == "msie" && isTrident){
	     
	     	/* 
	     		There are several browsers using the [Trident] engine,
	     		however, IE is the most popular
	     	 */

     		 body.className += " oldIE";

     		 w.webpage.old.ie = true;
	    }
		
		if(browserVersion <= 10.6 && browserName == "opera" && isPresto){

			/* There is only one browser using the [Presto] engine */
			/* Though Opera now uses the [Blink] engine as from 15.0+ */
		 
		    body.className += " oldOpera";

		    w.webpage.old.opera = true;
		}
			
		if(browserVersion <= 35.0 && browserName == "mozilla" && isGecko){

			/* 
				There are sevral browsers using the Mozillas' Gecko engine 
				So, we have to sort things out in a sharp-sharp manner ;) 
			*/

			if(ua.match(/firefox/i)){

		    	body.className += " oldMoz";

		    	w.webpage.old.firefox = true;
		    }	

		    if(ua.match(/flock/i)){

		    	/* From versions 1 - 3, Flock uses the [Gecko] engine */

		    	body.className += " oldFlock";

		    	w.webpage.old.flock = true;
		    }
		}	

		if(browserVersion <= 13.0 && browserName == "edge" && isEdgeHTML){

			body.className += " oldEdge";

		    w.webpage.old.edge = true;
		}
			
		if(browserVersion <= 40.0 && browserName == "webkit" && !isBlink){
		     		   
		    body.className += (isChrWebkit)? " oldChrome" : (isSafWebkit? " oldSafari": "");

		    if(isSafWebkit){
		    	
		    	w.webpage.old.safari = true;

		    }else if(isChrWebkit){

		    	w.webpage.old.chrome = true;
		    }

		    if(ua.match(/flock/i) && browserVersion >= 4){

		    	/* From version 4, Flock uses the Webkit engine */

		    	body.className += " oldFlock";

		    	w.webpage.old.flock = true;
		    }
		}	
	
		if(OS.isIOS(body)){
	
	           	body.setAttribute('aria-os-data', 'iOS');

	           	w.webpage.device.os = 'ios';
	
	    	}else if(OS.isAndroid(body)){
		
			   body.setAttribute('aria-os-data', 'Linux Andriod');

			   w.webpage.device.os = 'linux andriod';

		}else if(OS.isWinPC(body)){
	
	           	body.setAttribute('aria-os-data','Windows');

	           	w.webpage.device.os = 'windows';
	
		}else if(OS.isBB(body)){
		    
		    	body.setAttribute('aria-os-data','Blackberry');

	           	w.webpage.device.os = 'blackberry';
		    
	    }else if(OS.isWebOS(body)){
		    
		    	body.setAttribute('aria-os-data','Web OS');

	           	w.webpage.device.os = 'webos';
		    
	    }else if(OS.isOperaMini(body)){
		    
		    	body.setAttribute('aria-user-agent','Opera Mini');
		        w.webpage.device.opera_mini = true;
		    
	    }else if(OS.isOperaMobile(body)){
		    
		    	body.setAttribute('aria-user-agent','Opera Mobile');
		         w.webpage.device.opera_mobile = true;
		    
	    }else if(OS.isMac(body)){
	
	           body.setAttribute('aria-os-data','Macintosh');

	           w.webpage.device.os = 'macintosh';
	
	    }else if(OS.isSun(body)){
		
		       body.setAttribute('aria-os-data','Sun');

		       w.webpage.device.os = 'sun';
		
	}else if(OS.isLinux(body)){
	
	           body.setAttribute('aria-os-data','Linux');

	           w.webpage.device.os = 'linux';
	
	 }else{
		       body.setAttribute('aria-os-data','unknown');

		       w.webpage.device.os = 'unknown';
		}

		if(d.compatMode == "BackCompat"){
             body.setAttribute('aria-setup-mode','quirks');  // not good for IE especially, Quirk Mode Ouch?!
			 body.className += " quirks";
			 w.webpage.quirks = true;
		}else{
			body.setAttribute('aria-setup-mode','standards');
			body.className += " standards"; 
			w.webpage.standards = true;
		}
	
	try{
		vMode = body.getAttribute("aria-view-mode");

		w.webpage.device.type = vMode;

	}catch(e){}


    if (isTrident) { 
		
        var ieVersion = (function(reg){
		       
		       /*
		        * 	O-o shine ya eye... this version number might be due to emulation !!!
		        */
		         
	           return parseInt(ua.match(reg)[2]);

	    })(/MSIE\s(([0-9]+)[\.0-9]*)/), 
		
		// Here we need to verify that this IE version is not emulated
		
		ieActual = actual_non_emulated_IE_major_version(),
		
		ieTag = (ieVersion===ieActual ? " IE"+ieVersion : ieActual);
		
		// check if the actual IE version is a valid number
		if(typeof ieTag != "number"){ 
		    ieTag = " UA-unknown";
			return;
		}else{
		    ieActual = parseInt(ieTag);
		    ieTag = " IE"+ieActual;
		}

		switch(ieActual){
			case 7:
				window.webpage.engine.version = "3.0";
			break;
			case 8:
				window.webpage.engine.version = "4.0";
			break;
			case 9:
				window.webpage.engine.version = "5.0";
			break;
			case 10:
				window.webpage.engine.version = "5.0";
			break;
			case 11:
				window.webpage.engine.version = "7.0";
			break;
		}
	    
		
	    /* Here we are just inserting a marker for IE10+ */

        body.className += " yes-ms";


      	/* Here we are detecting Internet Explorer 7 - 11 */
         
        if(d[dd] && d[dd] === ieActual  
        	&& (("msInterpolationMode" in body.style) 
        			|| ('msLinearGradient' in body.style) 
        				|| (!!w.MSInputMethodContext))){ // IE (7-11)
		     
		     if(body.className.indexOf(ieTag.substring(1)) == -1){    

                     	body.className += ieTag + " forward-ie"; 
		     }	

		}else{
		
		     /* Here we are detecting Internet Explorer 4 - 6 only */

             	     body.className += ieTag;      		 
		}

		body.className += " trident";
	        
	    w.webpage.engine.trident = true; 

	}
	
	/* detecting Microsoft Edge */

	else if(isEdgeHTML){	

		if(browserName == "edge" && ('msWriteProfilerMark' in w) && ('onwebkitfullscreenchange' in d)){
		
		    body.className += "yes-edgehtml microsoftedge like-gecko like-khtml edgehtml legacy-edge";

		    w.webpage.engine.edgehtml = true;
			
		    w.webpage.device.browser_build = 'edgehtml-edge';

		} 
	}else if(isEdgeChromium){

		if((browserName == "edg" || browserName == "edga" || browserName == "edgios")){ 

			body.className += "yes-blink microsoftedge like-gecko like-khtml blink chromium-edge";

			w.webpage.engine.blink = true;

			w.webpage.device.browser_build = 'blink-edge';
		}
		
      }else if (isGecko) {
      
	    // Here we are detecting Firefox, IceWeasel & SeaMonkey from version 3.0+
			
	    if(nk.search(/firefox|iceweasel/) > -1){

           if (body.className.indexOf("yes-moz") == -1){
                  
                  body.className+=" yes-moz firefox gecko";
		   
		   w.webpage.device.browser_build = 'gecko-firefox';

           }
				  
		   if(browserName == "rv"){

			       if(Device.onTablet() || Device.onMobile()){

				       	body.className+=" firefoxos";

				   }
		   }	  
		}

		else if(nk.search(/seamonkey/) > -1){
				
				body.className+=" yes-moz seamonkey gecko";
		}

		else if(nk.search(/flock/) > -1){
				
				body.className+=" yes-moz flock gecko";
		}

        /*
        	 @TODO: There are other [Gecko] browsers that exist - 
        
        	Epiphany (formerly used [Webkit, Presto]), Waterfox, 
        	K-Meleon, Classilla, Lunascape(dual-engine Gecko + Trident), 
        	SeaMonkey, Flock (1.0 - 3.0), WebSpirit, Pale Moon e.t.c.	
        */		

    	w.webpage.engine.gecko = true;
	    

    }
     
    else if(isKDE){
         
		 /* Here we are detecting Konqueror 1.0+ */
		 
         if (body.className.indexOf("yes-khtml") > -1){

                body.className+=" yes-khtml konqueror khtml like-gecko";
         }

         w.webpage.engine.khtml = true;

    }

      /* Here we are detecting Chrome 1.0+, UC Browser from version 2.0+ and 5.0+ respectively */

     else if (isChrWebkit && (typeof w["webkitURL"] == 'function')) {

	  // See: https://en.wikipedia.org/wiki/Google_Chrome_version_history/
          switch(browserVersion){

		  case 1.0:
			  
		  	w.webpage.engine.version = '528.00';
                  break;
		  case 2.0:
			  
		  	w.webpage.engine.version = '530.00';
                  break;
		  case 3.0:
			
		  	w.webpage.engine.version = '532.00';
                  break;
		  case 4.0:
			 
		  	w.webpage.engine.version = '532.50';
                  break;
		  case 4.1:
			  
		  	w.webpage.engine.version = '532.50';
		  break;
		  case 5.0:
			  
		  	w.webpage.engine.version = '533.00';
		  break;
		  case 6.0:
			  
		  	w.webpage.engine.version = '534.30';
		  break;
		  case 7.0:
			  
		  	w.webpage.engine.version = '534.70';
		  break;
		  case 8.0:
			
		  	w.webpage.engine.version = '534.10';
		  break;
		  case 9.0:
			
		  	w.webpage.engine.version = '534.13';
		  break;
		  case 10.0:
			  
		  	w.webpage.engine.version = '534.16';
		 break;
		  case 11.0:
			  
		  	w.webpage.engine.version = '534.24';
                  break;
	  }

          if(isChromiumBlink){

          		 if (body.className.indexOf("yes-blink") == -1){

                       		body.className += " yes-blink chrome";

          		 }
		  
		    	/* Detecting Vivaldi Browser for Desktop (Blink Engine) ... */
		  
			  	if(ua.match(/vivaldi\/(?:[\d]{1,}\.[\d]{1,})/)){
					  
						  body.className += " yes-blink vivaldi";
					  
				}

				if(ua.indexOf('nokia_xl') > -1) {  

			     	  		body.className += " nokia_xl";  

	     	    		}

          		 body.className += " blink like-gecko like-khtml";

				 w.webpage.engine.blink = true;
		  
		  		w.webpage.device.browser_build = 'blink-chrome';

          }else{


  				/* Webkit Engine - browsers */

               if (body.className.indexOf("yes-webkit") == -1){

               			/* detecting UC Browser for desktop ... */

			     	  if(ua.match(/ubrowser\/(?:[\d]{1,}\.[\d]{1,})/)){


			                body.className += " yes-webkit ucbrowser";


			     	  }


			     	  if(ua.indexOf('nokia_xl') > -1) {  

			     	  		body.className += " nokia_xl";  

			     	  }
		       		  

			     	  /* Other Browser(s) desktop */

			     	  else {

               				body.className += " yes-webkit chrome";

			     	  }
			    }

          		

          		body.className += " webkit like-gecko like-khtml";

				w.webpage.engine.webkit = true; 
		  
		  		w.webpage.device.browser_build = 'webkit-chrome';
          
            }

        }
	
	/* Here we are detecting Safari from version 2.0+ */
	
	else if((ua.indexOf('AppleWebkit') != -1) || isSafWebkit){
	  
	          	  if (body.className.indexOf("yes-webkit") == -1){

	                      body.className += " yes-webkit safari like-gecko webkit like-khtml";

	              }
	
			  	  w.webpage.engine.webkit = true;
		
				  w.webpage.device.browser_build = 'webkit-safari';
		
	          
	}
	
	/* Here we are detecting Opera from version 7.0 - 14.0 */

	/* 
		Opera versions 3.0 - 6.0 were supported by the Elektra engine ( pre-Presto )
		[which is now seriously outdated.. like e don teey!!] 
	 */

    else  if ((('supportsCSS' in w) || 'attachEvent' in d) && (isPresto && browserName == 'opera')){ 

    	   var oprVersion = parseInt(w.opera.version());

	   // See: https://help.opera.com/en/operas-archived-history/
    	   switch(oprVersion){
    	   	case 7:
    	   		window.webpage.engine.version = "1.0";
    	   	break;
			case 8:
				window.webpage.engine.version = "1.0";
			break;
			case 9:
				window.webpage.engine.version = "2.0";
			break;
			case 10:
				window.webpage.engine.version = "2.2";
			break;
			case 11:
				window.webpage.engine.version = "2.7";
			break;
			case 12:
				window.webpage.engine.version = "2.9";
			break;
			case 13:
				window.webpage.engine.version = "2.13";
			break;
		   	case 14:
			   	window.webpage.engine.version = "2.15";
			break;
		}	 

          if (body.className.indexOf("yes-opera") == -1){

                    body.className +=" yes-opera opera presto";

           }

           w.webpage.engine.presto = true;
	    

    }

    /* Here we are detecting Opera from version 15.0+ */
    /* PS: Note that Opera 15.0 (beta) is based on Webkit but Opera 15.0+ was based on Blink after Google updated their annoucements in 2013 */

    else if(isOpera15OrLater() && (browserName == 'opr' && n.vendor === 'Google Inc.')){ 

    	 if (body.className.indexOf("yes-blink") == -1){

                    body.className += " yes-blink opera blink like-gecko like-khtml";

          }

          w.webpage.engine.blink = true;

	  w.webpage.engine.x_version = "537.36";
	    
	    // See: https://help.opera.com/en/opera-version-history/
	    
	   switch(parseInt(browserVersion)){
		   case 15:  
 			w.webpage.engine.version = '28'
		   break;
		   case 16:
			w.webpage.engine.version = '29'
	   	   break;
		   case 17:
			w.webpage.engine.version = '30'
		   break;
		   case 18:
			   w.webpage.engine.version = '31'
		   break;
		   case 19:
			   w.webpage.engine.version = '32'
		   break;
		   case 20:
			   w.webpage.engine.version = '33'
		   break;
		   case 21:
			   w.webpage.engine.version = '34'
		   break;
		   case 22:
			   w.webpage.engine.version = '35'
		   break;
		   case 23:
			   w.webpage.engine.version = '36'
		   break;
		   case 24:
			   w.webpage.engine.version = '37'
		   break;
		   case 25:
			   w.webpage.engine.version = '38'
		   break;
	   }
	    
	  w.webpage.device.browser_build = 'blink-opera';

    }	
	
    polyfill_oscpu_lang(w.webpage.engine, apv);
	
    w.navigator.ostitle = osver_map[w.navigator.oscpu] || "";

 }, {}]);
 
 }(('HTMLDocument' in this) || ('Document' in this));
