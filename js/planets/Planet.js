var APP = APP || {};

APP.Planet = class Planet extends APP.Star {
	constructor(scale, position){
		super(scale, position);
		this.object3d.material = APP.Planet._planetMaterial;
		this.object3d.material.needsUpdate = true;
		this._isCenter = (this._origin.length()===0) ? true: false;
		this._satellites = [];
		
		if (!this._isCenter && scale>10) {
			let satelliteNumber = Math.round(Math.random()*3);
			for (var i = 0; i < satelliteNumber; i++) {
				let satelliteScale = Math.min(Math.max(Math.random(), 0.1),0.8);
				let posX = (Math.random()-0.5)*10;
				let posY = (Math.random()-0.5)*10;
				if(posX<1.5 && posX>-1.5) posX = 1.5;
				if(posY<1.5 && posY>-1.5) posY = 1.5;
				let posZ = posX/1.5;
			
				let posVector = new THREE.Vector3(posX, posY, posZ);
				
				let satellite = new APP.Star(satelliteScale, posVector);
				this.object3d.add(satellite.object3d);
				this._satellites.push(satellite)
			}
		}
	}
	update(delta,now){
		if(this._origin.x === 0 && this._origin.y === 0 && this._origin.z === 0) return;
		let time = now*100/this._origin.length() + this._origin.length();
		this.object3d.position.set(Math.cos(time) * this._origin.x, Math.sin(time)*this._origin.y, Math.sin(time)*this._origin.z);
		if(this._satellites.length === 0) return;
		this._satellites.forEach((satellite)=>{
			let timeSatellite = now/satellite._origin.length() + satellite._origin.length();
			satellite.object3d.position.set(Math.cos(timeSatellite) * satellite._origin.x, Math.sin(timeSatellite)*satellite._origin.y, Math.sin(timeSatellite)*satellite._origin.z);
		})
	}
}
APP.Planet._planetMaterial = new THREE.MeshBasicMaterial( {color: 0xff0011} );