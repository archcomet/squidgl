
System.config({
    transpiler: 'traceur',
    paths: {
        '*': '*.js',
        'css': 'lib/css.js',
        'text': 'libs/text.js',
        'three': 'libs/three.min.js'
    },
    shim: {
        'three': {
            exports: 'THREE'
        }
    }
});

System.import('src/app').then(function(App) {
    (new App()).start();
});