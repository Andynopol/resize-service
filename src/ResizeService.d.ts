import { ConstraintValueObject } from './constants/interfaces';

export declare class ResizeService {

  constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation, rules?: ConstraintValueObject<any> );

  get context (): HTMLElement;

  get containers (): Array<Container>;

  get orientation (): Orientation;

  get separatorSize (): number;

  get rules (): Rules;

  get offsetSizeKey (): string;

  get sizeKey (): "width" | "height";

  get contextSize (): number;

  set containers ( containers: Array<Container> );

  set separatorSize ( size: number );

  set rules ( rules: Rules );

  init ( appendCss?: boolean, initSize?: number | Array<number>, type?: ResizeCases ): void;
  resize ( sizes: Array<number>, type: ResizeCases ): void;
  refreshContextSize (): void;
  updateDedicatedRules ( payload: Array<{ index: number, rules: ConstraintValueObject<any>; }> ): void;
  destructor (): void;

}

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

