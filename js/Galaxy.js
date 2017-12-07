var APP = APP || {};

APP.Galaxy = class Galaxy extends APP.GameObject{
	constructor(name, nSolarSystem, nstars, size){
		super();
		this._background = null;
		this.object3d = new THREE.Group();
		this._createSkyBox();
		this._generatePlanets();
	}
	_createSkyBox(){
		// Galaxy background
		let loader = new THREE.CubeTextureLoader();
		loader.setPath( 'assets/skybox/skybox_' );
		this._background = loader.load([ 'right.png', 'left.png', 'top.png', 'bot.png', 'front.png', 'back.png' ]);
	}
	_generatePlanets(){
		let geometry = new THREE.SphereBufferGeometry( 10, 16, 16 );
		let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		
		for (let i = 0; i < 100; i++) {
			let sphere = new THREE.Mesh( geometry, material );
			let scale = Math.max(Math.random()*10,1);
			sphere.scale.set(1,1,1).multiplyScalar(scale);
			let posX = (Math.random()-0.5)*2000;
			let posY = (Math.random()-0.5)*2000;
			let posZ = (Math.random()-0.5)*2000;
			sphere.position.set(posX,posY,posZ);
			this.object3d.add(sphere);
		}
	}
	update(){
	}
}