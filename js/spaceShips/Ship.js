var APP = APP || {};

APP.Ship = class Ship extends APP.GameObject{
	cconstructor(){
		super()
	}
	update(){
		console.log("Im ship");
	}
}