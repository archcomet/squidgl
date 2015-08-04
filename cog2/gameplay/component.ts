

import {IComponent, IComponentClass, IEntityClass} from './interfaces';

let nextId = 0;
export class Component implements IComponent {
    static get id():number {
        return ++nextId;
    }
}

export function components (arr:Array<IComponentClass>) {
    return (target: IEntityClass) => {
        // todo impl
        console.log(target);
    }
}