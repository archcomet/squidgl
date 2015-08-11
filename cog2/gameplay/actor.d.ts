/// <reference path="../cog2.d.ts" />

interface IActor {

    destroy: () => void;

    onStart: (world: IGameWorld) => void;

    onUpdate: (world: IGameWorld, dt: number) => void;

    onEnd: (world: IGameWorld) => void;
}