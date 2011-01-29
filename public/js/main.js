
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


var forceDownload	= function(url){
	var apiUrl	= "http://localhost:8080"
				+ "?url="	+ encodeURIComponent(url);
	location.href	= apiUrl;
}

jQuery.each(assetUrls, function(i, assetUrl){
	forceDownload(assetUrl);
});


//////////////////////////////////////////////////////////////////////////////////
// honor jQuery.noConflict to remove jQuery from global namespace - FOOTER
	})
})(jQuery.noConflict(true));
//////////////////////////////////////////////////////////////////////////////////
