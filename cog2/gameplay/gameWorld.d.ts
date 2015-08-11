/// <reference path="../cog2.d.ts" />

interface IGameWorld {

    state: IGameState;

    destroy: ()=> void;

}

interface IGameWorldClass {

    defaultGameStateClass: IGameStateClass;

    new (config: any): IGameWorld

}