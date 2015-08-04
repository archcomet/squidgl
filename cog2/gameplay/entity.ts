
import {
    IEntity,
    IEntityClass,
    IComponent,
    IComponentClass,
    IController,
    IVector3
} from './interfaces';


export class Entity implements IEntity {

    public position: IVector3 = {
        x: 0,
        y: 0,
        z: 0
    };

    public active: boolean = true;

    public controller: IController = null;

    private components: Array<IComponent> = [];

    constructor(config:Object) {
        // todo impl
        console.log('hello entity');
    }

    getComponent (ComponentClass:IComponentClass): IComponent {
        // todo impl
        return null;
    }

    hasComponents (...ComponentClasses:Array<IComponentClass>): boolean {
        // todo impl
        return false;
    }

}