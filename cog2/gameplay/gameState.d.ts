/// <reference path="../cog2.d.ts" />

interface IGameState {
    destroy: ()=>void;
}

interface IGameStateClass {
    new (config:any): IGameState
}