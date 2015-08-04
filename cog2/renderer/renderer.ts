import {IGameClass} from 'cog2/cog2';
import {IRenderer, IRendererClass, IMesh} from './interfaces';

export class Renderer implements IRenderer {

    public meshes:Array<IMesh> = [];

    public context:any;

    constructor(config:Object) {
    }

    public addMesh(mesh:IMesh) {

    }

    public onRender() {

    }
}

export function renderers(rendererClasses:Array<IRendererClass>) {
    return (target:IGameClass) => {
        for (let RendererClass of rendererClasses) {
            target.clientClasses.push(RendererClass);
        }
    }
}
