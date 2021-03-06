var querystring = require("querystring"),
	fs = require("fs"),
	fs1 = require("fs"),
	fs2 = require("fs"),
	xsltproc = require('xsltproc'),
	Promise = require('promise');
	console.log("xsltproc",xsltproc);
function start(response, postData) {
	// Asynchronous read
	fs1.readFile('../client/index.html', function (err, data) {
		if (err) {
			return console.error(err);
		}		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data.toString());
		response.end();
	});
	return;
}

function copyFile(src,tgt){
	console.log("Copying...");
	var x = readFile(src);
	return writeFile(tgt,x);
}

function readFile(f){
	
	var promise = new Promise(function (resolve, reject) {
			fs.readFile(f,"UTF-8",function(err, data){ console.log("in cb"); resolve(data); });	
			
		})
		return resolve;
		/* .then(
			function(){
				console.log("good");
			},
			function(err){
				console.log("bad",err);
			});
 */
}

function writeFile(f,d){
	return fs.writeFileSync(f, d);
}


function initialiseSSM(response){
	console.log("init...");	
	var ssm='acessm/ssm.xml';
	var ssmCopy='acessm/ssmCopy.xml';
	var goalsxsl='acessm/gops.xslt';
	var jsonsxsl='acessm/ssmjson.xslt';
	
	readFile(ssmCopy)
		.then(function(data){
		console.log("data",data);}
		,function(error){
			console.log("error",error);
		});
	console.log(x);
	
	// console.log(fs.createReadStream(ssmCopy).pipe(fs.createWriteStream(ssm)));
	// copyFile(ssmCopy,ssm);
	
	return
	var jxslt = xsltproc.transform(jsonsxsl, ssm);
		jxslt.stdout.on('data', function (data) {
			var output = data.toString();
			console.log('xsltproc stdout: ' + output);
			response.writeHead(200, {"Content-Type": "application/javascript"});
			response.write(output);
			response.end();
		});	
	return;
	
/* 	fs1.readFile(ssmCopy,function(err,data){
		if (err) {
			return console.error(err);
		}		
	})
	
	return; 
 	var xml='acessm/ssm.xml';
	var goalsxsl='acessm/gops.xslt';
	var jsonsxsl='acessm/ssmjson.xslt';
	var ssmCopy=fs.createReadStream('acessm/ssmCopy.xml');
	var ssm=fs.createWriteStream('acessm/ssm.xml');
	var gxslt = xsltproc.transform(goalsxsl, xml);
	var jxslt = xsltproc.transform(jsonsxsl, xml);
	ssmCopy.pipe(ssm);
	
	jxslt.stdout.on('data', function (data) {
		var output = data.toString();
		console.log('xsltproc stdout: ' + output);
		response.writeHead(200, {"Content-Type": "application/javascript"});
		response.write(output);
		response.end();
	});
		 */
	// console.log(xslt);
	/*
	xslt.stdout.on('data', function (data) {
	  console.log('xsltproc stdout: ' + data);
	});
	 
	xslt.stderr.on('data', function (data) {
	  console.log('xsltproc stderr: ' + data);
	});
	 
	xslt.on('exit', function (code) {
	  console.log('xsltproc process exited with code ' + code);
	});
	 */		
	
/* 	
	fs.readFile('../server/acessm/ssmCopy.xml', function (err, data) {
		if (err) {
			return console.error(err);
		}		
		//response.writeHead(200, {"Content-Type": "text/html"});
		//response.write(data.toString());
		response.end();
	}); */

	//response.writeHead(200, {"Content-Type": "application/json"});
	//response.write(data.toString());
	//response.end();
	
}
function getResource(response, request, pathname){
	// Asynchronous read	
	console.log("getResource:",pathname)
	fs1.readFile('../client/' + pathname, function (err, data) {
		var contentType="text/plain";
		if (err) {
			return console.error(err);
		}		
		switch (pathname.split("/").pop().split(".").pop()) {
			
			case "js":
				contentType = "application/javascript";
				break;
			
		}		
		response.writeHead(200, {"Content-Type": contentType});
		// response.write(data.toString());
		response.write(data);
		response.end();
	});
	return;
}


function transformAndEcho(p,pResponse){
	console.log("transformAndEcho, p",p)
	var ssm='acessm/ssm.xml';
	var jsonsxsl='acessm/'+p;
	var jxslt = xsltproc.transform(jsonsxsl, ssm);
	jxslt.stdout.on('data', function (data) {
		var output = data.toString();
		// console.log('xsltproc stdout: ' + output);
		pResponse.writeHead(200, {"Content-Type": "application/javascript"});
		pResponse.write(output);
		pResponse.end();
	});		
}

function transformAndSave(pXSL,pCallback){
	// return
	console.log("transformAndSave, pXSL",pXSL)
	var ssm='acessm/ssm.xml';
	var jsonsxsl='acessm/'+pXSL;
	var jxslt = xsltproc.transform(jsonsxsl, ssm);
	jxslt.stdout.on('data', function (data) {
		var output = data.toString();
		// console.log('xsltproc stdout: ' + output);
		// console.log("Write to file");
		// var x=fs1.writeFile('acessm/ssm.xml',output);
		// fs.createReadStream(data.toString()).pipe(fs.createWriteStream(ssm))
		// fs.writeFile(ssm, output,"UTF-8", pCallback)
		writeFile(ssm,output)
		console.log("Written output",output);
		if (pCallback) { pCallback(); }
	});		
}

function rungoals(pResponse, pRequest){
	console.log("Run goals");
	transformAndSave("gops.xslt",function(){transformAndEcho("ssmjson.xslt",pResponse);});
}
exports.getResource = getResource;
exports.initialiseSSM = initialiseSSM;
exports.copyFile = copyFile;
exports.start = start;
exports.rungoals = rungoals;
exports.transformAndEcho = transformAndEcho;
exports.transformAndSave = transformAndSave;
