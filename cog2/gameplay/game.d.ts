/// <reference path="../cog2.d.ts" />

interface IGame extends IActor {

    config: any;

    destroy: ()=> void;

    setWorld: (WorldClass: IGameWorldClass, StateClass: IGameStateClass) => void;
}

interface IGameClass {

    defaultConfig: any;

    defaultInterval: number;

    defaultGameWorldClass: IGameWorldClass;

    new (config: any): IGame
}