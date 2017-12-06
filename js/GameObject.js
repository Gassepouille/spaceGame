var APP = APP || {};

APP.GameObject = class GameObject{
	constructor(){
		APP.GameObject.POOL.push(this)
	}
	static updateAll(delta, now){
		APP.GameObject.POOL.forEach((object)=>{
			if(!object.update) return;
			object.update(delta, now);
		})
	}
	killUpdate(){
		APP.GameObject.POOL = APP.GameObject.POOL.filter(element => element !== this);
	}
}
APP.GameObject.POOL = [];