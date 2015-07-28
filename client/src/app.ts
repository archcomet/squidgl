
// todo game engine spike 1 player
    // todo basic swimming
    // todo basic chirping - sound, graphic, indicator
// todo server / client 2 player

/// <reference path='types.d.ts' />

import THREE = require('three');
import Game = require('common/game');
import Squid = require('./squid/squid');

function randBetween (min: number, max: number): number {
    return min + Math.random() * (max - min);
}

class App {

    public camera: THREE.OrthographicCamera;
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;

    private input: THREE.Vector3;
    private container: Element;

    private squids: Array<Squid>;
    private lastTimestamp: number;

    constructor() {

        this.initScene();
        this.initMouse();
        this.initSquids();
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

        this.renderer =  new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setClearColor( 0xffffff, 0);
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

    initSquids(): void {

        this.squids = [];

        var squid, i;

        var pos = new THREE.Vector3(),
            color = new THREE.Color();

        for (i = 0; i < 15; ++i) {

            pos.x = randBetween(-1, 1);
            pos.y = randBetween(-1, 1);
            pos.normalize();
            pos.multiplyScalar(Math.random() * 600 - 300);

            color.setHSL(
                randBetween(0.0, 1.0),
                randBetween(0.7, 1.0),
                randBetween(0.3, 0.5)
            );

            squid = new Squid({
                radius: randBetween(10, 25),
                strokeWidth: randBetween(2, 5),
                color: color
            });

            squid.position.copy(pos);

            this.scene.add(squid);
            this.squids.push(squid);
        }
    }

    start(): void {
        this.lastTimestamp = window.performance.now();
        this.step(this.lastTimestamp);
    }

    step(timestamp:number): void {
        requestAnimationFrame((timestamp)=>{
            this.step(timestamp);
        });
        var dt = this.lastTimestamp - timestamp;
        this.update(dt);
        this.render();
        this.lastTimestamp = timestamp;
    }

    update(dt:number): void {
        var vector = this.input.clone().unproject(this.camera);
        vector.z = 0;

        for (let squid of this.squids) {
            squid.lookAt(vector);
            squid.update(dt);
        }

       // this.squids[0].position.copy(vector);
    }

    render() {
        this.renderer.render(
            this.scene,
            this.camera
        );
    }
}

export = App;