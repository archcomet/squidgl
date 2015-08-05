
System.config({
    transpiler: 'traceur',
    format: 'cjs',
    defaultJSExtensions: true,
    paths: {
        'cog2/*': '../cog2/*',
        'game/*': '../game/*'
    },
    map: {
        'text': 'libs/text',
        'three': 'libs/three.min'
    },
    shim: {
        'three': {
            exports: 'THREE'
        }
    }
});

//System.import('src/app').then(function(App) {
//    (new App()).start();
//});