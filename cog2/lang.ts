

/**
 * Merge the contents of two or more objects together into the first object.
 *
 * @param target An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.
 * @param object1 An object containing additional properties to merge in.
 * @param objectN Additional objects containing properties to merge in.
 */

export function extend(target: any, object1?: any, ...objectN: any[]): any;

/**
 * Merge the contents of two or more objects together into the first object.
 *
 * @param deep If true, the merge becomes recursive (aka. deep copy).
 * @param target The object to extend. It will receive the new properties.
 * @param object1 An object containing additional properties to merge in.
 * @param objectN Additional objects containing properties to merge in.
 */

export function extend(deep: boolean, target: any, object1?: any, ...objectN: any[]): any;

export function extend(deepOrTarget?: any, ...objects: any[] ):any {

    var options, key, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        n = arguments.length,
        deep = false;

    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    if (typeof target !== 'object' && !isFunction(target)) {
        target = {};
    }

    if (i === n) {
        target = this;
        i--;
    }

    for(; i < n; ++i) {
        if ((options = arguments[i]) != null) {
            for (key in options) {
                //noinspection JSUnfilteredForInLoop
                src = target[key];

                //noinspection JSUnfilteredForInLoop
                copy = options[key];

                if (target === copy) {
                    continue;
                }

                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)) )) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && isArray(src) ? src : [];
                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    //noinspection JSUnfilteredForInLoop
                    target[key] = extend(deep, clone, copy);

                } else if (copy !== undefined) {

                    //noinspection JSUnfilteredForInLoop
                    target[key] = copy;
                }
            }
        }
    }

    return target;
}

/**
 * Determine the internal JavaScript Class of an object.
 *
 * @param obj
 */

export function type(obj:any):string {
    // undefined or null
    if (obj == null) {
        return obj + '';
    }
    return typeof obj === 'object' || typeof obj === 'function' ? 'object' : typeof obj;
}

/**
 * Checks if the object is an array.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isArray(obj:any):boolean {
    return toString.call(obj) === '[object Array]';
}

/**
 * Checks if the object is a date.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isDate(obj:any):boolean {
    return toString.call(obj) === '[object Date]';
}

/**
 * Checks if the object is a boolean.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isBoolean(obj:any):boolean {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
}

/**
 * Checks if the object is a function.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isFunction(obj:any):boolean {
    return typeof obj === 'function';
}

/**
 * Checks if the object is a number.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isNumber(obj:any):boolean {
    return toString.call(obj) === '[object Number]';
}

/**
 * Checks if the object is an object.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isObject(obj:any):boolean {
    return obj === Object(obj);
}

/**
 * Checks if the object is a plain object.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isPlainObject(obj:any):boolean {
    if (type(obj) !== 'object' || obj.nodeType || isWindow(obj)) {
        return false;
    }
    try {
        if (obj.constructor && !Object.prototype.hasOwnProperty.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
            return false;
        }
    } catch ( e ) {
        return false;
    }
    return true;
}

/**
 * Checks if the object is a regular expression.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isRegExp(obj:any):boolean {
    return toString.call(obj) === '[object RegExp]';
}

/**
 * Checks if the object is a string.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isString(obj:any):boolean {
    return toString.call(obj) === '[object String]';
}

/**
 * Checks if the object is a window element.
 * @memberof cog
 * @param obj
 * @returns {boolean}
 */

export function isWindow(obj:any):boolean {
    return obj != null && obj === obj.window;
}