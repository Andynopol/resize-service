import { DEFAULT_STYLE, HORIZONTAL_DEDICATED_STYLE, VERTICAL_DEDICATED_STYLE } from "./assets/defaultStyles";
import { ResizeCases, SizeKey } from "./constants/enum";
import { Container, Rules, RuntimeWatcher, ConstraintValueObject } from "./constants/interfaces";
import { Orientation } from "./constants/types";
import { capitalize, getProcentage } from "./utils/script";

export class ResizeService {
    private _context: HTMLElement;
    private _containers: Array<Container>;
    private _rules: Rules;
    private _orientation: Orientation;
    private _separatorSize: number = 8;

    private _dragging: Boolean = false;
    private previousSibling: HTMLElement;
    private nextSibling: HTMLElement;
    private _sizeKey: "width" | "height";
    private _offsetSizeKey: string;
    private _contextSize: number;
    private styles: HTMLElement;

    constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation = "vertical", rules?: Rules ) {
        this._context = context;
        this._containers = ( containers as Array<Container> );
        this._orientation = orientation;
        this._sizeKey = SizeKey[ orientation ];
        this._offsetSizeKey = `offset${ capitalize( this.sizeKey ) }`;
        this._rules = rules;
        this._contextSize = this.context[ this.offsetSizeKey ];
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

    get offsetSizeKey () {
        return this._offsetSizeKey;
    }

    get sizeKey () {
        return this._sizeKey;
    }

    get contextSize () {
        return this._contextSize;
    }

    set containers ( containers: Array<HTMLElement> ) {
        this._containers = ( containers as Array<Container> );
    }

    set separatorSize ( size: number ) {
        this._separatorSize = size;
    }

    set rules ( rules: Rules ) {
        this.rules = rules;
    }

    public init ( appendCss?: boolean, initSize?: number | Array<number> ) {
        this.applyRules();
        this.addSeparators();
        this.addClasses();
        appendCss && ( () => { this.appendDefaultCSS(); } )();
        initSize ?
            this.renderInitSize( initSize ) :
            this.renderInitSize( this.contextSize / this.containers.length );
    }

    //! Removes style attribute on all containers. Designed to be called in disconnectedCallback/componentDidUnmount
    public destructor () {
        this.context.removeChild( this.styles );
        const separators = [ ...( this.context.getElementsByClassName( "resize-separator" ) as any ) ];
        separators.forEach( separator => this.context.removeChild( separator ) );
        this.containers.forEach( container => {
            container.removeAttribute( "rules" );
            container.removeAttribute( "style" );
        } );
    }

    public refreshContextSize () {
        this._contextSize = this.context[ this.offsetSizeKey ];
    }

    public resize ( sizes: Array<number>, type: ResizeCases ) {
        switch ( type ) {
            case ResizeCases.exact:
                this.resizeExact( sizes );
                break;
            case ResizeCases.procentage:
                this.resizeProcentage( sizes );
                break;
            case ResizeCases.ratio:
                this.resizeRatio( sizes );
                break;
            default:
                throw new Error( "[resize-service]: Resize type error" );
        }
    }

    private resizeExact ( sizes: Array<number> ) {
        if ( this.containers.length !== sizes.length ) {
            throw new Error( "[resize-service]: Resize array length missmatch" );
        }
        const sizesTotal = sizes.reduce( ( acc: number, size: number ) => acc += size, 0 );
        if ( sizesTotal > this.contextSize ) {
            throw new Error( "[resize-service]: Exact size out of bound" );
        }
        if ( this.contextSize !== sizesTotal ) {
            sizes[ sizes.length - 1 ] += this.contextSize - sizesTotal;
        }
        this.dispatchResize( sizes );
    }

    private resizeProcentage ( sizes: Array<number> ) {
        if ( this.containers.length !== sizes.length ) {
            throw new Error( "[resize-service]: Resize array length missmatch" );
        }
        const sizesTotal = sizes.reduce( ( acc: number, size: number ) => acc += size, 0 );
        if ( sizesTotal > 100 ) {
            throw new Error( "[resize-service]: Procentage out of bound" );
        }
        if ( 100 !== sizesTotal ) {
            sizes[ sizes.length - 1 ] += 100 - sizesTotal;
        }
        this.dispatchResize( sizes.map( size => this.contextSize * size / 100 ) );
    }

    private resizeRatio ( sizes: Array<number> ) {
        if ( this.containers.length !== sizes.length ) {
            throw new Error( "[resize-service]: Resize array length missmatch" );
        }
        const sizesTotal = sizes.reduce( ( acc: number, size: number ) => acc += size, 0 );
        if ( sizesTotal > 1 ) {
            throw new Error( "[resize-service]: Ratio out of bound" );
        }
        if ( 1 < sizesTotal ) {
            sizes[ sizes.length - 1 ] += 1 - sizesTotal;
        }

        this.dispatchResize( sizes.map( size => this.contextSize * size ) );
    }

    private dispatchResize ( sizes: Array<number> ) {
        sizes.forEach( ( size, index ) => {
            this.containers[ index ].style[ this.sizeKey ] = `${ getProcentage( this.contextSize, size - this.separatorSize / 2 ) }%`;
        } );
    }

    private appendDefaultCSS () {
        this.styles = document.createElement( 'style' );
        this.styles.textContent = this.styles.textContent + DEFAULT_STYLE;
        this.styles.textContent = this.styles.textContent + VERTICAL_DEDICATED_STYLE;
        this.styles.textContent = this.styles.textContent + HORIZONTAL_DEDICATED_STYLE;
        this.context.appendChild( this.styles );
    }

    private addClasses () {
        this.context.classList.add( "resize-main-context", `${ this.orientation }-resize-context` );
        this.containers.forEach( container => container.classList.add( "resize-container", `${ this.orientation }-resize-container` ) );
    }

    private renderInitSize ( initSize: number | Array<number> ) {
        this.containers.forEach( ( container ) => {
            if ( this.orientation === "vertical" ) {
                container.style.width = "100%";
            } else {
                container.style.height = "100%";
            }
        } );
        if ( typeof initSize === 'number' ) {
            this.containers.forEach( ( container ) => {
                container.style[ this.sizeKey ] = `${ getProcentage( this.contextSize, initSize - this.separatorSize / 2 ) }%`;
            } );
        } else {
            //render for array of values
        }
    }

    private createSeparator () {
        const separatorElement = document.createElement( 'div' );
        separatorElement.classList.add( 'resize-separator', `${ this.orientation }-resize-separator` );
        separatorElement.style[ this.sizeKey ] = `${ this.separatorSize }px`;
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
        this.context.style.cursor = this.orientation === "vertical" ? "ns-resize" : "ew-resize";
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
        this.context.removeEventListener( 'mousemove', this.moveSeparator.bind( this ) );
        this.context.removeEventListener( 'mouseup', this.deactivateSeparator.bind( this ) );
        this.context.style.cursor = "inherit";
    }

    private moveSeparator ( e: MouseEvent ) {
        if ( this._dragging ) {
            const siblingsTotalSize = this.previousSibling[ this.offsetSizeKey ] + this.nextSibling[ this.offsetSizeKey ] + this.separatorSize / 2;
            const previousContainerSize = (
                e[ this.orientation === "vertical" ? "clientY" : "clientX" ] -
                this.previousSibling.getBoundingClientRect()[ this.orientation === "vertical" ? "top" : "left" ] - this.separatorSize / 2 );
            const nextContainerSize = ( siblingsTotalSize - previousContainerSize );

            if ( this.validateWatchers( this.previousSibling, previousContainerSize ) &&
                this.validateWatchers( this.nextSibling, nextContainerSize ) ) {
                this.previousSibling.style[ this.sizeKey ] = `${ getProcentage( this.contextSize, previousContainerSize ) }%`;
                this.nextSibling.style[ this.sizeKey ] = `${ getProcentage( this.contextSize, nextContainerSize ) }%`;
            } else {
                this.deactivateSeparator();
            }
        }
    }

    private watchResize () {
        new ResizeObserver( () => {
            this.containers.forEach( container => {
                if ( this.context[ this.offsetSizeKey ] > this.contextSize )
                    container.style[ this.sizeKey ] = `${ getProcentage( this.contextSize, container[ this.offsetSizeKey ] ) }%`;
            } );
            this._contextSize = this.context[ this.offsetSizeKey ];
        } ).observe( this.context );
    }

    private applyRules () {
        this.applyStartupRules();
        this.applyRuntimeRules();
        this.applyCustomRules();
        //apply after all global rules
        this.applyDedicatedRules();
    }

    private applyStartupRules () {
        let startupRules: ConstraintValueObject<any>;
        this.rules?.global?.startup && ( startupRules = this.rules?.global?.startup );
        if ( startupRules?.keepBounderies ) {
            this.watchResize();
        }
        if ( startupRules?.separatorSize ) {
            this.separatorSize = startupRules.separatorSize;
        }
    }

    private applyDedicatedRules () {
        const { dedicated } = this?.rules;
        if ( !dedicated || !dedicated.length ) return;

        dedicated.forEach( ( { index, runtime } ) => {
            ( this.containers[ index ] as Container ).rules = ( this.containers[ index ] as Container ).rules ? { ...( this.containers[ index ] as Container ).rules, ...runtime } : { ...runtime };
        } );
    }

    private applyCustomRules () {
        const { configurations } = this.rules?.global;
        if ( !configurations || !configurations.length ) return;
        configurations.forEach( config => {
            config( this );

        } );
    }

    private applyRuntimeRules () {
        if ( !this?.rules?.global?.runtime ) {
            return;
        }

        this.containers.forEach( ( container: Container ) => {
            container.rules = { ...this.rules.global.runtime };
        } );
    }

    private validateWatchers ( container: Container, containerSize: number ) {
        const runtimeCheckers: Array<RuntimeWatcher> = this.rules?.global?.watchers;
        let checkersResult = true;
        if ( runtimeCheckers ) {
            runtimeCheckers.forEach( runtimeChecker => {
                checkersResult = checkersResult && runtimeChecker( container, containerSize );
            } );
        }
        return checkersResult;
    }

};