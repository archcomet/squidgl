
/// <reference path='../../types.d.ts' />

import three = require('three');
import eyeballVertexShader = require('glsl!shaders/eyeball_vertex');
import eyeballFragmentShader = require('glsl!shaders/eyeball_fragment');

var sharedGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0, 1.0, 1.0);

var sharedMaterial = new THREE.ShaderMaterial({
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
	vertexShader: eyeballVertexShader,
	fragmentShader: eyeballFragmentShader,
	transparent: true
});

class EyeballMesh extends three.Mesh {

	material: THREE.ShaderMaterial;

	constructor(radius: number, color: THREE.Color, strokeWidth: number) {

		this.material = sharedMaterial.clone();

		var uniforms = this.material.uniforms;
		uniforms.uRadius.value = radius;
		uniforms.uStrokeWidth.value = strokeWidth;
		uniforms.uColor.value.copy(color);
		uniforms.uStroke.value.copy(color);
		uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);

		super(sharedGeometry, this.material);
	}

	lookAt(target: IVector) {
		this.material.uniforms.uLookAt.value.set(target.x, target.y);
	}

	setTime(time: number) {
		this.material.uniforms.uTime.value = time;
	}
}

export = EyeballMesh;