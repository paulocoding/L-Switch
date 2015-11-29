var main = function() {
	// console.log($($('.game-left').children()[2]).addClass('test'));
	var timerEl = $('.timer');
	
	// target number of updates per second:
	var ticksPerSec = 10;
	// time per game in seconds
	var gameTime = 2; 
	var timer = gameTime * ticksPerSec;
	
	var frameTime = 1000/ ticksPerSec;
	var initTime;
	var lastFrameTime;
	var currentFrameTime;
		
	// Game loop: 
	setInterval(function(){
		if (timer >= 0){ 
			timerEl.text(timer--);
		}
		else {
			timerEl.text('Lost');
		}
	}, frameTime);
	$('.bb').click(function(){
		
	});
};

$(document).ready(main);