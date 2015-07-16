define([
	'THREE',
	'glsl!shaders/tentacle_vertex',
	'glsl!shaders/tentacle_fragment'
], function (THREE, tentacle_vertex, tentacle_fragment) {
	'use strict';

	//todo temp
	var FRICTION = 0.35;
	var ENV = new THREE.Vector2(0.01, -0.15);

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


	function setVector3(vertices, i, x, y, z) {
		var offset = i*3;
		vertices[offset] = x;
		vertices[offset+1] = y;
		vertices[offset+2] = z;
	}

	function createBufferGeometry2(size) {

		var bufferGeometry = new THREE.BufferGeometry();

		var i, offset,
			vIdx = 0,
			iIdx = 0,
			xOf = 0.414,
			vertices = new Float32Array(3 * (6 + 5 * (size-1))),
			indices = new Uint16Array(3 * (4 + 6 * (size-1)));

		setVector3(vertices,   vIdx, 0.0,  0.0, 0.0);
		setVector3(vertices, ++vIdx, 0.0, -1.0, 0.0);
		setVector3(vertices, ++vIdx, 0.0,  1.0, 0.0);
		setVector3(vertices, ++vIdx, xOf, -1.0, 0.0);
		setVector3(vertices, ++vIdx, xOf,  1.0, 0.0);
		setVector3(vertices, ++vIdx, 0.0,  0.0, 1.0);

		setVector3(indices,   iIdx, 0, 2, 1);
		setVector3(indices, ++iIdx, 0, 5, 3);
		setVector3(indices, ++iIdx, 0, 4, 3);
		setVector3(indices, ++iIdx, 0, 2, 4);

		for (i = 0; i < size; ++i) {

			setVector3(vertices, ++vIdx, -xOf, -1.0, i+1);
			setVector3(vertices, ++vIdx, -xOf,  1.0, i+1);
			setVector3(vertices, ++vIdx,  xOf, -1.0, i+1);
			setVector3(vertices, ++vIdx,  xOf,  1.0, i+1);
			setVector3(vertices, ++vIdx,  0.0,  0.0, i+2);

			offset = (i + 1) * 5;

			setVector3(indices, ++iIdx, offset, offset + 1, offset - 2);
			setVector3(indices, ++iIdx, offset, offset - 1, offset + 2);
			setVector3(indices, ++iIdx, offset, offset + 3, offset + 1);
			setVector3(indices, ++iIdx, offset, offset + 2, offset + 4);
			setVector3(indices, ++iIdx, offset, offset + 5, offset + 3);
			setVector3(indices, ++iIdx, offset, offset + 4, offset + 5);
		}

		bufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
		bufferGeometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ));

		return bufferGeometry;
	}

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

		var i, controlPoints = [],
			velocityPoints = [],
			oldControlPoints = [];

		for (i = 0; i < 20; ++i) {
			controlPoints.push(new THREE.Vector2(0.0, -length * (i / 19)));
			velocityPoints.push(new THREE.Vector2(0.0, 0.0));
			oldControlPoints.push(new THREE.Vector2(0.0, 0.0));
		}

		controlPoints.push(new THREE.Vector2(0.0, length));
		velocityPoints.push(new THREE.Vector2(0.0, 0.0));
		oldControlPoints.push(new THREE.Vector2(0.0, 0.0));

		uniforms.uWidth.value = width;
		uniforms.uColor.value.copy(color);
		uniforms.uControlPoints.value = controlPoints;

		// todo typed array
		this.segmentLength = length / 18;
		this.oldControlPoints = oldControlPoints;
		this.velocityPoints = velocityPoints;

		THREE.Mesh.call(this, bufferGeometry, material);
	};

	TentacleMesh.prototype = Object.create(THREE.Mesh.prototype);
	TentacleMesh.prototype.constructor = THREE.Mesh;

	// todo IK for control points

	TentacleMesh.prototype.update = function(input) {

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

	};

	return TentacleMesh;


});