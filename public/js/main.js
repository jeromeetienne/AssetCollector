
//////////////////////////////////////////////////////////////////////////////////
// honor jQuery.noConflict to remove jQuery from global namespace - HEADER
(function(jQuery){
	jQuery(function(){
//////////////////////////////////////////////////////////////////////////////////

// define the asset to collect
var assetExts	= [
	".wmv"
];


var assetUrls	= [];
// collect assertUrls for each assetExts in a.href
jQuery.each(assetExts, function(i, assetExt){
	var cssSelector	= "a[href$='"+assetExt+"']";
	jQuery(cssSelector).each(function(){
		assetUrls.push( this.href );
	});	
});

var assetDownloadIframe	= function(contentUrl){
	// firefox: success
	// chrome: faile: this one trigger a popup... impossible to say "yes" always 
	jQuery("<iframe>").attr("src", contentUrl).appendTo("body");
}

var assetDownloadLocation	= function(contentUrl){
	// this one works... but remove the current page... so works only once
	// - what about that in a iframe ?
	// - what about having cookie to store content... as after the download
	//   the browser comes back to the original page
	location.href	= contentUrl;
}

var assetDownloadWindowOpen	= function(contentUrl){
	// firefox: good. this one works on FF if the user explicitly allow the popups from this site
	// chrome: bad. popups + impossible for the user to prevent any further popups
	window.open(contentUrl, '_blank');
}

var assetDownloadAElement	= function(contentUrl){
	// this one doesnt seems to work
	// the click is not triggered
	// maybe a issue of "security" to avoid fake click
	var element	= jQuery("<a>").attr({
		href	: contentUrl,
		target	: "_blank"
	}).text("nothing much")
	.appendTo("body");
	setTimeout(function(){
		jQuery(element).click();
	}, 100);
}

var forceDownload	= function(contentUrl){
	var callUrl	= "http://localhost:8080"
				+ "?url="	+ contentUrl;
	console.log("forceDownload", callUrl)
	if( jQuery.browser.mozilla ){
		assetDownloadIframe(callUrl)
	}else if( jQuery.browser.webkit ){
		assetDownloadWindowOpen(callUrl)
	}else if(false){
		assetDownloadLocation(callUrl)
	}else if(false){
		assetDownloadAElement(callUrl)
	}
}

jQuery.each(assetUrls, function(i, assetUrl){
	forceDownload(assetUrl);
});

// notify the users
// - TODO make it nicer looking. and non modal. maybe a notification
//alert("Downloaded "+assetUrls.length+" assets")


//////////////////////////////////////////////////////////////////////////////////
// honor jQuery.noConflict to remove jQuery from global namespace - FOOTER
	})
})(jQuery.noConflict(true));
//////////////////////////////////////////////////////////////////////////////////
