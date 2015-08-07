
import {IGameMode, IGameModeClass, IGameState, IEntityClass, IEntity, IComponentClass, ISystemClass, ISystem} from './interfaces';

export class GameMode implements IGameMode {

    public state: IGameState;

    constructor(config:Object) {
    }

    spawn (EntityClass: IEntityClass): IEntity {
        // todo impl
        return null;
    }

    despawn (entity: IEntity): void {
        // todo impl
    }

    despawnAll (): void {
        // todo impl
    }

    getEntities (): Array<IEntity> {
        // todo impl
        return [];
    }

    getEntitiesByTag (entityTag: string): Array<IEntity> {
        // todo impl
        return [];
    }

    getEntitiesByComponents (...ComponentClasses:Array<IComponentClass>):  Array<IEntity> {
        // todo impl
        return [];
    }

    getSystem (SystemClass: ISystemClass): ISystem {
        // todo impl
        return null;
    }

}