/// <reference path='../types.d.ts' />

import THREE = require('three');
let eyeballVertexShader = require('./eyeballShaderVertex.glsl!text');
let eyeballFragmentShader = require('./eyeballShaderFragment.glsl!text');

interface IEyeballMeshOptions {
    color: THREE.Color;
    radius: number;
    strokeWidth: number;
}

class EyeballMesh extends THREE.Mesh {

    private static sharedGeometry:THREE.PlaneBufferGeometry;
    private static sharedMaterial:THREE.ShaderMaterial;

    public material:THREE.ShaderMaterial;

    constructor(options: IEyeballMeshOptions) {

        var geometry = EyeballMesh.getGeometry();
        var material = EyeballMesh.getMaterial();

        var uniforms = material.uniforms;
        uniforms.uRadius.value = options.radius;
        uniforms.uStrokeWidth.value = options.strokeWidth;
        uniforms.uColor.value.copy(options.color);
        uniforms.uStroke.value.copy(options.color);
        uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);

        super(geometry, material);
    }

    public lookAt(target:IVector):void {
        this.material.uniforms.uLookAt.value.set(target.x, target.y);
    }

    public setTime(time:number):void {
        this.material.uniforms.uTime.value = time;
    }

    private static getGeometry():THREE.PlaneBufferGeometry {
        if (!EyeballMesh.sharedGeometry) {
            EyeballMesh.sharedGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0, 1.0, 1.0);
        }
        return EyeballMesh.sharedGeometry;
    }

    private static getMaterial():THREE.ShaderMaterial {

        if (!EyeballMesh.sharedMaterial) {
            EyeballMesh.sharedMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uRadius: {type: 'f', value: 30.0},
                    uStrokeWidth: {type: 'f', value: 4.0},
                    uColor: {type: 'c', value: new THREE.Color()},
                    uStroke: {type: 'c', value: new THREE.Color()},
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
        }

        return EyeballMesh.sharedMaterial.clone();
    }
}

export = EyeballMesh;