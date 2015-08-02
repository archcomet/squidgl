
import {IGameMode, IGameModeClass, IGameState, IEntityClass, IEntity, IComponentClass, ISystemClass, ISystem} from './interfaces';

export class GameMode implements IGameMode {

    public state: IGameState;

    spawn (EntityClass: IEntityClass): IEntity {

        return null;
    }

    despawn (entity: IEntity): void {

    }

    despawnAll (): void {

    }

    getEntities (): Array<IEntity> {
        return [];
    }

    getEntitiesByTag (entityTag: string): Array<IEntity> {
        return [];
    }

    getEntitiesByComponents (...ComponentClasses:Array<IComponentClass>):  Array<IEntity> {
        return [];
    }

    getSystem (SystemClass: ISystemClass): ISystem {
        return null;
    }

}