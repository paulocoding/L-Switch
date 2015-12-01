// gets the current time in milliseconds
var getTimeMs = function() {
	return (new Date()).getTime();
}
// returns random number btween 1 and n
var randomNum = function(n){
	return Math.floor(Math.random()*n)+1;
};
var main = function() {
	// get timer element
	var timerEl = $('.timer');
	
	// flag for winning condition
	var won = false;
	// target number of updates per second:
	var ticksPerSec = 10;
	// set time per game in seconds
	var gameTime = 5; 
	var timer = gameTime * ticksPerSec;
	// converting game time from seconds to number of tics
	gameTime = gameTime * ticksPerSec;
		
	var frameTime = 1000/ ticksPerSec;
	
	var initTime = getTimeMs();
	
	//initialize blocks function
	var initBlocks= function(n){
		var blockA = '<li class="block rb"><i class="fa fa-exchange"></i></li>';
		var blockB = '<li class="block"><i class="fa fa-exchange"></i></li>';
		
		var listL = $('.game-left');
		var listR = $('.game-right');
		//removing all children nodes
		listL.empty();
		listR.empty();
		// number of blocks to switch (3 block variation, minimum blocks switched round((n/2)-1))
		var blocksToSwitch = Math.round(Math.random()*3+(n/2)-1);
		var blockSwitch = [];
		
		for(var i=0;i<n;i++){
			blockSwitch.push(false);
		}
		
		// sanity check to avoid infinite loop
		if(n >= blocksToSwitch){
			// distributing random blocks
			for(var i=0, ri=0;i<blocksToSwitch;i++) {
				ri = randomNum(n)-1;
				if(!blockSwitch[ri]){
					blockSwitch[ri] = true;
				}
				else {
					i--;
				}
			}
		}
		// filling out the list
		for(var i=0;i<n;i++){
			
			if(blockSwitch[i]){
				listL.append($(blockB));
				listR.append($(blockA));
			} else {
				listL.append($(blockA));
				listR.append($(blockB));			
			}
		}
		
	};
	// first level call
	initBlocks(6);
		
	// switching function	
	$('.block').click(function () {
		$(this).toggleClass('rb');
		// finding current element order nr
		var o = $(this).prevAll().length;
		if($(this).parent().hasClass('game-left')){
			$($('.game-right').children()[o]).toggleClass('rb');
		}
		else {
			$($('.game-left').children()[o]).toggleClass('rb');
		}
		
		// checking if the win condition is met
		var bList = $('.game-right').children();
		won = true;
		for (var i=0, l=bList.length;i<l;i++) {
			if($(bList[i]).hasClass('rb')){
				won = false;
			};
		}
		if(won){
			clearInterval(gameLoop);
			timerEl.text('WON!!');
			
		}		
	});
	// Game loop: 
	var gameLoop = setInterval(function(){
		// game update logic
		timer = gameTime - Math.floor((getTimeMs()-initTime)/frameTime);
		// lose condition
		if (timer >= 0){ 
			timerEl.text(timer);
		}
		else {
			timerEl.text('Lost');
			clearInterval(gameLoop);
		}
	}, frameTime);
	$('.bb').click(function(){
		
	});
};

$(document).ready(main);