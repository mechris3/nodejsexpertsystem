var app = angular.module('esApp', []);
// We need to inject the $http service in to our factory
/* app.factory("InitialiseSSM2", function ($http) {
	// Define the Start function
	var InitialiseSSM = function () {
		// Define the initialize function
		this.initialize = function () {
			// Fetch the ssm from Dribbble
			console.log("init");
			var url = "http://localhost:8080/initialiseSSM";
			var self = this;
			
			var ssmData = $http.get(url)
				.then(function(d){	
						angular.extend(self, d.data);
				});
			
		};

		// Call the initialize function for every new instance
		this.initialize();
	};
	// Return a reference to the function
	return (InitialiseSSM);
}); */


app.service("InitialiseSSM", function($http, $q) {
  var deferred = $q.defer();
  this.getSSM = function() {
    return $http.get("http://localhost:8080/initialiseSSM")
      .then(function(response) {			
			deferred.resolve(response.data);
			return deferred.promise;
		}, 
		function(response) {			
			deferred.reject(response);
			return deferred.promise;
		});
	};
});


app.service("RunGoals", function($http, $q) {
  var deferred = $q.defer();
  this.RunGoals = function() {
    return $http.get("http://localhost:8080/rungoals")
      .then(function(response) {			
			deferred.resolve(response.data);
			return deferred.promise;
		}, 
		function(response) {			
			deferred.reject(response);
			return deferred.promise;
		});
	};
});


app.factory("RunGoals2", function ($http) {
	// Define the transformAndSave function
	var RunGoals = function () {
		// Define the initialize function
		this.initialize = function () {
			// First transform and save using the goal operators
			
			console.log("init");
			var url = "http://localhost:8080/rungoals";
			var self = this;
			
			var ssmData = $http.get(url)
				.then(function(d){	
						angular.extend(self, d.data);
				});
			
		};

		// Call the initialize function for every new instance
		this.initialize();
	};
	// Return a reference to the function
	return (RunGoals);
});
// Converts from degrees to radians.
Math.radians = function(degrees) { return degrees * Math.PI / 180; };
// Converts from radians to degrees.
Math.degrees = function(radians) { return radians * 180 / Math.PI; };
app.service("CreateForce", function () {			
		this.createForce = function(pScope){			
			var color = d3.scale.category10();
			var force = d3.layout.force()
				.charge(-120)
				.linkDistance(150)								
				.size([window.innerWidth, window.innerHeight-20]);
			
			force.doTick = function(pScope){				
				
				function collide(node) {
					var r = node.radius + 16,
						nx1 = node.x - r,
						nx2 = node.x + r,
						ny1 = node.y - r,
						ny2 = node.y + r;
					return function(quad, x1, y1, x2, y2) {
					if (quad.point && (quad.point !== node)) {
					  var x = node.x - quad.point.x,
						  y = node.y - quad.point.y,
						  l = Math.sqrt(x * x + y * y),
						  r = node.radius + quad.point.radius;
					  if (l < r) {
						l = (l - r) / l * .5;
						node.x -= x *= l;
						node.y -= y *= l;
						quad.point.x += x;
						quad.point.y += y;
					  }
					}
					return x1 > nx2
						|| x2 < nx1
						|| y1 > ny2
						|| y2 < ny1;
				  };
				}				
				
			 	var q = d3.geom.quadtree(force.nodes()),
					i = 0,
					n = force.nodes().length;
				while (++i < n) {
					q.visit(collide(force.nodes()[i]));
				}
				
				
				function doArrow(link,i){					
					function quadrant(d)
					{
						/* return:
							TR - Top Right
							BR - Bottom Right
							TL - Top Left
							BL - Bottom Left
						*/
						var sx = d.source.x; var sy = d.source.y; var tx = d.target.x; var ty = d.target.y; 
						var x="R"; if (sx>tx) {x="L"};
						var y="T"; if (sy<ty) {y="B"};
						return y+x;
					}
					
					var sx = link.source.x; var sy = link.source.y; var tx = link.target.x; var ty = link.target.y; 
					var dx=tx-sx; var dy=ty-sy;
					var gradient=dy/dx;																									
					var x = tx-(dx/4);
					var y = ty-(dy/4);					
					// the position of the arrow is correct
					// now flip the gradient to it matches the normal mathematical grident
					gradient=-gradient;
					var theta=Math.atan(1/gradient)					
					var angle=Math.degrees(theta);					
					var correctedAngle=angle;
					var quad=quadrant(link)					
					if ((quad=="BL")||(quad=="BR")) { correctedAngle=correctedAngle+180 }
					pScope.getArrowAngle[i]=correctedAngle;
					return "translate("+x+" "+y+") rotate("+correctedAngle+" 0 0)"
					
					
					// $scope.getArrowAngle[i]=90;
				}
				var i=force.links().length;				
				for (;i--;){
					doArrow(force.links()[i],i);
				}
				
				pScope.$apply();
				
			}
			
			return (force);
		}		
	})