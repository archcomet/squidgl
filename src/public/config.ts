
/// <reference path='../../types/require.d.ts' />

requirejs.config({
    paths: {
        'animate': 'libs/animate',
        'three': 'libs/three.min',
        'glsl': 'libs/glsl'
    },
    shim: {
        'three': {
            exports: 'THREE'
        }
    }
});

require(['app']);