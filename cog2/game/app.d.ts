/// <reference path="../cog2.d.ts" />

interface AppFactory {
    (obj: AppFactoryArgs): ClassDecorator;
}

interface AppFactoryArgs {
    defaultConfig?: any,
    defaultInterval?: number,
    defaultGameWorldClass?: IGameWorldClass,
    defaultGameStateClass?: IGameStateClass
}