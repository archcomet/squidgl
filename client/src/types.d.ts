
/// <reference path='../../typings/tsd.d.ts' />

declare function require(path: string): string;

interface IVector {
    x: number;
    y: number;
    z?: number;
    w?: number;
}