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
			uControlPoints: { type:'v2v', value:[]}
		},
		vertexShader: tentacle_vertex,
		fragmentShader: tentacle_fragment
	});

	function createBufferGeometry(size) {

		var bufferGeometry = new THREE.BufferGeometry();

		var i, offset,
			length = 6 * (size-1) + 3,
			indices = new Uint16Array(length),
			vertices = new Float32Array(length);

		for (i = 0; i < size - 1; ++i) {
			offset = i * 6;

			vertices[offset] = -1.0;
			vertices[offset+1] = i;
			vertices[offset+2] = 0.0;

			vertices[offset+3] = 1.0;
			vertices[offset+4] = i;
			vertices[offset+5] = 0.0;

			indices[offset] = i*2;
			indices[offset+1] = i*2+1;
			indices[offset+2] = i*2+2;

			if (i < size - 2) {
				indices[offset + 3] = i * 2 + 2;
				indices[offset + 4] = i * 2 + 1;
				indices[offset + 5] = i * 2 + 3;
			}
		}

		offset = i * 6;
		vertices[offset] = 0.0;
		vertices[offset+1] = i;
		vertices[offset+2] = 0.0;

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

	var TentacleMesh = function(width, length, color) {

		var bufferGeometry = getSharedGeometry(20);
		var material = shaderMaterial.clone();
		var uniforms = material.uniforms;

		var i, controlPoints = [];
		for (i = 0; i < 20; ++i) {
			controlPoints.push(new THREE.Vector2(0.0, length * (i / 19)));
		}

		controlPoints.push(new THREE.Vector2(0.0, length));

		uniforms.uWidth.value = width;
		uniforms.uColor.value.copy(color);
		uniforms.uControlPoints.value = controlPoints;

		THREE.Mesh.call(this, bufferGeometry, material);
	};

	TentacleMesh.prototype = Object.create(THREE.Mesh.prototype);
	TentacleMesh.prototype.constructor = THREE.Mesh;

	// todo IK for control points

	return TentacleMesh;


});