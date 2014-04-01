//AnimateWalker.stopPlay(walker);
/*----------------------------------------------------------
	Page Configuration
-----------------------------------------------------------*/

/*(function(){
	var path = "m 645.86315,350.28588 c -168.3031,18.93409 -200.91182,-15.77842 -169.35499,29.45304 31.55683,45.23146 32.60872,74.6845 131.4868,73.63261 98.87807,-1.0519 264.02549,-29.45305 204.06751,-58.90609 C 752.10449,365.0124 645.86315,350.28588 645.86315,350.28588 z",
		firstWalkerObj = $('.maze > .walker')[0],
		walkers = [];
	
	// handles whatever moves along the path
	function AnimateWalker(walker){
		this.pathAnimator = new PathAnimator( path );
		this.walker = walker;
		this.reverse = true;
		this.speed = 30;
		this.easing = '';
		this.startOffset = 0;
		this.color = 'deeppink'; // visually separate different walkers easily
	})();
*/
/*	function(){
		//var path = "M6.426,79.957c0,11.458,1.996,19,14.175,19s14.513,3.233,14.513,13.992c0,6.656-0.397,14.008-13.284,14.008c-9.987,0-15.716,7.74-15.716,13.369c0,21.011,0,61.556,0,82.832 c0,5.765,4.383,13.8,15.54,13.8c8.249,0,18.337,0,26.498,0c7.93,0,14.962,6.735,14.962,13.752c0,21.643,0,63.35,0,84.411 c0,6.236,6.625,12.837,13.29,12.837c26.493,0,85.584,0,111.78,0c8.115,0,12.93-6.952,12.93-13.364c0-21.212,0-62.342,0-83.445 c0-8.199,3.521-13.191,13.918-13.191c10.265,0,14.082,6.601,14.082,13.103c0,26.36,0,85.56,0,112.314 c0,5.3-3.583,13.583-12.941,13.583c-21.146,0-62.868,0-84.055,0c-5.23,0-13.004,4.118-13.004,12.652 c0,8.372,3.064,16.348,13.18,16.348c8.367,0,19.188,0,27.726,0c8.527,0,14.095,4.659,14.095,11.292 c0,7.924,5.049,13.708,14.07,13.708c31.402,0,106.853,0,137.575,0c9.209,0,13.355,8.605,13.355,13.932c0,26.855,0,85.454,0,111.787 c0,7.003,5.738,13.281,15.16,13.281c27.004,0,83.071,0,109.484,0c8.844,0,14.355,6.448,14.355,14.589 c0,10.933-5.415,16.411-13.775,16.411c-8.578,0-14.225,5.688-14.225,10.997c-1,21.253,16.501,34.67,39.834,32.67 s59.72-19.334,63.333-77.334s-38.419-58.724-2.876-143.362c35.543-84.637-31.851-132.554-23.66-194.708 c9.375-71.142,49.203-73.929,66.536-149.263c0-54.333-59.469-55.664-95.734-48.665s-48.265-18.999-91.599-20s-30,31-99.667,31 s-44.05-26.665-103.191-31c-59.142-4.335-38.976,40.167-121.642,41.832c-23.568,0-54.487-17.882-63.333-10.333 C12.211,47.827,7.582,70.632,6.53,77.041C6.376,77.978,6.426,79.895,6.426,79.957z";
		var path = "m 595.14563,323.53398 c -91.26213,24.27185 -186.40777,50.48544 -118.4466,68.93204 67.96116,18.4466 56.31068,-1.94175 76.69903,22.3301 20.38835,24.27184 131.06796,55.3398 156.31068,15.53398 25.24272,-39.80583 70.87378,-87.37864 21.35922,-100 -49.51456,-12.62136 -135.92233,-6.79612 -135.92233,-6.79612 z";
			pathAnimator = new PathAnimator( path ),	// initiate a new pathAnimator object
			objToAnimate = document.getElementById('walker'),	// The object that will move along the path
			speed = 6,	 		// seconds that will take going through the whole path
			reverse = true,	// go back of forward along the path
			startOffset = 0		// between 0% to 100%
	
			pathAnimator.start( speed, step, reverse, startOffset, finish);
	}
	
	function step( point, angle ){
		// do something every "frame" with: point.x, point.y & angle
		objToAnimate.style.cssText = "top:" + point.y + "px;" +
									"left:" + point.x + "px;" +
									"transform:rotate("+ angle +"deg);" +
									"-webkit-transform:rotate("+ angle +"deg);";
	}

	function finish(){
	// do something when animation is done
	}
	
	AnimateWalker.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0; // if in reversed mode, then animation should start from the end, I.E 100%
			this.pathAnimator.context = this; // just a hack to pass the context of every Walker inside it's pathAnimator
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.startOffset, this.finish, this.easing);
		},

		// Execute every "frame"
		step : function(point, angle){
			this.walker.style.cssText = "top:" + point.y + "px;" + 
										"left:" + point.x + "px;" + 
										"transform:rotate(" + angle + "deg);" +
										"-webkit-transform:rotate(" +  angle + "deg);" +
										"color:" + this.color;
		},

		// Restart animation once it was finished
		finish : function(){
			this.start();
		},

		// Resume animation from the last completed percentage (also updates the animation with new settings' values)
		resume : function(){
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.pathAnimator.percent, this.finish, this.easing);
		}
	}

	function generateWalker(walkerObj){
		var newAnimatedWalker = new AnimateWalker( walkerObj );
		walkers.push(newAnimatedWalker);
		return newAnimatedWalker;
	}

	// start "animating" the first Walker on the page
	generateWalker(firstWalkerObj).start();
	// bind the first Controller to the first Walker
	var firstController = $('menu > div:first');
	resetController( firstController );
	firstController.data( 'walker', walkers[0] );

/*-----------------------------------------------------------
	User Controls
------------------------------------------------------------*/
/*	$('#showPath').on('change', togglePath);
	$('#addWalker').on('click', addWalker);
	$('menu')
		.on('click', '.delete', removeInstance)
		.on('click', '.stopPlay', stopPlay)
		.on('click', '.reverse', switchDirection)
		.on('change', '.speed', changeSpeed)
		.on('change', 'select', changeEasing);
		
	$('.speed').trigger('change');
	
	// show / hide the path of the animated object
	function togglePath(){
		$('#svgPath').toggleClass('show');
	}
	
	// add a new instance Walker and his controller box
	function addWalker(){
		var newWalker = firstWalkerObj.cloneNode(true),
			controllerTemplate = $('menu > div:last'),
			controllerClone = controllerTemplate.clone(),
			newAnimatedWalker = generateWalker(newWalker),
			color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		
		resetController( controllerClone );
		controllerTemplate.after( controllerClone.css('borderColor', color) );
		
		$(firstWalkerObj).after(newWalker);

		controllerClone.data('walker', newAnimatedWalker);  // keep track which controller controls which walker
		newAnimatedWalker.color = color;
		newAnimatedWalker.start();
	}
	// reset the controller box for new "walker" instances
	function resetController(obj){
		var speed = 30;
		obj.find('.speed').val(speed).next().text(speed + 's');
		obj.find(':checkbox').removeAttr('checked');
	}
	
	// pause or place the animated object along the path 
	function stopPlay(){
		var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
		
		thisAnimatedWalker.pathAnimator.running ? thisAnimatedWalker.pathAnimator.stop() : thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}
	
	// switch direction of the animated object 
	function switchDirection(){
		var thisAnimatedWalker = $(this.parentNode.parentNode).data('walker');
		thisAnimatedWalker.reverse = (thisAnimatedWalker.reverse == true) ? false : true;
		if( thisAnimatedWalker.pathAnimator.running )
			thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}

	function changeSpeed(){
		var thisAnimatedWalker = $(this.parentNode).data('walker');
		thisAnimatedWalker.speed = this.value;
		this.nextElementSibling.innerHTML = this.value + 's';
		thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}

	function removeInstance(){
		var parent = $(this.parentNode),
			thisAnimatedWalker = parent.data('walker');
		
		// make sure at least one Walker stays
		if( walkers.length > 1 ){
			parent.remove();
			thisAnimatedWalker.pathAnimator.stop();
			$(thisAnimatedWalker.walker).remove();
			walkers.splice(walkers.indexOf(thisAnimatedWalker), 1);
		}
	}
	
	function changeEasing(){
		var thisAnimatedWalker = $(this.parentNode).data('walker'),
			easingFunc = ''; 
			
		if( this.value ){
			var formula = this.value;
			easingFunc = function(t){ return eval(formula) }; 
		}
		
		thisAnimatedWalker.easing = easingFunc;
		thisAnimatedWalker.resume.apply(thisAnimatedWalker);
	}
	
	// reset checkboxes
	$(':checkbox').removeAttr('checked');
	$('select').prop('selectedIndex', 0);
})();
*/
