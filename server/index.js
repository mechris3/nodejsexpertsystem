var server = require("./server"); 
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/initialiseSSM"] = requestHandlers.initialiseSSM;
handle["/rungoals"] = requestHandlers.rungoals;
handle["/copyFile"] = requestHandlers.copyFile;
handle["/getResource"] = requestHandlers.getResource;
handle["/transformAndEcho"] = requestHandlers.transformAndEcho;
handle["/transformAndSave"] = requestHandlers.transformAndSave;

server.start(router.route, handle);