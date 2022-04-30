export interface ConstraintValueObject<Type> {
    [ key: string ]: Type;
}

export interface DedicatedValueResize {
    value: number;
    dimension: string;
}

interface GlobalRules {
    startup: ConstraintValueObject<any>;
    runtime: ConstraintValueObject<any>;
}

export interface Rules {
    global: GlobalRules;
    dedicated: Array<GlobalRules>;

}