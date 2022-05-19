import { Component, Host, h } from '@stencil/core';
import { ResizeService, Container } from "../../../../../../resize-service/dist/ResizeService";

@Component( {
  tag: 'min-size',
  styleUrl: 'min-size.css',
  shadow: false,
} )
export class MinSize {

  context: HTMLElement;
  containers: Array<HTMLElement> = [];

  componentDidLoad () {
    new ResizeService( this.context, this.containers, "vertical", { global: { runtime: { minsize: 20 }, watchers: [ this.watchMinSize.bind( this ) ] } } ).init( true );
  }

  addRandomCollor ( element: HTMLElement ) {
    const random_color = "#" + Math.floor( Math.random() * 0x1000000 ).toString( 16 );
    element.style.backgroundColor = random_color;
  }

  watchMinSize ( container: Container, size: number ) {
    const { minsize } = container.rules;
    //the rules dose not apply for this container.
    if ( !minsize ) return true;

    if ( minsize > size ) {
      return false;
    }
    return true;
  }

  render () {
    return (
      <Host>
        <div class="case">
          <h2>Minimum Size</h2>
          <div class="context" ref={ el => this.context = el }>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  { ` Service initialization:

    new ResizeService( this.context, this.containers, "vertical", { global: { runtime: { minsize: 20 }, watchers: [ this.watchMinSize.bind( this ) ] } }` } ).init( true );
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
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

    watchMinSize ( container: Container, size: number ) {
      const { minsize } = container.rules;
      //the rules dose not apply for this container.
      if ( !minsize ) return true;

      if ( minsize > size ) {
        return false;
      }
      return true;
    }`}

                </pre>
              </span>
            </div>
            <span class="space-top">
              { `Global Runtime rules can be any rules defined by the component that instantiates the Resize Service. These rules are applied on containers.` }
              <br />
              { `After declaring some runtime rules, there should also be declared some watchers for each of them. These watchers will return a boolean. When the user moves a separator` }
              <br />
              { `between 2 containers that have runtime rules defined, each watcher is called and if any of them returns false, the separator stops. If all of them return true, the separator moves.` }
              <br />
              <br />
              { `In this example, both containers have a minSize rule and a watcher that verifies that each of them will have a minimum size. When the min size is met, the separator stops.` }
            </span>
          </article>
        </div>
      </Host >
    );
  }
}
