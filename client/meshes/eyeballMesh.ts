/// <reference path='../types.d.ts' />

import THREE = require('three');
import eyeballVertexShader = require('shaders/eyeball_vertex.glsl!text');
import eyeballFragmentShader = require('shaders/eyeball_fragment.glsl!text');

class EyeballMesh extends THREE.Mesh {

    private static sharedGeometry:THREE.PlaneBufferGeometry;
    private static sharedMaterial:THREE.ShaderMaterial;

    public geometry:THREE.BufferGeometry;
    public material:THREE.ShaderMaterial;

    constructor(radius:number, color:THREE.Color, strokeWidth:number) {

        this.geometry = EyeballMesh.getGeometry();
        this.material = EyeballMesh.getMaterial();

        var uniforms = this.material.uniforms;
        uniforms.uRadius.value = radius;
        uniforms.uStrokeWidth.value = strokeWidth;
        uniforms.uColor.value.copy(color);
        uniforms.uStroke.value.copy(color);
        uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);

        super(this.geometry, this.material);
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