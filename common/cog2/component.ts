

import {IComponent, IComponentClass} from './interfaces';

let nextId = 0;

export class Component implements IComponent {

    static get id():number {
        return ++nextId;
    }

}