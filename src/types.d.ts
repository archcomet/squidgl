/// <reference path='types/animate.d.ts' />
/// <reference path='types/three.d.ts' />
/// <reference path='types/require.d.ts' />

declare module 'glsl!shaders/eyeball_fragment' {
    var text: string;
    export = text;
}

declare module 'glsl!shaders/eyeball_vertex' {
    var text: string;
    export = text;
}

declare module 'glsl!shaders/tentacle_fragment' {
    var text: string;
    export = text;
}

declare module 'glsl!shaders/tentacle_vertex' {
    var text: string;
    export = text;
}

interface IVector {
    x: number;
    y: number;
    z?: number;
    w?: number;
}
