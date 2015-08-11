/// <reference path="../cog2.d.ts" />

interface IGame {

    config: any;

    destroy: ()=>void;

    setWorld: (WorldClass:IGameWorldClass, StateClass:IGameStateClass)=>void;
}

interface IGameClass {

    defaultConfig: any;

    defaultGameStateClass: IGameStateClass;

    defaultGameWorldClass: IGameWorldClass;

    new (config:any): IGame
}