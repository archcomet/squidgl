define([
	'THREE',
	'glsl!shaders/tentacle_vertex',
	'glsl!shaders/tentacle_fragment'
], function (THREE, tentacle_vertex, tentacle_fragment) {
	'use strict';

	var sharedBuffers = {};

	var shaderMaterial = new THREE.ShaderMaterial({
		uniforms: {
			uColor: {type:'c', value: new THREE.Color(0xffaa00)},
			uWidth: {type:'f', value: 25.0 },
			uControlPoints: { type:'v3v', value:[]},
			uPointsSize: {type:'i', value: 20 }
		},
		vertexShader: tentacle_vertex,
		fragmentShader: tentacle_fragment
	});

	function createBufferGeometry(size) {

		var bufferGeometry = new THREE.BufferGeometry();

		var i, length = 6 * (size-1) + 3,
			indices = new Int32Array(length),
			vertices = new Float32Array(length);

		for (i = 0; i < size - 1; ++i) {

			vertices[i*6]   = -1.0;
			vertices[i*6+1] = i;
			vertices[i*6+2] = 0.0;

			vertices[i*6+3] = 1.0;
			vertices[i*6+4] = i;
			vertices[i*6+5] = 0.0;

			indices[i*6] = i*2;
			indices[i*6+1] = i*2+1;
			indices[i*6+2] = i*2+2;

			indices[i*6+3] = i*2+2;
			indices[i*6+4] = i*2+1;
			indices[i*6+5] = i*2+3;
		}

		vertices[i*6]   = 0.0;
		vertices[i*6+1] = i;
		vertices[i*6+2] = 0.0;

		indices[i*6] = i*2;
		indices[i*6+1] = i*2+1;
		indices[i*6+2] = i*2+2;

		bufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
		bufferGeometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ));

		return bufferGeometry;
	}

	function getSharedGeometry(size) {
		var bufferGeometry = sharedBuffers[size];
		if (!bufferGeometry) {
			bufferGeometry = sharedBuffers[size] = createBufferGeometry(size);
		}
		return bufferGeometry;
	}

	var TentacleMesh = function(width, length, size) {

		var bufferGeometry = getSharedGeometry(size);
		var material = shaderMaterial.clone();

		// todo control point magic and setting other uniforms

		THREE.Mesh.call(this, bufferGeometry, material);
	};

	TentacleMesh.prototype = Object.create(THREE.Mesh.prototype);
	TentacleMesh.prototype.constructor = THREE.Mesh;

	// todo IK for control points

	return TentacleMesh;


});