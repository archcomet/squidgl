export function log(...args:any[]) {
    console.log.apply(console, args);
}

var _now = (() => {

    if (window && window.performance && window.performance.now) {
        return function() {
            return window.performance.now();
        }
    }

    if (process && process.hrtime) {
        function hrNow() {
            var hrTime = process.hrtime();
            return hrTime[0] * 1000000 + hrTime[1] / 1000
        }

        let loadTime = hrNow();

        return function() {
            return hrNow() - loadTime;
        }
    }

    let loadTime = Date.now();

    return function(){
        return Date.now() - loadTime;
    }

})();

export function now(): number {
    return _now();
}
