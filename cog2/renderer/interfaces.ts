
import { IUpdatable } from 'cog2/cog2';

/**
 * IMesh
 */

export interface IMesh {

}

export interface IMeshClass {
    new (): IMesh;
}


/**
 * Renderer
 */

export interface IRenderer extends IUpdatable {
    onRender?: () => void;
}

export interface IRendererClass {
    new (config:Object): IRenderer;
}
