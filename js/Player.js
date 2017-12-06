var APP = APP || {};

APP.Player = class Player extends APP.GameObject{
	constructor(){
		super();
	}
	update(){
		console.log("Im player");
	}
}