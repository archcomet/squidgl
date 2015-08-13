import { global, Type } from 'cog2/utils/lang';

var Reflect = global.Reflect;

export function makeDecorator(annotationCls): (...args) => (cls: any) => any {
    function DecoratorFactory(annotationArgs): (cls: any) => any {
        var annotationInst = new annotationCls(annotationArgs);
        function TypeDecorator(targetCls: Type) {
            var annotations = Reflect.get(targetCls, 'annotations');
            annotations = annotations || [];
            annotations.push(annotationInst);
            Reflect.set(targetCls, 'annotations', annotations);
            return targetCls;
        }
        return TypeDecorator;
    }
    return DecoratorFactory;
}