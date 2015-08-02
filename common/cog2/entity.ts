

import {IEntity, IController, IComponent, IComponentClass, IVector3} from './interfaces';


export class Entity implements IEntity {

    public position: IVector3 = {
        x: 0,
        y: 0,
        z: 0
    };

    public active: boolean = true;

    public controller: IController = null;

    private components: Array<IComponent> = [];

    constructor() {
        // todo
        console.log('hello entity');
    }

    getComponent (ComponentClass:IComponentClass): IComponent {
        // todo
        return null;
    }

    hasComponents (...ComponentClasses:Array<IComponentClass>): boolean {
        // todo
        return false;
    }

}