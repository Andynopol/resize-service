import { ResizeService } from "./ResizeService";
import { ConstraintValueObject } from './constants/interfaces';

export declare enum ResizeCases {
    exact = "exact",
    ratio = "ratio",
    procentage = "procentage",
}

export declare enum ResizeSelectors {
    contextId = "resize-main-context",
    containersClass = "resize-container"
}

export declare enum SizeKey {
    "vertical" = "height",
    "horizontal" = "width",
}

export declare type Orientation = "vertical" | "horizontal";

export declare interface DedicatedValueResize {
    value: number;
    dimension: string;
}

export declare interface GlobalRules {
    startup: ConstraintValueObject<any>;
    runtime?: ConstraintValueObject<any>;
    configurations?: Array<StartupConfig>;
    watchers?: Array<RuntimeWatcher>;
}

export declare interface DedicatedRules {
    index: number;
    runtime: ConstraintValueObject<any>;
}

export declare interface RuntimeWatcher {
    ( container: Container, size?: number ): boolean;
}

export declare interface StartupConfig {
    ( container: ResizeService ): void;
}

export declare interface Rules {
    global: GlobalRules;
    dedicated?: Array<DedicatedRules>;

}

export declare interface Container extends HTMLElement {
    rules?: ConstraintValueObject<any>;
}