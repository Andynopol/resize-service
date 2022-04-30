import { ConstraintValueObject } from './constants/interfaces';
import { Orientation } from './constants/types';

export declare class ResizeService {

    constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation, rules?: ConstraintValueObject<any> );

    get context (): HTMLElement;
    get containers (): Array<HTMLElement>;
    get orientation (): Orientation;
    get separatorSize (): number;
    set containers ( containers: Array<HTMLElement> );
    set separatorSize ( size: number );

    init ( appendCss?: boolean, initSize?: number | Array<number> ): void;
}