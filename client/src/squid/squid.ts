/// <reference path='../types.d.ts' />

import THREE = require('three');
import EyeballMesh = require('../eyeball/eyeballMesh');
import TentacleMesh = require('../tentacle/tentacleMesh');

interface ISquidOptions {
    color: THREE.Color;
    radius: number;
    strokeWidth: number;
}

class Squid extends THREE.Object3D {

    private time:number;
    private radius:number;
    private eyeball:EyeballMesh;
    private tentacles:Array<TentacleMesh>;

    constructor(options:ISquidOptions) {
        super();

        this.radius = options.radius;
        this.time = 0.0;

        this.tentacles = [];

        var tentacleRadius = options.radius + options.strokeWidth;

        for (let i = 0; i < 8; ++i) {
            let tentacle = new TentacleMesh({
                width: tentacleRadius * 0.8,
                length: tentacleRadius * 4,
                color: options.color
            });

            this.tentacles.push(tentacle);
            this.add(tentacle);
        }

        this.eyeball = new EyeballMesh({
            color: options.color,
            radius: options.radius,
            strokeWidth: options.strokeWidth
        });

        this.add(this.eyeball);
    }

    public lookAt(target:IVector):void {
        this.eyeball.lookAt(target);
    }

    public update(dt:number) {
        this.time += dt;
        this.eyeball.setTime(this.time);
        this.moveTentacles();
    }

    private moveTentacles() {

        var t = Math.sin((this.time / this.radius) * 0.04) * 0.5 + 0.5;
        var radius = 0.6 * this.radius + 1.2 * (this.radius * t * t * t * t * t * t * t * t * t * t );

        var tentacleLeft, tentacleRight,
            tentacleCount = this.tentacles.length,
            vector = new THREE.Vector3(0.0, radius, 0.0),
            pos = new THREE.Vector3();

        var x, y;

        var increment = 2 * Math.PI * (1 / tentacleCount),
            ch = Math.cos(increment / 2),
            sh = Math.sin(increment / 2),
            c = Math.cos(increment),
            s = Math.sin(increment);

        x = ch * vector.x - sh * vector.y;
        y = sh * vector.x + ch * vector.y;

        vector.x = x;
        vector.y = y;

        pos.copy(this.position);
        pos.y -= this.radius * 0.5;

        for (let i = 0; i < tentacleCount / 2; ++i) {

            tentacleLeft = this.tentacles[i * 2];
            tentacleRight = this.tentacles[i * 2 + 1];

            tentacleLeft.move(pos, {
                x: pos.x + vector.x,
                y: pos.y + vector.y
            });

            tentacleRight.move(pos, {
                x: pos.x - vector.x,
                y: pos.y + vector.y
            });

            x = c * vector.x - s * vector.y;
            y = s * vector.x + c * vector.y;

            vector.x = x;
            vector.y = y;

        }

    }

}

export = Squid;