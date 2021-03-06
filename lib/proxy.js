/**
 * http proxy
 * * specifc proxy which add Content-Disposition in reply header
 * * this allow to get automatic download of the asset by the browser
 * 
 * - initial proxy code from Peteris Krumins (peter@catonmat.net)
 *   - http://www.catonmat.net  --  good coders code, great reuse
*/

// include system dependancies
var http	= require('http');
var url_module	= require('url');



/**
 * Callback for http_server
 * - it handles the proxying itself
*/
function http_server_cb(request, response) {
	// get the assertUrl from request
	var reqUrl	= require('url').parse(request.url)
	var urlVars	= require('querystring').parse(reqUrl.query)
	var assetUrl	= urlVars.url;

	var assetPath	= require('url').parse(assetUrl).pathname;
	var assetBasename=require('path').basename(assetPath);

	// normal http proxying
	var hostField		= require('url').parse(assetUrl).host.split(':');
	var proxy		= http.createClient(hostField[1] || 80, hostField[0])
	var proxyRequest	= proxy.request(request.method, assetUrl, request.headers);
	proxyRequest.addListener('response', function(proxy_response) {
		proxy_response.addListener('data', function(chunk) {
			response.write(chunk, 'binary');
		});
		proxy_response.addListener('end', function() {
			response.end();
		});

		// modify the header to force the download of the asset	
		proxy_response.headers['Content-Disposition']	= "attachment; filename="+assetBasename;
	
		response.writeHead(proxy_response.statusCode, proxy_response.headers);
	});
	request.addListener('data', function(chunk) {
		proxyRequest.write(chunk, 'binary');
	});
	request.addListener('end', function() {
		proxyRequest.end();
	});
}

// launch the server itself
http.createServer(http_server_cb).listen(8080);

console.log("proxy server listen on :8080")
