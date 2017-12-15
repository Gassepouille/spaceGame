var APP = APP || {};

APP.MapGenerator = class MapGenerator {
	constructor(parameters){
		this._width = parameters.width;
		this._height = parameters.height;
		this._color = parameters.color;
		
		this._canvas = document.createElement('canvas');
		this._canvas.width = parameters.width;
		this._canvas.height = parameters.height;
		this._context = this._canvas.getContext('2d');
		
		this._generateTexture();
	}
	get canvas(){
		return this._canvas;
	}
	_generateTexture(){
		var image = this._context.createImageData(this._canvas.width, this._canvas.height);
		var data = image.data;
		var simplex = new SimplexNoise();
		for (var x = 0; x < this._canvas.width; x++) {
			for (var y = 0; y < this._canvas.height; y++) {
				var greyScale = simplex.noise(x/140 , y/140 )* 0.5 + 0.5 ;
				data[(x + y * this._canvas.height) * 4 + 0] = greyScale * 255;
				data[(x + y * this._canvas.height) * 4 + 1] = greyScale * 255;
				data[(x + y * this._canvas.height) * 4 + 2] = greyScale * 255;
				data[(x + y * this._canvas.height) * 4 + 3] = 255;
			}
		}
		this._context.putImageData(image, 0, 0);
	}
}