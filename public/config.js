
System.config({
    transpiler: 'traceur',
    paths: {
        '*': '*.js',
        'text': 'libs/text.js',
        'three': 'libs/three.min.js'
    },
    shim: {
        'three': {
            exports: 'THREE'
        }
    }
});