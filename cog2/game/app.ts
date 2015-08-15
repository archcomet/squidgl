/// <reference path="../cog2.d.ts" />

import { makeDecorator } from 'cog2/utils/decorators';

export class AppAnnotation {
    constructor(obj: AppFactoryArgs) {
        console.log(obj);
    }
}

export class AppRef {

}


export var App : AppFactory = <AppFactory> makeDecorator(AppAnnotation);