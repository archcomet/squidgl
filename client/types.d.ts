
/// <reference path='../typings/tsd.d.ts' />

declare module 'shaders/eyeball_fragment.glsl!text' {
    var text: string;
    export = text;
}

declare module 'shaders/eyeball_vertex.glsl!text' {
    var text: string;
    export = text;
}

declare module 'shaders/tentacle_fragment.glsl!text' {
    var text: string;
    export = text;
}

declare module 'shaders/tentacle_vertex.glsl!text' {
    var text: string;
    export = text;
}

interface IVector {
    x: number;
    y: number;
    z?: number;
    w?: number;
}