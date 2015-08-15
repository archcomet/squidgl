import { global, Type } from 'cog2/utils/lang';

var Reflect = global.Reflect;

export function makeDecorator(cogCls): (...args) => ClassDecorator {
    function DecoratorFactory(...cogArgs): ClassDecorator {
        cogArgs.splice(0, 0, cogCls);

        return (targetCls: Type) => {
            var cogs = Reflect.get(targetCls, 'cogs');
            cogs = cogs || [];
            cogs.push(cogArgs);
            Reflect.set(targetCls, 'cogs', cogs);
            return targetCls;
        };

    }
    return DecoratorFactory;
}