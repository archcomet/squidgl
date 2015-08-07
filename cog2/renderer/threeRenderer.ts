import THREE = require('three');
import { Renderer } from './renderer';

export class ThreeRenderer extends Renderer {

    public camera: THREE.OrthographicCamera;
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;
    private container: Element;

    constructor(config:Object) {
        super(config);

        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(
            window.innerWidth * -0.5,
            window.innerWidth * 0.5,
            window.innerHeight * 0.5,
            window.innerHeight * -0.5,
            1.0, 1000.0
        );

        this.camera.position.z = 300.0;

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
}

