import { Component, Host, h } from '@stencil/core';
import { ResizeService, Container } from "../../../../../../resize-service/dist/ResizeService";

@Component( {
  tag: 'max-size',
  styleUrl: 'max-size.css',
  shadow: false,
} )
export class MaxSize {

  context: HTMLElement;
  containers: Array<HTMLElement> = [];

  componentDidLoad () {
    new ResizeService( this.context, this.containers, "vertical", { global: { runtime: { maxsize: 200 }, watchers: [ this.watchMaxSize.bind( this ) ] } } ).init( true );
  }

  addRandomCollor ( element: HTMLElement ) {
    const random_color = "#" + Math.floor( Math.random() * 0x1000000 ).toString( 16 );
    element.style.backgroundColor = random_color;
  }

  watchMaxSize ( container: Container, size: number ) {
    const { maxsize } = container.rules;
    //the rules dose not apply for this container.
    if ( !maxsize ) return true;

    if ( maxsize < size ) {
      return false;
    }
    return true;
  }

  render () {
    return (
      <Host>
        <div class="case">
          <h2>Maximum Size</h2>
          <div class="context" ref={ el => this.context = el }>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  { ` Service initialization:

    new ResizeService( this.context, this.containers, "vertical", { global: { runtime: { maxsize: 200 }, watchers: [ this.watchMaxSize.bind( this ) ] } }` } ).init( true );
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  { ` JSX:

    <div class="context" ref={ el => this.context = el }>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
    </div>
    `}
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  <br />
                  { ` Watcher example:

    watchMaxSize ( container: Container, size: number ) {
      const { maxsize } = container.rules;
      //the rules dose not apply for this container.
      if ( !maxsize ) return true;

      if ( maxsize < size ) {
        return false;
      }
      return true;
    }`}

                </pre>
              </span>
            </div>
            <span class="space-top">Both containers have a maxSize rule and a watcher that verifies that each of them will have a maximum size. When the max size is met, the separator stops.</span>
          </article>
        </div>
      </Host >
    );
  }
}
