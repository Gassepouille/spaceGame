var APP = APP || {};

APP.Planet = class Planet extends APP.GameObject {
	constructor(){
		super()
	}
	update(){
		console.log("Im planet");
	}
}