/// <reference path="../cog2.d.ts" />

interface ISystem extends IActor {

}

interface ISystemClass {

    classId: number;

    new (config: any): ISystem;
}