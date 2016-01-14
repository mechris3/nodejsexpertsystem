console.log("Controllers loaded")

app.controller('esCtrl', function($scope,$http,InitialiseSSM,CreateForce) {
	aa=$scope;
	console.log(document);
    $scope.width = window.innerWidth,
    $scope.height = window.innerHeight-20;
	$scope.nextOperators="g";
	$scope.previousNodePositions={};
	function setpreviousNodePositions(){
		var i = $scope.nodes.length;
		$scope.previousNodePositions={};
		for (;i--;){			
			$scope.previousNodePositions[$scope.nodes[i].id]=[$scope.nodes[i].x,$scope.nodes[i].y]
		}		
	}
	
	
		

    $scope.InitialiseSSM = function(){
		$scope.ssm=new InitialiseSSM();		
		$scope.force=CreateForce.createForce($scope);
		$scope.force.links($scope.ssm.links);
		$scope.force.nodes($scope.ssm.nodes);
		//$scope.force.start();
		setTimeout(function(){ 
			console.clear(); 
			console.log("starting"); 
			console.log($scope.force);
			console.log($scope.ssm.links);
			console.log($scope.ssm.nodes.length);
			$scope.force.start();
			},500);
		 
		 
	}
	
	/* $scope.CreateForce = function(){
		 $scope.ssm=new CreateForce($scope);		
	}	 */
	
	$scope.InitialiseSSM();
	
	$scope.getGoals = function(){
		return;
/* 		setpreviousNodePositions();
		var sBuffer = new serverBuffer();		
		sBuffer.Do({"functionName":"transformAndSave","parameters":["gops.xslt"]});			
		sBuffer.Do({"functionName":"transformAndEcho","parameters":["ssmjson.xslt"]});
		$http.get(sBuffer.run())
			.then(function(d){
				updateSSM(d);
			}); */		
		
	};
	
	$scope.chooseGoal = function(){
		return;
		/* setpreviousNodePositions();
		var sBuffer = new serverBuffer();											
		sBuffer.Do({"functionName":"transformAndSave","parameters":["sops.xslt"]});
		sBuffer.Do({"functionName":"transformAndEcho","parameters":["ssmjson.xslt"]});
		
		$http.get(sBuffer.run())
			.then(function(d){
				updateSSM(d);
			})		 */
	};
	
	$scope.satisfyGoal = function(){
		return;
		/* setpreviousNodePositions();
		var sBuffer = new serverBuffer();		
		sBuffer.Do({"functionName":"transformAndSave","parameters":["kops.xslt"]})			
		sBuffer.Do({"functionName":"transformAndEcho","parameters":["ssmjson.xslt"]})			
		$http.get(sBuffer.run())
			.then(function(d){
				updateSSM(d);
			}); */
			
	};
	
	
	function updateSSM(d){
	{
		
		if ($scope.previousNodePositions){
			console.log("$scope.previousNodePositions",$scope.previousNodePositions);		
		}
		$scope.links=d.data.links;
		$scope.nodes=d.data.nodes;
		
		$scope.nextOperators=d.data.nextOperators;
		$scope.goal=d.data.goal;
		console.log("d.data",d.data)
		$scope.getArrowAngle = [];
		for(var i=0; i < $scope.links.length ; i++){
			$scope.links[i].strokeWidth = Math.round(Math.sqrt($scope.links[i].value))
		};

		for(var i=0; i < $scope.nodes.length ; i++){
			$scope.nodes[i].color = color($scope.nodes[i].group);
			if (($scope.previousNodePositions[$scope.nodes[i].id])&&($scope.previousNodePositions[$scope.nodes[i].id][0])){
				$scope.nodes[i].x = parseInt($scope.previousNodePositions[$scope.nodes[i].id][0]);
				$scope.nodes[i].y = parseInt($scope.previousNodePositions[$scope.nodes[i].id][1]);				
			}

		};
		force
			.nodes($scope.nodes)
			.links($scope.links)
			.on("tick", function(d){
				//$scope.getArrowAngle = Math.random()*360;
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

					// return "translate("+x+" "+y+") rotate("+correctedAngle+" 0 0)"
					$scope.getArrowAngle[i]=correctedAngle;
					
					// $scope.getArrowAngle[i]=90;
				}
				var i=$scope.links.length;
				for (;i--;){
					doArrow($scope.links[i],i);
				}
				$scope.$apply()
			})
			.start();
	}
	}
	
	;(function(){
		return;
		/* var sBuffer = new serverBuffer();		
		
		sBuffer.Do({"functionName":"transformAndEcho","parameters":["ssmjson.xslt"]})		
		$http.get(sBuffer.run())
			.then(function(d){
				console.log("width",$scope.width);
				console.log("height",$scope.height);
				$scope.links=d.data.links;
				$scope.nodes=d.data.nodes;
				for(var i=0; i < $scope.links.length ; i++){
					$scope.links[i].strokeWidth = Math.round(Math.sqrt($scope.links[i].value))
				};

				for(var i=0; i < $scope.nodes.length ; i++){
					$scope.nodes[i].color = color($scope.nodes[i].group)
				};
				force
					.nodes($scope.nodes)
					.links($scope.links)
					.charge(-400)
					.linkDistance(function(d){if ((d.source.name.substr(0,1)=="?")||(d.target.name.substr(0,1)=="?")) {return 50} else {return 150}})
					.size([1000, 700])
					.on("tick", function(){$scope.$apply()})
					.start();				
			});		 */
	})()
	
});