import { DEFAULT_STYLE, HORIZONTAL_DEDICATED_STYLE, VERTICAL_DEDICATED_STYLE } from "./assets/defaultStyles";
import { SizeKey } from "./constants/enum";
import { ConstraintValueObject } from "./constants/interfaces";
import { Orientation } from "./constants/types";
import { capitalize } from "./utils/script";

export class ResizeService {
    private _context: HTMLElement;
    private _containers: Array<HTMLElement>;
    private _rules: ConstraintValueObject<any>;
    private _orientation: Orientation;
    private _separatorSize: number = 8;

    private _dragging: Boolean = false;
    private _previousSibling: HTMLElement;
    private _nextSibling: HTMLElement;
    private _size: "width" | "height";

    constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation = "vertical", rules?: ConstraintValueObject<any> ) {
        this._context = context;
        this._containers = containers;
        this._rules = rules;
        this._orientation = orientation;
        this._size = SizeKey[ orientation ];
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

    private get size () {
        return this._size;
    }

    private get previousSibling () {
        return this._previousSibling;
    }

    private get nextSibling () {
        return this._nextSibling;
    }

    set containers ( containers: Array<HTMLElement> ) {
        this._containers = containers;
    }


    set separatorSize ( size: number ) {
        this._separatorSize = size;
    }

    private set previousSibling ( element: HTMLElement ) {
        this._previousSibling = element;
    }

    private set nextSibling ( element: HTMLElement ) {
        this._nextSibling = element;
    }

    private appendDefaultCSS () {
        const styles = document.createElement( 'style' );
        styles.textContent = styles.textContent + DEFAULT_STYLE;
        this.orientation === "vertical" && ( styles.textContent = styles.textContent + VERTICAL_DEDICATED_STYLE );
        this.orientation === "horizontal" && ( styles.textContent = styles.textContent + HORIZONTAL_DEDICATED_STYLE );
        this.context.appendChild( styles );
    }

    private addClasses () {
        this._context.id = "resize-main-context";
        this._containers.forEach( container => container.classList.add( "resize-container" ) );
    }

    private renderInitSize ( initSize: number | Array<number> ) {
        if ( typeof initSize === 'number' ) {
            this.containers.forEach( ( container ) => {
                if ( this.orientation === "vertical" ) {
                    container.style.width = "100%";
                } else {
                    container.style.height = "100%";
                }
                container.style[ this.size ] = `${ initSize - this.separatorSize * ( this.containers.length - 1 ) / this.containers.length }px`;

            } );
        } else {
            //render for array of values
        }
    }

    public init ( appendCss?: boolean, initSize?: number | Array<number> ) {
        appendCss && ( () => { this.appendDefaultCSS(); this.addClasses(); } )();
        initSize ?
            this.renderInitSize( initSize ) :
            this.renderInitSize( this.context[ `offset${ capitalize( this.size ) }` ] / this.containers.length );

    }

    private createSeparator () {
        const separatorElement = document.createElement( 'div' );
        separatorElement.classList.add( 'resize-separator' );
        separatorElement.style[ this.size ] = `${ this.separatorSize }px`;
        return separatorElement;
    }

    public addSeparators () {
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
            const sumOfPreviousContainersSize = this.containers.slice( 0,
                this.containers.indexOf( this.previousSibling ) ).reduce(
                    ( accumulator, container ) => accumulator + container[ `offset${ capitalize( this.size ) }` ] + this.separatorSize
                    , 0 );
            const previousContainerSize = (
                e[ this.orientation === "vertical" ? "pageY" : "pageX" ] -
                this.context.getBoundingClientRect()[ this.orientation === "vertical" ? "top" : "left" ] -
                sumOfPreviousContainersSize );
            const nextContainerSize = (
                this.nextSibling[ `offset${ capitalize( this.size ) }` ] +
                this.previousSibling[ `offset${ capitalize( this.size ) }` ] -
                previousContainerSize );
            this.previousSibling.style[ this.size ] = `${ previousContainerSize }px`;
            this.nextSibling.style[ this.size ] = `${ nextContainerSize }px`;
        }
    }
};