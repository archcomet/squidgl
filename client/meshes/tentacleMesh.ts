
/// <reference path='../../typings/tsd.d.ts' />

import THREE = require('three');
import tentacleVertexShader = require('shaders/tentacle_vertex.glsl!text');
import tentacleFragmentShader = require('shaders/tentacle_fragment.glsl!text');

class TentacleMesh extends THREE.Mesh {

	static angleStart = Math.PI/6;
	static angleEnd = Math.PI/2;

	static segments = 40.0;
	static deflection = 0.18;
	static friction = 0.25;
	static maxSegmentVelocity = 6;

	static drift = new THREE.Vector2(0.01, -0.15);

	static sharedGeometry: THREE.BufferGeometry;
	static sharedMaterial: THREE.ShaderMaterial;
	public geometry: THREE.BufferGeometry;
	public material: THREE.ShaderMaterial;

	private controlPoints: Array<THREE.Vector2>;
	private velocityPoints: Array<THREE.Vector2>;
	private oldControlPoints: Array<THREE.Vector2>;
	private angleLimits: Array<THREE.Vector2>;

	private segmentLength: number;

	constructor(width: number, length: number, color: THREE.Color) {

		this.geometry = TentacleMesh.getBuffer();
		this.material = TentacleMesh.getMaterial();

		this.segmentLength = length / TentacleMesh.segments;
		this.controlPoints = [];
		this.velocityPoints = [];
		this.oldControlPoints = [];
		this.angleLimits = [];

		for (var i = 0; i < TentacleMesh.segments+1; ++i) {
			this.controlPoints.push(new THREE.Vector2(0.0, -length * (i / TentacleMesh.segments)));
			this.velocityPoints.push(new THREE.Vector2(0.0, 0.0));
			this.oldControlPoints.push(new THREE.Vector2(0.0, 0.0));

			var t = i / TentacleMesh.segments;
			var angle = (TentacleMesh.angleEnd - TentacleMesh.angleStart) * t + TentacleMesh.angleStart;
			this.angleLimits.push(new THREE.Vector2(Math.cos(angle), Math.sin(angle)));
		}

		this.controlPoints.push(new THREE.Vector2(0.0, -length));
		this.velocityPoints.push(new THREE.Vector2(0.0, 0.0));
		this.oldControlPoints.push(new THREE.Vector2(0.0, 0.0));

		var uniforms = this.material.uniforms;
		uniforms.uWidth.value = width;
		uniforms.uColor.value.copy(color);
		uniforms.uStroke.value.copy(color);
		uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);
		uniforms.uControlPoints.value = this.controlPoints;

		super(this.geometry, this.material);
	}

	public update (input: IVector): void {

		var i, n = this.controlPoints.length;

		var prevPos = this.controlPoints[0],
			oldPos = this.oldControlPoints[0],
			limit:THREE.Vector2,
			currPos:THREE.Vector2,
			velocity:THREE.Vector2,
			cross:number,
			prevNorm = new THREE.Vector2(),
			currNorm = new THREE.Vector2(),
			currDir = new THREE.Vector2();

		oldPos.copy(prevPos);
		prevPos.set(input.x, input.y);

		for (i = 1; i < n-1; ++i) {

			currPos = this.controlPoints[i];
			velocity = this.velocityPoints[i];
			oldPos = this.oldControlPoints[i];
			limit = this.angleLimits[i];
			currPos.add(velocity);
			currNorm.subVectors(currPos, prevPos);
			currNorm.normalize();

			if (i >= 2 && currNorm.dot(prevNorm) < limit.x) {
				cross = currNorm.x * prevNorm.y - currNorm.y * prevNorm.x;
				cross /= -Math.abs(cross);
				currNorm.x = prevNorm.x * limit.x - cross * prevNorm.y * limit.y;
				currNorm.y = cross * prevNorm.x * limit.y + prevNorm.y * limit.x;
			}

			currDir.copy(currNorm);
			currDir.multiplyScalar(this.segmentLength);
			currPos.addVectors(prevPos, currDir);

			velocity.subVectors(currPos, oldPos);
			velocity.multiplyScalar(1.0 - TentacleMesh.friction);
			velocity.add(TentacleMesh.drift);

			if (velocity.length() > TentacleMesh.maxSegmentVelocity) {
				velocity.normalize();
				velocity.multiplyScalar(TentacleMesh.maxSegmentVelocity);
			}

			oldPos.copy(currPos);
			prevNorm.copy(currNorm);
			prevPos = currPos;
		}
	}

	private static getMaterial(): THREE.ShaderMaterial {

		if (!TentacleMesh.sharedMaterial) {
			TentacleMesh.sharedMaterial = new THREE.ShaderMaterial({
				uniforms: {
					uColor: {type:'c', value: new THREE.Color(0xffaa00)},
					uStroke: {type:'c', value: new THREE.Color()},
					uStrokeWidth: {type: 'f', value: 4.0},
					uWidth: {type:'f', value: 25.0 },
					uControlPoints: { type:'v2v', value:[]}
				},
				defines: {
					'SEGMENTS': TentacleMesh.segments.toFixed(1),
					'DEFLECTION': TentacleMesh.deflection.toFixed(2)
				},
				vertexShader: tentacleVertexShader,
				fragmentShader: tentacleFragmentShader,
				transparent: true
			});
		}

		return TentacleMesh.sharedMaterial.clone();
	}

	private static getBuffer(): THREE.BufferGeometry {

		if (!TentacleMesh.sharedGeometry) {

			function setVector3(array, i, x, y, z) {
				var offset = i * 3;
				array[offset] = x;
				array[offset + 1] = y;
				array[offset + 2] = z;
			}

			TentacleMesh.sharedGeometry = new THREE.BufferGeometry();

			var i:number,
				vertexOffset:number,
				indexOffset:number,
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
