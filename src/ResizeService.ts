import { DEFAULT_STYLE, HORIZONTAL_DEDICATED_STYLE, VERTICAL_DEDICATED_STYLE } from "../assets/defaultStyles";
import { ConstraintValueObject } from "../constants/interfaces";
import { Orientation } from "../constants/types";

export class ResizeService {
    private _context: HTMLElement;
    private _containers: Array<HTMLElement>;
    private _rules: ConstraintValueObject<any>;
    private _orientation: Orientation;
    constructor ( context: HTMLElement, containers: Array<HTMLElement>, orientation: Orientation = "vertical", rules?: ConstraintValueObject<any> ) {
        this._context = context;
        this._containers = containers;
        this._rules = rules;
        this._orientation = orientation;
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

    set containers ( containers: Array<HTMLElement> ) {
        this._containers = containers;
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

    private renderInitSize ( initSize: string | Array<string> ) {
        if ( typeof initSize === 'string' ) {
            this.containers.forEach( container => {
                if ( this.orientation === "vertical" ) {
                    container.style.width = "100%";
                    container.style.height = initSize;
                } else {
                    container.style.width = initSize;
                    container.style.height = "100%";
                }
            } );
        }
    }

    public init ( appendCss?: boolean, initSize?: string | Array<string> ) {
        appendCss && ( () => { this.appendDefaultCSS(); this.addClasses(); } )();
        initSize ? this.renderInitSize( initSize ) : this.renderInitSize( this.orientation === "vertical" ? `${ this.context.offsetHeight / this.containers.length }px` : `${ this.context.offsetWidth / this.containers.length }px` );
    }

    private createSeparator () {
        const separatorContent = `<div class="resize-separator"></div>`;
        const separatorElement = document.createElement( 'div' );
        separatorElement.innerHTML = separatorContent;

        return separatorElement;
    }

    public addSeparators () {
        for ( let index = 0; index < this.containers.length - 1; index++ ) {
            const separatorElement = this.createSeparator();
            this.containers[ index ].parentNode.insertBefore( separatorElement.firstChild, this.containers[ index ].nextSibling );
        }
    }
}