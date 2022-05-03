import { ResizeService } from "./ResizeService";

interface ConstraintValueObject<Type> {
    [ key: string ]: Type;
}

interface DedicatedValueResize {
    value: number;
    dimension: string;
}

interface GlobalRules {
    startup: ConstraintValueObject<any>;
    runtime?: ConstraintValueObject<any>;
    configurations?: Array<StartupConfig>;
    watchers?: Array<RuntimeWatcher>;
}

interface DedicatedRules {
    index: number;
    runtime: ConstraintValueObject<any>;
}

interface RuntimeWatcher {
    ( container: Container, size?: number ): boolean;
}

interface StartupConfig {
    ( container: ResizeService ): void;
}

interface Rules {
    global: GlobalRules;
    dedicated?: Array<DedicatedRules>;

}

interface Container extends HTMLElement {
    rules?: ConstraintValueObject<any>;
}

type Orientation = "vertical" | "horizontal";