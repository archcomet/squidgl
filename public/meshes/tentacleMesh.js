/// <reference path='../../typings/tsd.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'three', 'shaders/tentacle_vertex.glsl!text', 'shaders/tentacle_fragment.glsl!text'], function (require, exports, THREE, tentacleVertexShader, tentacleFragmentShader) {
    var SEGMENTS = 20;
    var FRICTION = 0.35;
    var ENV = new THREE.Vector2(0.01, -0.15);
    var TentacleMesh = (function (_super) {
        __extends(TentacleMesh, _super);
        function TentacleMesh(width, length, color) {
            this.material = TentacleMesh.sharedMaterial.clone();
            this.segmentLength = length / SEGMENTS;
            this.controlPoints = [];
            this.velocityPoints = [];
            this.oldControlPoints = [];
            for (var i = 0; i < SEGMENTS + 1; ++i) {
                this.controlPoints.push(new THREE.Vector2(0.0, -length * (i / SEGMENTS)));
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
            _super.call(this, TentacleMesh.sharedBuffer, this.material);
        }
        TentacleMesh.prototype.update = function (input) {
            var controlPoints = this.material.uniforms.uControlPoints.value, velocityPoints = this.velocityPoints, oldControlPoints = this.oldControlPoints, segmentLength = this.segmentLength;
            var delta = new THREE.Vector2(), i, n = controlPoints.length;
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
    })(THREE.Mesh);
    TentacleMesh.sharedMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uColor: { type: 'c', value: new THREE.Color(0xffaa00) },
            uWidth: { type: 'f', value: 25.0 },
            uControlPoints: { type: 'v2v', value: [] }
        },
        vertexShader: tentacleVertexShader,
        fragmentShader: tentacleFragmentShader
    });
    TentacleMesh.sharedBuffer = (function () {
        function setVector3(vertices, i, x, y, z) {
            var offset = i * 3;
            vertices[offset] = x;
            vertices[offset + 1] = y;
            vertices[offset + 2] = z;
        }
        var bufferGeometry = new THREE.BufferGeometry();
        var i, offset, vIdx = 0, iIdx = 0, vertices = new Float32Array(3 * (6 + 5 * (SEGMENTS - 1))), indices = new Uint16Array(3 * (4 + 6 * (SEGMENTS - 1)));
        setVector3(vertices, vIdx, 0.0, 0.0, 0.0);
        setVector3(vertices, ++vIdx, 0.0, -1.0, 0.0);
        setVector3(vertices, ++vIdx, 0.0, 1.0, 0.0);
        setVector3(vertices, ++vIdx, 0.0, 0.0, 1.0);
        setVector3(indices, iIdx, 0, 3, 1);
        setVector3(indices, ++iIdx, 0, 2, 3);
        setVector3(vertices, ++vIdx, -1.0, -1.0, 1.0);
        setVector3(vertices, ++vIdx, 1.0, -1.0, 1.0);
        //
        setVector3(indices, ++iIdx, 3, 4, 1);
        setVector3(indices, ++iIdx, 3, 2, 5);
        //
        //for (i = 0; i < SEGMENTS; ++i) {
        //
        //	setVector3(vertices, ++vIdx, -1.0, -1.0, i+1);
        //	setVector3(vertices, ++vIdx, -1.0,  1.0, i+1);
        //	setVector3(vertices, ++vIdx,  1.0, -1.0, i+1);
        //	setVector3(vertices, ++vIdx,  1.0,  1.0, i+1);
        //	setVector3(vertices, ++vIdx,  0.0,  0.0, i+2);
        //
        //	offset = (i + 1) * 5;
        //
        //	setVector3(indices, ++iIdx, offset, offset + 1, offset - 2);
        //	//setVector3(indices, ++iIdx, offset, offset - 1, offset + 2);
        //	//setVector3(indices, ++iIdx, offset, offset + 3, offset + 1);
        //	//setVector3(indices, ++iIdx, offset, offset + 2, offset + 4);
        //	//setVector3(indices, ++iIdx, offset, offset + 5, offset + 3);
        //	//setVector3(indices, ++iIdx, offset, offset + 4, offset + 5);
        //}
        bufferGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
        bufferGeometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
        return bufferGeometry;
    }());
    return TentacleMesh;
});
//# sourceMappingURL=tentacleMesh.js.map