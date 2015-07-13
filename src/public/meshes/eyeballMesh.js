define([
	'THREE',
	'glsl!shaders/eyeball_vertex',
	'glsl!shaders/eyeball_fragment'
], function (THREE, eyeball_vertex, eyeball_fragment) {
	'use strict';

	var quadGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0, 1.0, 1.0);

	var eyeballMaterial = new THREE.ShaderMaterial({
		uniforms: {
			uRadius: {type: 'f', value: 30.0},
			uColor: {type: 'c', value: new THREE.Color() },
			uStroke: {type: 'c', value: new THREE.Color() },
			uStrokeWidth: {type: 'f', value: 4.0},
			uLookAt: {type: 'v2', value: new THREE.Vector2(0.0, 0.0)},
			uTime: {type: 'f', value: 0.0}
		},
		defines: {
			'PULSE_SPEED': 0.1,
			'PULSE_SIZE': 0.15,
			'SCLARA_RATIO': 0.6,
			'IRIS_RATIO': 0.38
		},
		vertexShader: eyeball_vertex,
		fragmentShader: eyeball_fragment,
		transparent: true
	});

	var EyeballMesh = function (radius, color, strokeWidth) {

		var material = eyeballMaterial.clone(),
			uniforms = material.uniforms;

		uniforms.uRadius.value = radius;
		uniforms.uStrokeWidth.value = strokeWidth;
		uniforms.uColor.value.copy(color);
		uniforms.uStroke.value.copy(color);
		uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);

		THREE.Mesh.call(this, quadGeometry, material);

	};

	EyeballMesh.prototype = Object.create(THREE.Mesh.prototype);

	EyeballMesh.prototype.lookAt = function (target) {
		this.material.uniforms.uLookAt.value.set(target.x, target.y);
	};

	EyeballMesh.prototype.setTime = function (time) {
		this.material.uniforms.uTime.value = time;
	};

	return EyeballMesh;

});