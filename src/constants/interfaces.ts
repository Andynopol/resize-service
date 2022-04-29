export interface ConstraintValueObject<Type> {
    [ key: string ]: Type;
}

export interface DedicatedValueResize {
    value: number;
    dimension: string;
}

export interface Rules {
    global: ConstraintValueObject<any>;
    dedicated: Array<ConstraintValueObject<any>>;

}