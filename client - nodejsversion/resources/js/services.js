var app = angular.module('esApp', []);
// We need to inject the $http service in to our factory
app.factory("InitialiseSSM", function ($http) {
	// Define the Start function
	var InitialiseSSM = function () {
		// Define the initialize function
		this.initialize = function () {
			// Fetch the ssm from Dribbble
			console.log("init");
			var url = 'http://localhost:8080/start?callback=JSON_CALLBACK';
			var self = this;
			console.log("self",self)
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
});

app.service("CreateForce", function () {			
		this.createForce = function(pScope){
			var color = d3.scale.category10();
			var force = d3.layout.force()
				.charge(-120)
				.linkDistance(50)
				.linkDistance(50)
				.nodes(pScope.ssm.nodes)
				.links(pScope.ssm.links)
				.size([window.innerWidth, window.innerHeight-20]);				
			return force;		
		}		
	})