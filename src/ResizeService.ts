import { DEFAULT_STYLE, HORIZONTAL_DEDICATED_STYLE, VERTICAL_DEDICATED_STYLE } from "./assets/defaultStyles";
import { SizeKey } from "./constants/enum";
import { ConstraintValueObject, DedicatedValueResize, Rules } from "./constants/interfaces";
import { Orientation } from "./constants/types";
import { capitalize, getProcentage } from "./utils/script";

export class ResizeService {
    private _context: HTMLElement;
    private _containers: Array<HTMLElement>;
    private _rules: Rules;
    private _orientation: Orientation;
    private _separatorSize: number = 8;

    private _dragging: Boolean = false;
    private previousSibling: HTMLElement;
    private nextSibling: HTMLElement;
    private sizeKey: "width" | "height";
    private offsetSizeKey: string;

    constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation = "vertical", rules?: Rules ) {
        this._context = context;
        this._containers = containers;
        this._rules = rules;
        this._orientation = orientation;
        this.sizeKey = SizeKey[ orientation ];
        this.offsetSizeKey = `offset${ capitalize( this.sizeKey ) }`;
        this._rules = rules;
    }

    get context () {
        return this._context;
    }

    get containers () {
        return this._containers;
    }

    get orientation () {
        return this._orientation;
    }

    get separatorSize () {
        return this._separatorSize;
    }

    get rules () {
        return this._rules;
    }

    set containers ( containers: Array<HTMLElement> ) {
        this._containers = containers;
    }


    set separatorSize ( size: number ) {
        this._separatorSize = size;
    }

    set rules ( rules: Rules ) {
        this._rules = rules;
        this.applyRules();
    }

    public globalResize ( value: number, dimension?: "px" ) {

        let remainingSize = 100;

        switch ( dimension ) {
            case "px":
                value = getProcentage( this.context[ this.offsetSizeKey ], value );
                break;
        }

        this.containers.forEach( ( container, index ) => {
            remainingSize > 0 && value < remainingSize && ( container.style[ this.sizeKey ] = `${ value }%` );
            remainingSize <= 0 && ( container.style[ this.sizeKey ] = `${ 0 }%` );
            remainingSize > 0 && !( value < remainingSize ) && ( container.style[ this.sizeKey ] = `${ remainingSize }%` ) && ( remainingSize = 0 );
            index === this.containers.length - 1 && remainingSize > 0 && ( container.style[ this.sizeKey ] = `${ remainingSize }%` );
            remainingSize -= value;
        } );
    }

    public dedicatedResize ( values: Array<DedicatedValueResize> ) {
        let remainingSize = 100;
        if ( values.length !== this.containers.length ) throw new Error( "Values array miss match length exception" );
        this.containers.forEach( ( container, index ) => {
            remainingSize > 0 && ( values[ index ].value < remainingSize ) && ( container.style[ this.sizeKey ] = `${ values[ index ].value }${ values[ index ].dimension }` );
            remainingSize <= 0 && ( container.style[ this.sizeKey ] = `${ 0 }%` );
            remainingSize > 0 && !( values[ index ].value < remainingSize ) && ( container.style[ this.sizeKey ] = `${ remainingSize }${ values[ index ].dimension }` ) && ( remainingSize = 0 );
            index === this.containers.length - 1 && remainingSize > 0 && ( container.style[ this.sizeKey ] = `${ remainingSize }%` );
            remainingSize -= values[ index ].value;
        } );
    }

    public init ( appendCss?: boolean, initSize?: number | Array<number> ) {
        this.addSeparators();
        this.rules && this.applyRules();
        this.addClasses();
        appendCss && ( () => { this.appendDefaultCSS(); } )();
        initSize ?
            this.renderInitSize( initSize ) :
            this.renderInitSize( 100 / this.containers.length );

    }

    private applyRules () {
        this.containers.forEach( ( container, index ) => {
            ( container as any ).rules = { ...this.rules.global };
            ( index <= this.rules.dedicated.length - 1 ) && ( ( container as any ).rules = { ...( container as any ).rules, ...this.rules.dedicated[ index ] } );
        } );
    }

    private createSeparator () {
        const separatorElement = document.createElement( 'div' );
        separatorElement.classList.add( 'resize-separator', `${ this.orientation }-resize-separator` );
        return separatorElement;
    }

    private addSeparators () {
        for ( let index = 0; index < this.containers.length - 1; index++ ) {
            const separatorElement = this.createSeparator();
            separatorElement.addEventListener( 'mousedown', this.activateSeparator.bind( this ) );
            this.containers[ index ].parentNode.insertBefore( separatorElement, this.containers[ index ].nextSibling );
        }
    }

    private activateSeparator ( e: MouseEvent ) {
        e.preventDefault();
        this.previousSibling = ( e.target as HTMLElement ).previousElementSibling as HTMLElement;
        this.nextSibling = ( e.target as HTMLElement ).nextElementSibling as HTMLElement;
        this.context.addEventListener( 'mousemove', this.moveSeparator.bind( this ) );
        this.context.addEventListener( 'mouseup', this.deactivateSeparator.bind( this ) );
        this._dragging = true;
    }

    private deactivateSeparator () {
        this._dragging = false;
        delete this.previousSibling;
        delete this.nextSibling;
    }

    private moveSeparator ( e: MouseEvent ) {
        if ( this._dragging ) {
            const sumOfPreviousContainersSize = getProcentage( this.context[ this.offsetSizeKey ], this.containers.slice( 0,
                this.containers.indexOf( this.previousSibling ) ).reduce(
                    ( accumulator, container ) => accumulator + container[ this.offsetSizeKey ]
                    , 0 ) );
            const previousContainerSize = (
                getProcentage( this.context[ this.offsetSizeKey ], e[ this.orientation === "vertical" ? "pageY" : "pageX" ] -
                    this.context.getBoundingClientRect()[ this.orientation === "vertical" ? "top" : "left" ] ) -
                sumOfPreviousContainersSize );
            const nextContainerSize = (
                getProcentage( this.context[ this.offsetSizeKey ], this.nextSibling[ this.offsetSizeKey ] +
                    this.previousSibling[ this.offsetSizeKey ] ) -
                previousContainerSize );
            this.previousSibling.style[ this.sizeKey ] = `${ previousContainerSize }%`;
            this.nextSibling.style[ this.sizeKey ] = `${ nextContainerSize }%`;
        }
    }

    private appendDefaultCSS () {
        const styles = document.createElement( 'style' );
        styles.textContent = styles.textContent + DEFAULT_STYLE;
        styles.textContent = styles.textContent + VERTICAL_DEDICATED_STYLE;
        styles.textContent = styles.textContent + HORIZONTAL_DEDICATED_STYLE;
        this.context.appendChild( styles );
    }

    private addClasses () {
        this.context.classList.add( "resize-main-context", `${ this.orientation }-resize-context` );
        this.containers.forEach( container => container.classList.add( "resize-container" ) );
    }

    private renderInitSize ( initSize: number | Array<number> ) {
        this.containers.forEach( ( container ) => {
            if ( this.orientation === "vertical" ) {
                container.style.width = "100%";
            } else {
                container.style.height = "100%";
            }
            if ( ( container as any )?.rules?.static ) {
                container?.previousElementSibling?.classList?.contains( "resize-separator" ) && ( ( container.previousElementSibling as HTMLElement ).style.pointerEvents = "none" );
                container?.nextElementSibling?.classList?.contains( "resize-separator" ) && ( ( container.nextElementSibling as HTMLElement ).style.pointerEvents = "none" );
            }
        } );
        if ( typeof initSize === 'number' ) {
            this.globalResize( initSize - getProcentage( this.context[ this.offsetSizeKey ], this.separatorSize * ( this.containers.length - 1 ) / this.containers.length ) );
        } else {
            //render for array of values
            this.dedicatedResize( ( initSize as Array<number> ).map( ( num ) => ( { value: num, dimension: "%" } ) ) );
        }
    }
};