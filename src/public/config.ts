
/// <reference path='../types.d.ts' />

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

require(['app'], function(App) {

    var a = new App();
    a.update();

});