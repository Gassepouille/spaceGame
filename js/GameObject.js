var APP = APP || {};

APP.GameObject = class GameObject{
	constructor(){
		APP.GameObject.POOL.push(this);
	}
	static startAll(delta, now){
		APP.GameObject.POOL.forEach((object)=>{
			if(!object.start) return;
			object.start(delta, now);
		})
	}
	static updateAll(delta, now){
		APP.GameObject.POOL.forEach((object)=>{
			if(!object.update) return;
			object.update(delta, now);
		})
	}
	static stopAll(delta, now){
		APP.GameObject.POOL.forEach((object)=>{
			if(!object.stop) return;
			object.stop(delta, now);
		})
	}
	kill(){
		APP.GameObject.POOL = APP.GameObject.POOL.filter(element => element !== this);
	}
}
APP.GameObject.POOL = [];