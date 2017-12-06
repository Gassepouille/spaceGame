var APP = APP || {};

APP.GameEngine = class GameEngine {
	constructor(domElement){
		this._container = domElement;
		// Renderer
		this._renderer  = new THREE.WebGLRenderer({
			antialias  : true,
			alpha    : true,
		});
		this._container.appendChild( this._renderer.domElement );
		// Engine
		this._gameLoop = new APP.GameLoop();
		
		// Camera + scene
		this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.set(1,3,1);
		this.camera.lookAt(new THREE.Vector3(0,0,0));
	        this.scene = new THREE.Scene();

		

		// render scene
		this._gameLoop.onUpdateFcts.push((delta,now)=>{
                        // run update of game objects
			APP.GameObject.updateAll();
			this._renderer.render( this.scene, this.camera );
		})

		// resize
		this.onWindowResize();
		window.addEventListener('resize', ()=>{
	                this.onWindowResize();
	        }, false)

	}
	start(){
		this._gameLoop.start();
	}
	stop(){
		this._gameLoop.stop();
	}
	pause(){
		this._gameLoop.pause();
	}
	onWindowResize(){
		let width  =  window.innerWidth;
		let height =  window.innerHeight;
		this.camera.aspect = width / height;
	        this.camera.updateProjectionMatrix();
		this._renderer.setSize( width, height );
	}
}
