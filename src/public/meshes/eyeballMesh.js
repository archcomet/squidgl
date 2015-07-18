/// <reference path='../../types.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'three', 'glsl!shaders/eyeball_vertex', 'glsl!shaders/eyeball_fragment'], function (require, exports, three, eyeballVertexShader, eyeballFragmentShader) {
    var sharedGeometry = new THREE.PlaneBufferGeometry(2.0, 2.0, 1.0, 1.0);
    var sharedMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uRadius: { type: 'f', value: 30.0 },
            uColor: { type: 'c', value: new THREE.Color() },
            uStroke: { type: 'c', value: new THREE.Color() },
            uStrokeWidth: { type: 'f', value: 4.0 },
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
    var EyeballMesh = (function (_super) {
        __extends(EyeballMesh, _super);
        function EyeballMesh(radius, color, strokeWidth) {
            this.material = sharedMaterial.clone();
            var uniforms = this.material.uniforms;
            uniforms.uRadius.value = radius;
            uniforms.uStrokeWidth.value = strokeWidth;
            uniforms.uColor.value.copy(color);
            uniforms.uStroke.value.copy(color);
            uniforms.uStroke.value.offsetHSL(0.0, 0.0, 0.25);
            _super.call(this, sharedGeometry, this.material);
        }
        EyeballMesh.prototype.lookAt = function (target) {
            this.material.uniforms.uLookAt.value.set(target.x, target.y);
        };
        EyeballMesh.prototype.setTime = function (time) {
            this.material.uniforms.uTime.value = time;
        };
        return EyeballMesh;
    })(three.Mesh);
    return EyeballMesh;
});
//# sourceMappingURL=eyeballMesh.js.map