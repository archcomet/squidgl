import THREE = require('three');
import { Renderer } from './renderer';

export class ThreeRenderer extends Renderer {

    public camera: THREE.Camera;
    public scene: THREE.Scene;
    public renderer: THREE.Renderer;

    constructor(config:Object) {
        super(config);

        console.log('three:',config);
    }
}

