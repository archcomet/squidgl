
// todo squid class :)
// todo game engine spike 1 player
    // todo basic swimming
    // todo basic chirping - sound, graphic, indicator
// todo server / client 2 player

/// <reference path='types.d.ts' />

import THREE = require('three');
import EyeballMesh = require('meshes/eyeballMesh');
import TentacleMesh = require('meshes/tentacleMesh');

function randBetween (min: number, max: number): number {
    return min + Math.random() * (max - min);
}

class App {

    public camera: THREE.OrthographicCamera;
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;

    private input: THREE.Vector3;
    private eyeballs: Array<EyeballMesh>;
    private tentacles: Array<TentacleMesh>;
    private container: Element;

    constructor() {

        this.eyeballs = [];
        this.tentacles = [];

        this.initScene();
        this.initMouse();
        this.initEyeballs();
        this.initTentacles();
    }

    initScene(): void {

        this.camera = new THREE.OrthographicCamera(
            window.innerWidth * -0.5,
            window.innerWidth * 0.5,
            window.innerHeight * 0.5,
            window.innerHeight * -0.5,
            1.0, 1000.0
        );

        this.camera.position.z = 300.0;

        this.scene = new THREE.Scene();

        this.renderer =  new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x022D52);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container = document.getElementById('container');
        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {

            this.camera.left = window.innerWidth * -0.5;
            this.camera.right = window.innerWidth * 0.5;
            this.camera.top = window.innerHeight * 0.5;
            this.camera.bottom = window.innerHeight * -0.5;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);

        }, false);

    }

    initMouse(): void {

        this.input = new THREE.Vector3();
        this.input.set(0.0, 0.0, 0.0);

        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.input.x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
            this.input.y = ((event.clientY / window.innerHeight) * 2.0 - 1.0) * -1.0;
        });

    }

    initEyeballs() {

        var eyeball, i, radius, strokeWidth;

        var pos = new THREE.Vector3(),
            color = new THREE.Color();

        for (i = 0; i < 20; ++i) {

            pos.x = randBetween(-1, 1);
            pos.y = randBetween(-1, 1);
            pos.normalize();
            pos.multiplyScalar(Math.random() * 800 - 400);

            radius = randBetween(10, 40);
            strokeWidth = randBetween(3, 8);

            color.setHSL(
                randBetween(0.0, 1.0),
                randBetween(0.7, 1.0),
                randBetween(0.3, 0.5)
            );

            eyeball = new EyeballMesh(radius, color, strokeWidth);
            eyeball.position.copy(pos);

            this.scene.add(eyeball);
            this.eyeballs.push(eyeball);
        }
    }

    initTentacles():void {
        var tentacle = new TentacleMesh(30, 300, new THREE.Color(0xffaa00));
        this.scene.add(tentacle);
        this.tentacles.push(tentacle);
    }

    start(): void {
        this.update();
    }

    update(): void {

        requestAnimationFrame(()=>{
            this.update();
        });

        var vector = this.input.clone().unproject(this.camera);

        var now = window.performance.now();

        for (let eyeball of this.eyeballs) {
            eyeball.setTime(now);
            eyeball.lookAt(vector);
        }

        for (let tentacle of this.tentacles) {
            tentacle.update(vector);
        }

        this.render();
    }

    render() {
        this.renderer.render(
            this.scene,
            this.camera
        );
    }
}

export = App;