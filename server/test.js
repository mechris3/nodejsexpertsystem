var Promise = require('promise');

var promise = new Promise(function (resolve, reject) {
/*   get('http://www.google.com', function (err, res) {
	  console.log(err, res);
    if (err) reject(err);
    else resolve(res);
  }); */
  
  setTimeout(function(){
	  resolve("");
  },750)
}).then(function(){
	console.log("good");
},function(err){
	console.log("bad",err);
});