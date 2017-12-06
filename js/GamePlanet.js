var APP = APP || {};

APP.GamePlanet = class GamePlanet extends APP.GameObject{
	constructor(){
		super()
	}
	update(){
		console.log("Im planet");
	}
}