// todo squid class :)
// todo game engine spike 1 player
// todo basic swimming
// todo basic chirping - sound, graphic, indicator
// todo server / client 2 player
define(["require", "exports", 'three', 'meshes/eyeballMesh', 'meshes/tentacleMesh'], function (require, exports, THREE, EyeballMesh, TentacleMesh) {
    function randBetween(min, max) {
        return min + Math.random() * (max - min);
    }
    var App = (function () {
        function App() {
            this.eyeballs = [];
            this.tentacles = [];
            this.initScene();
            this.initMouse();
            this.initEyeballs();
            this.initTentacles();
        }
        App.prototype.initScene = function () {
            var _this = this;
            this.camera = new THREE.OrthographicCamera(window.innerWidth * -0.5, window.innerWidth * 0.5, window.innerHeight * 0.5, window.innerHeight * -0.5, 1.0, 1000.0);
            this.camera.position.z = 300.0;
            this.scene = new THREE.Scene();
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0x022D52);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.container = document.getElementById('container');
            this.container.appendChild(this.renderer.domElement);
            window.addEventListener('resize', function () {
                _this.camera.left = window.innerWidth * -0.5;
                _this.camera.right = window.innerWidth * 0.5;
                _this.camera.top = window.innerHeight * 0.5;
                _this.camera.bottom = window.innerHeight * -0.5;
                _this.camera.updateProjectionMatrix();
                _this.renderer.setSize(window.innerWidth, window.innerHeight);
            }, false);
        };
        App.prototype.initMouse = function () {
            var _this = this;
            this.input = new THREE.Vector3();
            this.input.set(0.0, 0.0, 0.0);
            this.renderer.domElement.addEventListener('mousemove', function (event) {
                _this.input.x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
                _this.input.y = ((event.clientY / window.innerHeight) * 2.0 - 1.0) * -1.0;
            });
        };
        App.prototype.initEyeballs = function () {
            var eyeball, i, radius, strokeWidth;
            var pos = new THREE.Vector3(), color = new THREE.Color();
            for (i = 0; i < 20; ++i) {
                pos.x = randBetween(-1, 1);
                pos.y = randBetween(-1, 1);
                pos.normalize();
                pos.multiplyScalar(Math.random() * 800 - 400);
                radius = randBetween(10, 40);
                strokeWidth = randBetween(3, 8);
                color.setHSL(randBetween(0.0, 1.0), randBetween(0.7, 1.0), randBetween(0.3, 0.5));
                eyeball = new EyeballMesh(radius, color, strokeWidth);
                eyeball.position.copy(pos);
                this.scene.add(eyeball);
                this.eyeballs.push(eyeball);
            }
        };
        App.prototype.initTentacles = function () {
            var tentacle = new TentacleMesh(30, 300, new THREE.Color(0xffaa00));
            this.scene.add(tentacle);
            this.tentacles.push(tentacle);
        };
        App.prototype.start = function () {
            this.update();
        };
        App.prototype.update = function () {
            var _this = this;
            requestAnimationFrame(function () {
                _this.update();
            });
            var vector = this.input.clone().unproject(this.camera);
            var now = window.performance.now();
            for (var _i = 0, _a = this.eyeballs; _i < _a.length; _i++) {
                var eyeball = _a[_i];
                eyeball.setTime(now);
                eyeball.lookAt(vector);
            }
            for (var _b = 0, _c = this.tentacles; _b < _c.length; _b++) {
                var tentacle = _c[_b];
                tentacle.update(vector);
            }
            this.render();
        };
        App.prototype.render = function () {
            this.renderer.render(this.scene, this.camera);
        };
        return App;
    })();
    return App;
});
//# sourceMappingURL=app.js.map