import { Type } from 'cog2/utils/lang';
import { makeDecorator } from 'cog2/utils/decorators';

export interface TypeDecorator {
    <T extends Type>(type: T): T;
}
export interface AppFactoryArgs {}

export interface AppFactory {
    (obj: AppFactoryArgs): TypeDecorator;
}

export class AppAnnotation {
    constructor(obj) {
        console.log(obj);
    }
}

export var App : AppFactory = <AppFactory> makeDecorator(AppAnnotation);


@App({

})
export class TestApp {}