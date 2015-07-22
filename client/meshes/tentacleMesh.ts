
/// <reference path='../../typings/tsd.d.ts' />

import THREE = require('three');
import tentacleVertexShader = require('shaders/tentacle_vertex.glsl!text');
import tentacleFragmentShader = require('shaders/tentacle_fragment.glsl!text');

class TentacleMesh extends THREE.Mesh {

	static segments = 40.0;
	static deflection = 0.15;
	static friction = 0.30;
	static drift = new THREE.Vector2(0.01, -0.15);
	static sharedGeometry: THREE.BufferGeometry;
	static sharedMaterial: THREE.ShaderMaterial;

	public geometry: THREE.BufferGeometry;
	public material: THREE.ShaderMaterial;

	private controlPoints: Array<THREE.Vector2>;
	private velocityPoints: Array<THREE.Vector2>;
	private oldControlPoints: Array<THREE.Vector2>;
	private segmentLength: number;

	constructor(width: number, length: number, color: THREE.Color) {

		this.geometry = TentacleMesh.getBuffer();
		this.material = TentacleMesh.getMaterial();

		this.segmentLength = length / TentacleMesh.segments;
		this.controlPoints = [];
		this.velocityPoints = [];
		this.oldControlPoints = [];

		for (var i = 0; i < TentacleMesh.segments+1; ++i) {
			this.controlPoints.push(new THREE.Vector2(0.0, -length * (i / TentacleMesh.segments)));
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

		super(this.geometry, this.material);
	}

	public update (input: IVector): void {

		var delta = new THREE.Vector2(),
			i, n = this.controlPoints.length;

		var prev, curr, velocity, old;

		prev = this.controlPoints[0];
		prev.copy(input);

		for (i = 1; i < n; ++i) {

			curr = this.controlPoints[i];
			velocity = this.velocityPoints[i];
			old = this.oldControlPoints[i];

			curr.add(velocity);

			delta.subVectors(prev, curr);
			delta.normalize();
			delta.multiplyScalar(this.segmentLength);

			curr.subVectors(prev, delta);

			velocity.subVectors(curr, old);
			velocity.multiplyScalar(1.0 - TentacleMesh.friction);
			velocity.add(TentacleMesh.drift);

			old.copy(curr);

			prev = curr;
		}
	}

	private static getMaterial(): THREE.ShaderMaterial {

		if (!TentacleMesh.sharedMaterial) {
			TentacleMesh.sharedMaterial = new THREE.ShaderMaterial({
				uniforms: {
					uColor: {type:'c', value: new THREE.Color(0xffaa00)},
					uWidth: {type:'f', value: 25.0 },
					uControlPoints: { type:'v2v', value:[]}
				},
				defines: {
					'SEGMENTS': TentacleMesh.segments.toFixed(1),
					'DEFLECTION': TentacleMesh.deflection.toFixed(2)
				},
				vertexShader: tentacleVertexShader,
				fragmentShader: tentacleFragmentShader
			});
		}

		return TentacleMesh.sharedMaterial.clone();
	}

	private static getBuffer(): THREE.BufferGeometry {

		if (!TentacleMesh.sharedGeometry) {

			function setVector3(vertices, i, x, y, z) {
				var offset = i * 3;
				vertices[offset] = x;
				vertices[offset + 1] = y;
				vertices[offset + 2] = z;
			}

			TentacleMesh.sharedGeometry = new THREE.BufferGeometry();

			var i, vertexOffset, indexOffset,
				vIdx = 0,
				iIdx = 0,
				vertices = new Float32Array(3 * (6 + 5 * (TentacleMesh.segments - 1))),
				indices = new Uint16Array(3 * (4 + 6 * (TentacleMesh.segments - 1)));

			setVector3(vertices, vIdx, 0.0, 0.0, 0.0);
			setVector3(vertices, ++vIdx, 0.0, -1.0, 0.0);
			setVector3(vertices, ++vIdx, 0.0, 1.0, 0.0);
			setVector3(vertices, ++vIdx, 0.0, 0.0, 1.0);
			setVector3(indices, iIdx, 0, 3, 1);
			setVector3(indices, ++iIdx, 0, 2, 3);

			for (i = 0; i < TentacleMesh.segments; ++i) {
				vertexOffset = i + 1;
				indexOffset = 3 + i * 5;
				setVector3(vertices, ++vIdx, -1.0, -1.0, vertexOffset);
				setVector3(vertices, ++vIdx, -1.0, 1.0, vertexOffset);
				setVector3(vertices, ++vIdx, 1.0, -1.0, vertexOffset);
				setVector3(vertices, ++vIdx, 1.0, 1.0, vertexOffset);
				setVector3(vertices, ++vIdx, 0.0, 0.0, vertexOffset + 1.0);
				setVector3(indices, ++iIdx, indexOffset, indexOffset + 1, indexOffset - 2);
				setVector3(indices, ++iIdx, indexOffset, indexOffset - 1, indexOffset + 2);
				setVector3(indices, ++iIdx, indexOffset, indexOffset + 3, indexOffset + 1);
				setVector3(indices, ++iIdx, indexOffset, indexOffset + 2, indexOffset + 4);
				setVector3(indices, ++iIdx, indexOffset, indexOffset + 5, indexOffset + 3);
				setVector3(indices, ++iIdx, indexOffset, indexOffset + 4, indexOffset + 5);
			}

			TentacleMesh.sharedGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
			TentacleMesh.sharedGeometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
		}

		return TentacleMesh.sharedGeometry;
	}
}

export = TentacleMesh;
