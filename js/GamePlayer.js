var APP = APP || {};

APP.GamePlayer = class GamePlayer extends APP.GameObject{
	constructor(){
		super();
	}
	update(){
		console.log("Im player");
	}
}