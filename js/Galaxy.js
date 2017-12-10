var APP = APP || {};
// unit 1 = 1000km  ~~
APP.Galaxy = class Galaxy extends APP.GameObject{
	constructor(name, nSolarSystem, nstars, size){
		super();
		this._background = null;
		this._starSystems = [];
		
		this.object3d = new THREE.Group();
                // radius 0.5=> diameter =1;
		this._starGeometry = new THREE.SphereBufferGeometry( 0.5, 16, 16 );
		
		
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
		let planetsNumber = Math.round(Math.random()*10+3);
		let geometry = this._starGeometry;
		let material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		let maxMainStarSize = 100;
		
		let prevPlanetScale = 0;
		let prevPlanetPosLength = 0;
		for (let i = 0; i < planetsNumber; i++) {
			let sphere = new THREE.Mesh( geometry, material );
			
			let scale = Math.max(Math.random()*maxMainStarSize/(i+1),planetsNumber/(i+1));
			if(i===0 && scale < maxMainStarSize/2) scale = maxMainStarSize/2 + 10;
			sphere.scale.multiplyScalar(scale);
			
			let posX = (Math.random()-0.5)*50 * (i);
			let posY = (Math.random()-0.5)*20 * (i);
			let posZ = posX/1.5;
			
			if(i!==0 && Math.abs(posX) < Math.abs(prevPlanetPosLength) + prevPlanetScale*2 + scale*2 ){
				while (Math.abs(posX) <  Math.abs(prevPlanetPosLength) + prevPlanetScale*2 + scale*2 ) {
					posX*=1.2;
					posY=(posY<120)?posY*1.1:120;
					posZ=posX/1.5;
				}
			}

			let posVector = new THREE.Vector3(posX, posY, posZ);
			sphere.position.copy(posVector);

			if (i!==0 && scale>maxMainStarSize/10) {
				console.log("create satellite");
			}
			
			sphere.userData.origin = posVector;
			sphere.userData.size = scale;
			
			starSystem.add(sphere);
			prevPlanetScale = scale;
			prevPlanetPosLength = posX;
		}
		this._starSystems.push(starSystem)
		this.object3d.add(starSystem);
	}
	update(delta,now){
		this._starSystems.forEach((starSystem)=>{
			starSystem.children.forEach((star)=>{
				if(star.userData.origin.x === 0 && star.userData.origin.y === 0 && star.userData.origin.z === 0) return;
				
				let time = now*100/star.userData.origin.length() + star.userData.origin.length();
				star.position.set(Math.cos(time) * star.userData.origin.x, Math.sin(time)*star.userData.origin.y, Math.sin(time)*star.userData.origin.z)
			})
		})
	}
}