

import {ISystem, ISystemClass, IGameClass} from './interfaces';

export class System implements ISystem {
    constructor(config:Object) {}
}

export function systems(arr:Array<ISystemClass>) {
    return (target: IGameClass) => {
        // todo impl
    }
}