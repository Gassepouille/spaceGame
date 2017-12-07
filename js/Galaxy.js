var APP = APP || {};

APP.Galaxy = class Galaxy extends APP.GameObject{
	constructor(name, nSolarSystem, nstars, size){
		super();
		this._background = null;
		this._starSystems = [];
		
		this.object3d = new THREE.Group();
		this._starGeometry = new THREE.SphereBufferGeometry( 10, 16, 16 );
		
		
		this._createSkyBox();
		// this._generatePlanets();
		this._generateStarSystem();
	}
	_createSkyBox(){
		// Galaxy background
		let loader = new THREE.CubeTextureLoader();
		loader.setPath( 'assets/skybox/skybox_' );
		this._background = loader.load([ 'right.png', 'left.png', 'top.png', 'bot.png', 'front.png', 'back.png' ]);
	}
	_generatePlanets(){
		let geometry = this._starGeometry;
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
	_generateStarSystem(){
		let starSystem = new THREE.Group();
		let geometry = this._starGeometry;
		let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		
		let planetsNumber = Math.round(Math.random()*10+3);
		for (let i = 0; i < planetsNumber; i++) {
			let sphere = new THREE.Mesh( geometry, material );
			let scale = Math.max(Math.random()*10/(i+1),5/(i+1));
			sphere.scale.set(1,1,1).multiplyScalar(scale);
			let posX = (Math.random()-0.5)*50 * (i);
			let posY = (Math.random()-0.5)*50 * (i);
			let posZ = (Math.random()-0.5)*50 * (i);
			let posVector = new THREE.Vector3(posX, posY, posZ);
			sphere.position.copy(posVector);
			sphere.userData.origin = posVector;
			sphere.userData.size = scale;
			starSystem.add(sphere);
		}
		this._starSystems.push(starSystem)
		this.object3d.add(starSystem);
	}
	update(delta,now){
		this._starSystems.forEach((starSystem)=>{
			starSystem.children.forEach((star)=>{
				if(star.userData.origin.x === 0 && star.userData.origin.y === 0 && star.userData.origin.z === 0) return;
				let time = now//star.userData.origin.length();
				star.position.set(Math.cos(time) * star.userData.origin.x, Math.sin(time)*star.userData.origin.y, Math.sin(time)*star.userData.origin.z)
			})
		})
	}
}