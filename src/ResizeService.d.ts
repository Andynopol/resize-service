import { ConstraintValueObject } from './constants/interfaces';
import { Container, Rules, Orientation, ResizeCases } from './constansts';

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

  set containers ( containers: Array<HTMLElement> );

  set separatorSize ( size: number );

  set rules ( rules: Rules );

  init ( appendCss?: boolean, initSize?: number | Array<number> ): void;
  resize ( sizes: Array<number>, type: ResizeCases ): void;
  refreshContextSize (): void;
  destructor (): void;

}

