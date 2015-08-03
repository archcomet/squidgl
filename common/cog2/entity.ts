
import {
    IEntity,
    IEntityClass,
    IComponent,
    IComponentClass,
    IController,
    IMesh,
    IMeshClass,
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


export function components (arr:Array<IComponentClass>) {
    return (target: IEntityClass) => {

        console.log(target);
    }
}

export function meshes (arr:Array<IMeshClass>) {
    return (target: IEntityClass) => {

    }
}