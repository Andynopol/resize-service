import { DEFAULT_STYLE, HORIZONTAL_DEDICATED_STYLE, VERTICAL_DEDICATED_STYLE } from "./assets/defaultStyles";
import { SizeKey } from "./constants/enum";
import { ConstraintValueObject } from "./constants/interfaces";
import { Orientation } from "./constants/types";
import { capitalize, getProcentage } from "./utils/script";

export class ResizeService {
    private _context: HTMLElement;
    private _containers: Array<HTMLElement>;
    private _rules: ConstraintValueObject<any>;
    private _orientation: Orientation;
    private _separatorSize: number = 8;

    private _dragging: Boolean = false;
    private previousSibling: HTMLElement;
    private nextSibling: HTMLElement;
    private sizeKey: "width" | "height";
    private offsetSizeKey: string;

    constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation = "vertical", rules?: ConstraintValueObject<any> ) {
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

    set containers ( containers: Array<HTMLElement> ) {
        this._containers = containers;
    }


    set separatorSize ( size: number ) {
        this._separatorSize = size;
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
        this.containers.forEach( container => container.classList.add( "resize-container", `${ this.orientation }-resize-container` ) );
    }

    private renderInitSize ( initSize: number | Array<number> ) {
        if ( typeof initSize === 'number' ) {
            this.containers.forEach( ( container ) => {
                if ( this.orientation === "vertical" ) {
                    container.style.width = "100%";
                } else {
                    container.style.height = "100%";
                }
                container.style[ this.sizeKey ] = `${ initSize - getProcentage( this.context[ this.offsetSizeKey ], this.separatorSize * ( this.containers.length - 1 ) / this.containers.length ) }%`;

            } );
        } else {
            //render for array of values
        }
    }

    public init ( appendCss?: boolean, initSize?: number | Array<number> ) {
        this.addSeparators();
        this.addClasses();
        appendCss && ( () => { this.appendDefaultCSS(); } )();
        initSize ?
            this.renderInitSize( initSize ) :
            this.renderInitSize( 100 / this.containers.length );
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
        this.context.style.cursor = "default";
    }

    private moveSeparator ( e: MouseEvent ) {
        if ( this._dragging ) {
            this.context.style.cursor = this.orientation === "vertical" ? "ns-resize" : "ew-resize";
            const sumOfPreviousContainersSize = getProcentage( this.context[ this.offsetSizeKey ], this.containers.slice( 0,
                this.containers.indexOf( this.previousSibling ) ).reduce(
                    ( accumulator, container ) => accumulator + container[ this.offsetSizeKey ]
                    , 0 ) );
            const previousContainerSize = (
                getProcentage( this.context[ this.offsetSizeKey ], e[ this.orientation === "vertical" ? "pageY" : "pageX" ] -
                    this.context.getBoundingClientRect()[ this.orientation === "vertical" ? "top" : "left" ] ) -
                sumOfPreviousContainersSize ) - ( this.previousSibling === this.containers[ 0 ] ? .5 * getProcentage( this.context[ this.offsetSizeKey ], this.separatorSize * ( this.containers.length - 1 ) / this.containers.length ) : 2 * getProcentage( this.context[ this.offsetSizeKey ], this.separatorSize * ( this.containers.length - 1 ) / this.containers.length ) );
            const nextContainerSize = (
                getProcentage( this.context[ this.offsetSizeKey ], this.nextSibling[ this.offsetSizeKey ] +
                    this.previousSibling[ this.offsetSizeKey ] ) - previousContainerSize + .25 * getProcentage( this.context[ this.offsetSizeKey ], this.separatorSize * ( this.containers.length - 1 ) / this.containers.length ) );
            this.previousSibling.style[ this.sizeKey ] = `${ previousContainerSize }%`;
            this.nextSibling.style[ this.sizeKey ] = `${ nextContainerSize }%`;
        }
    }
};