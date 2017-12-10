var APP = APP || {};
// unit 1 = 1000km  ~~
APP.Galaxy = class Galaxy extends APP.GameObject{
	constructor(name, nSolarSystem, nstars, size){
		super();
		this._background = null;
		this._starSystems = [];
		
		this.object3d = new THREE.Group();
		
		this._createSkyBox();
		// this._generateStars();
		this._generateStarSystem();
	}
	_createSkyBox(){
		// Galaxy background
		let loader = new THREE.CubeTextureLoader();
		loader.setPath( 'assets/skybox/skybox_' );
		this._background = loader.load([ 'right.png', 'left.png', 'top.png', 'bot.png', 'front.png', 'back.png' ]);
	}
	_generateStars(){
		
		for (let i = 0; i < 100; i++) {
			let scale = Math.max(Math.random()*10,1);
			let posX = (Math.random()-0.5)*2000;
			let posY = (Math.random()-0.5)*2000;
			let posZ = (Math.random()-0.5)*2000;
			let posVector = new THREE.Vector3(posX, posY, posZ);
			let star = new APP.Star(scale, posVector)
			this.object3d.add(star.object3d);
		}
	}
	_generateStarSystem(){
		let starSystem = new THREE.Group();
		let planetsNumber =3// Math.round(Math.random()*10+3);
		let maxMainStarSize = 100;
		
		let prevPlanetScale = 0;
		let prevPlanetPosLength = 0;
		for (let i = 0; i < planetsNumber; i++) {
			let scale = Math.max(Math.random()*maxMainStarSize/(i+1),3);
			if(i===0 && scale < maxMainStarSize/2) scale = maxMainStarSize/2 + 10;
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
			let planet = new APP.Planet(scale, posVector);
			starSystem.add(planet.object3d);
			
			prevPlanetScale = scale;
			prevPlanetPosLength = posX;
		}
		this._starSystems.push(starSystem)
		this.object3d.add(starSystem);
	}
	update(delta,now){
	}
}