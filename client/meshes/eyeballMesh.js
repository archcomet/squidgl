/// <reference path='../types.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'three', 'shaders/eyeball_vertex.glsl!text', 'shaders/eyeball_fragment.glsl!text'], function (require, exports, THREE, eyeballVertexShader, eyeballFragmentShader) {
    var EyeballMesh = (function (_super) {
        __extends(EyeballMesh, _super);
        function EyeballMesh(radius, color, strokeWidth) {
            this.geometry = EyeballMesh.getGeometry();
            this.material = EyeballMesh.getMaterial();
            var uniforms = this.material.uniforms;
            uniforms.uRadius.value = radius;
            uniforms.uStrokeWidth.value = strokeWidth;
            uniforms.uColor.value.copy(color);
            uniforms.uStroke.value.copy(color);
            uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);
            _super.call(this, this.geometry, this.material);
        }
        EyeballMesh.prototype.lookAt = function (target) {
            this.material.uniforms.uLookAt.value.set(target.x, target.y);
        };
        EyeballMesh.prototype.setTime = function (time) {
            this.material.uniforms.uTime.value = time;
        };
        EyeballMesh.getGeometry = function () {
            if (!EyeballMesh.sharedGeometry) {
                EyeballMesh.sharedGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0, 1.0, 1.0);
            }
            return EyeballMesh.sharedGeometry;
        };
        EyeballMesh.getMaterial = function () {
            if (!EyeballMesh.sharedMaterial) {
                EyeballMesh.sharedMaterial = new THREE.ShaderMaterial({
                    uniforms: {
                        uRadius: { type: 'f', value: 30.0 },
                        uStrokeWidth: { type: 'f', value: 4.0 },
                        uColor: { type: 'c', value: new THREE.Color() },
                        uStroke: { type: 'c', value: new THREE.Color() },
                        uLookAt: { type: 'v2', value: new THREE.Vector2(0.0, 0.0) },
                        uTime: { type: 'f', value: 0.0 }
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
        };
        return EyeballMesh;
    })(THREE.Mesh);
    return EyeballMesh;
});
//# sourceMappingURL=eyeballMesh.js.map