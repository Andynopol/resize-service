import { ResizeService } from "../ResizeService";

export interface ConstraintValueObject<Type> {
    [ key: string ]: Type;
}

export interface DedicatedValueResize {
    value: number;
    dimension: string;
}

interface GlobalRules {
    startup: ConstraintValueObject<any>;
    runtime?: ConstraintValueObject<any>;
    configurations?: Array<StartupConfig>;
    checkers?: Array<RuntimeChecker>;
}

interface DedicatedRules {
    runtime?: ConstraintValueObject<any>;
    checkers: Array<RuntimeChecker>;
}

export interface RuntimeChecker {
    ( container: Container, size?: number ): boolean;
}

export interface StartupConfig {
    ( container: ResizeService ): void;
}

export interface Rules {
    global: GlobalRules;
    dedicated?: Array<DedicatedRules>;

}

export interface Container extends HTMLElement {
    rules?: ConstraintValueObject<any>;
}