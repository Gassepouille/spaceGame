var APP = APP || {};

APP.Star = class Star extends APP.GameObject {
	constructor(scale, position){
		super();
		this._origin = position;
		this._size = scale;
		
		this.object3d = new THREE.Mesh( APP.Planet._geometry, APP.Planet._material );
		this.object3d.position.copy(position);
		this.object3d.scale.multiplyScalar(scale);
		
	}
	update(delta,now){
	}
}
// radius 0.5=> diameter =1;
APP.Star._geometry = new THREE.SphereBufferGeometry( 0.5, 16, 16 );
APP.Star._material = new THREE.MeshBasicMaterial( {color: 0xffff00} );