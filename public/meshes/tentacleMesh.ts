
/// <reference path='../../typings/tsd.d.ts' />

import THREE = require('three');
import tentacleVertexShader = require('shaders/tentacle_vertex.glsl!text');
import tentacleFragmentShader = require('shaders/tentacle_fragment.glsl!text');

var SEGMENTS = 20;
var FRICTION = 0.35;
var ENV = new THREE.Vector2(0.01, -0.15);

class TentacleMesh extends THREE.Mesh {

	static sharedMaterial: THREE.ShaderMaterial;
	static sharedBuffer: THREE.BufferGeometry;

	public material: THREE.ShaderMaterial;
	public controlPoints: THREE.Vector2[];
	public velocityPoints: THREE.Vector2[];
	public oldControlPoints: THREE.Vector2[];

	private segmentLength: number;

	constructor(width: number, length: number, color: THREE.Color) {

		this.material = TentacleMesh.sharedMaterial.clone();

		this.segmentLength = length / SEGMENTS;
		this.controlPoints = [];
		this.velocityPoints = [];
		this.oldControlPoints = [];

		for (var i = 0; i < SEGMENTS+1; ++i) {
			this.controlPoints.push(new THREE.Vector2(0.0, -length * (i / SEGMENTS)));
			this.velocityPoints.push(new THREE.Vector2(0.0, 0.0));
			this.oldControlPoints.push(new THREE.Vector2(0.0, 0.0));
		}

		this.controlPoints.push(new THREE.Vector2(0.0, -length));
		this.velocityPoints.push(new THREE.Vector2(0.0, 0.0));
		this.oldControlPoints.push(new THREE.Vector2(0.0, 0.0));

		var uniforms = this.material.uniforms;
		uniforms.uWidth.value = width;
		uniforms.uColor.value.copy(color);
		uniforms.uControlPoints.value = this.controlPoints;

		super(TentacleMesh.sharedBuffer, this.material);
	}

	update (input: IVector) {

		var controlPoints = this.material.uniforms.uControlPoints.value,
			velocityPoints = this.velocityPoints,
			oldControlPoints = this.oldControlPoints,
			segmentLength = this.segmentLength;

		var delta = new THREE.Vector2(),
			i, n = controlPoints.length;

		var prev, curr, velocity, old;

		prev = controlPoints[0];
		prev.copy(input);

		for (i = 1; i < n; ++i) {

			curr = controlPoints[i];
			velocity = velocityPoints[i];
			old = oldControlPoints[i];

			curr.add(velocity);

			delta.subVectors(prev, curr);
			delta.normalize();
			delta.multiplyScalar(segmentLength);

			curr.subVectors(prev, delta);

			velocity.subVectors(curr, old);
			velocity.multiplyScalar(1.0 - FRICTION);
			velocity.add(ENV);

			old.copy(curr);

			prev = curr;
		}
	}
}

TentacleMesh.sharedMaterial = new THREE.ShaderMaterial({
	uniforms: {
		uColor: {type:'c', value: new THREE.Color(0xffaa00)},
		uWidth: {type:'f', value: 25.0 },
		uControlPoints: { type:'v2v', value:[]}
	},
	vertexShader: tentacleVertexShader,
	fragmentShader: tentacleFragmentShader
});

TentacleMesh.sharedBuffer = (function() {

	function setVector3(vertices, i, x, y, z) {
		var offset = i*3;
		vertices[offset] = x;
		vertices[offset+1] = y;
		vertices[offset+2] = z;
	}

	var bufferGeometry = new THREE.BufferGeometry();

	var i, offset,
		vIdx = 0,
		iIdx = 0,
		vertices = new Float32Array(3 * (6 + 5 * (SEGMENTS-1))),
		indices = new Uint16Array(3 * (4 + 6 * (SEGMENTS-1)));

	setVector3(vertices,   vIdx, 0.0,  0.0, 0.0);
	setVector3(vertices, ++vIdx, 0.0, -1.0, 0.0);
	setVector3(vertices, ++vIdx, 0.0,  1.0, 0.0);
	setVector3(vertices, ++vIdx, 0.0,  0.0, 1.0);

	setVector3(indices,   iIdx, 0, 3, 1);
	setVector3(indices, ++iIdx, 0, 2, 3);


	setVector3(vertices, ++vIdx, -1.0, -1.0, 1.0);
	setVector3(vertices, ++vIdx,  1.0, -1.0, 1.0);
	//
	setVector3(indices, ++iIdx, 3, 4, 1);
	setVector3(indices, ++iIdx, 3, 2, 5);

	//

	//for (i = 0; i < SEGMENTS; ++i) {
	//
	//	setVector3(vertices, ++vIdx, -1.0, -1.0, i+1);
	//	setVector3(vertices, ++vIdx, -1.0,  1.0, i+1);
	//	setVector3(vertices, ++vIdx,  1.0, -1.0, i+1);
	//	setVector3(vertices, ++vIdx,  1.0,  1.0, i+1);
	//	setVector3(vertices, ++vIdx,  0.0,  0.0, i+2);
	//
	//	offset = (i + 1) * 5;
	//
	//	setVector3(indices, ++iIdx, offset, offset + 1, offset - 2);
	//	//setVector3(indices, ++iIdx, offset, offset - 1, offset + 2);
	//	//setVector3(indices, ++iIdx, offset, offset + 3, offset + 1);
	//	//setVector3(indices, ++iIdx, offset, offset + 2, offset + 4);
	//	//setVector3(indices, ++iIdx, offset, offset + 5, offset + 3);
	//	//setVector3(indices, ++iIdx, offset, offset + 4, offset + 5);
	//}

	bufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	bufferGeometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ));

	return bufferGeometry;

}());


export = TentacleMesh;
