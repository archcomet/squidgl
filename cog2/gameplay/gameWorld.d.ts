/// <reference path="../cog2.d.ts" />

interface IGameWorld {

    state: IGameState;

    destroy: ()=>void;
}

interface IGameWorldClass {
    new (config:any, StateClass:IGameStateClass): IGameWorld
}