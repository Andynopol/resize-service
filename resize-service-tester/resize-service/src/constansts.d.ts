import { ResizeService } from "./ResizeService";
import { ConstraintValueObject } from './constants/interfaces';

export declare enum ResizeSelectors {
    contextId = "resize-main-context",
    containersClass = "resize-container"
}

export type Orientation = "vertical" | "horizontal";

export type OffsetSizeKey = "offsetHeight" | "offsetWidth";

export type SizeKey = "height" | "width";

export type ResizeCases = "exact" | "ratio" | "procentage";

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