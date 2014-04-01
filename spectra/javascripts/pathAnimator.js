/*-----------------------------
	Path Animator v1.1.0
	(c) 2013 Yair Even Or <http://dropthebit.com>
	
	MIT-style license.
------------------------------*/
function PathAnimator(path){
    if( path ) this.updatePath(path);
	this.timer = null;
}

PathAnimator.prototype = {
	start : function( duration, step, reverse, startPercent, callback, easing ){
		this.stop();
		this.percent = startPercent || 0;

		if( duration == 0 ) return false;

		var that = this,
			startTime = new Date(),
			delay = 1000/60;

		(function calc(){
			var p = [], angle, 
				now = new Date(),
				elapsed = (now-startTime)/1000,
				t = (elapsed/duration), 
				percent = t * 100;
				
			// easing functions: https://gist.github.com/gre/1650294
			if( typeof easing == 'function' )
				percent = easing(t) * 100;

			if( reverse )
				percent = startPercent - percent;
			else
				percent += startPercent;
				
			that.running = true;

			// On animation end (from '0%' to '100%' or '100%' to '0%')
			if( percent > 100 || percent < 0 ){
				that.stop();
				return callback.call( that.context );
			}
			
			that.percent = percent;	// save the current completed percentage value

			//  angle calculations
			p[0] = that.pointAt( percent - 1 );
			p[1] = that.pointAt( percent + 1 );
			angle = Math.atan2(p[1].y-p[0].y,p[1].x-p[0].x)*180 / Math.PI;

			// do one step ("frame") 
			step.call( that.context, that.pointAt(percent), angle );
			// advance to the next point on the path 
			that.timer = setTimeout( calc, delay );
		})();
	},
	
	stop : function(){
		clearTimeout( this.timer );
		this.timer = null;
		this.running = false;
	},
	
	pointAt : function(percent){
		return this.path.getPointAtLength( this.len * percent/100 );
	},

	updatePath : function(path){
		this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		this.path.setAttribute('d', path);
		this.len = this.path.getTotalLength();
	}
};
/*----------------------------------------------------------
	Page Configuration
-----------------------------------------------------------*/
(function(){
	var path = "M -95.158512,207.96048 C 481.88598,-274.94278 975.05353,205.94423 975.74495,206.62023",
		cloud = "M -95.158512,207.96048 C 481.88598,-274.94278 975.05353,205.94423 975.74495,206.62023",
		firstWalkerObj = $('.maze > .walker')[0],
		firstCloudObj = $('.maze > .cloud1')[0],
		walkers = [];
		offset=0;	
	
	// handles whatever moves along the path
	function AnimateWalker(walker){
		this.pathAnimator = new PathAnimator( path );
		this.walker = walker;
		this.reverse = false;
		this.speed = 30;
		this.easing = '';
		this.startOffset = null;
		this.color = 'deeppink'; // visually separate different walkers easily
	}

	// handles whatever moves along the path
	function AnimateCloud(walker){
		this.pathAnimator = new PathAnimator( cloudpath );
		this.walker = walker;
		this.reverse = false;
		this.speed = 30;
		this.easing = '';
		this.startOffset = null;
		this.color = 'deeppink'; // visually separate different walkers easily
	}
	
	AnimateWalker.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			//var socket = io.connect('http://localhost:7000');
			//offset = 0;
			dweetio.get_latest_dweet_for("d2dweath", function(err, dweet){ offset = parseInt((dweet[0].content.hour)*100/24); });
			//socket.on ('hour', function (msg) { offset = parseInt((msg.hour)*100/24); console.log(offset)});
			//$.when(dweetio.get_latest_dweet_for("d2dweath", function(err, dweet){ offset = parseInt((dweet[0].content.hour)*100/24); })).then(console.log(offset));
			//function checkOffset(){ if (offset==0){ setTimeout(checkOffset,100); return; } console.log(offset); return;};
			if (offset==0) { this.speed=1;} else { this.speed = 300; }
			this.startOffset = (this.reverse || this.speed < 0) ? 100 - offset : 0 + offset; // if in reversed mode, then animation should start from the end, I.E 100%
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

	AnimateCloud.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			//var socket = io.connect('http://localhost:7000');
			//offset = 0;
			dweetio.get_latest_dweet_for("d2dweath", function(err, dweet){ offset = parseInt((dweet[0].content.hour)*100/24); });
			//socket.on ('hour', function (msg) { offset = parseInt((msg.hour)*100/24); console.log(offset)});
			//$.when(dweetio.get_latest_dweet_for("d2dweath", function(err, dweet){ offset = parseInt((dweet[0].content.hour)*100/24); })).then(console.log(offset));
			//function checkOffset(){ if (offset==0){ setTimeout(checkOffset,100); return; } console.log(offset); return;};
			if (offset==0) { this.speed=1;} else { this.speed = 300; }
			this.startOffset = (this.reverse || this.speed < 0) ? 100 - offset : 0 + offset; // if in reversed mode, then animation should start from the end, I.E 100%
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

	function generateCloud(cloudObj){
		var newAnimatedCloud = new AnimateCloud( cloudObj );
		walkers.push(newAnimatedCloud);
		return newAnimatedCloud;
	}
	
	// start "animating" the first Walker on the page
	generateWalker(firstWalkerObj).start();
	generateCloud(firstCloudObj).start();
	// bind the first Controller to the first Walker
	var firstController = $('menu > div:first');
	resetController( firstController );
	firstController.data( 'walker', walkers[0] );
	
/*-----------------------------------------------------------
	User Controls
------------------------------------------------------------*/
	$('#showPath').on('change', togglePath);
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
