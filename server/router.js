var querystring = require("querystring");
function route(handle, pathname, response, request) {	
	
	
	// console.log("request:",request)
	if (pathname.slice(0,11)==="/resources/"){
		handle["/getResource"](response, request, pathname);
		return;			
	} 
	
	if (typeof handle[pathname] === 'function') {
		console.log("pathname:",pathname);
		handle[pathname](response, request);
		return;
	} 
	
	if (pathname.split("/")[1]==="acessm"){
		var urlParam = decodeURI(request.url.split("?")[1]);
		var array = urlParam.split(String.fromCharCode(2));
		var len=array.length,i;
		for (i=0;i<len;i++){
			var fncall=array[i].split(String.fromCharCode(1));
			if (fncall[0]==="transformAndEcho"){				
				handle["/transformAndEcho"](fncall[1],response);
			}
			if (fncall[0]==="transformAndSave"){
				console.log("handle",handle)
				handle["/transformAndSave"](fncall[1],response);
			}			
			
		}
		console.log("urlParam",urlParam.split(String.fromCharCode(2))[0]);
		return;
	}
	
	//console.log("pathname",pathname)
	console.log("No request handler found for " + pathname);
	response.writeHead(404, {"Content-Type": "text/html"});
	response.write("404 Not found");
	response.end();
	
	
}
exports.route = route;