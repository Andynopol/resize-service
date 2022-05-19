import { Component, Host, h } from '@stencil/core';
import { ResizeService, Container } from "../../../../../resize-service/dist/ResizeService";

@Component( {
  tag: 'resize-dedicated-rules',
  styleUrl: 'resize-dedicated-rules.css',
  shadow: false,
} )
export class ResizeDedicatedRules {

  context: HTMLElement;
  containers: Array<HTMLElement> = [];

  componentDidLoad () {
    new ResizeService( this.context, this.containers, "vertical", { global: { runtime: { maxsize: 200 }, watchers: [ this.watchMaxSize.bind( this ) ] }, dedicated: [ { index: 0, runtime: { maxsize: 250 } } ] } ).init( true );
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
        <h2>5. Dedicated Rules</h2>
        <div class="case">
          <h2>Dedicated max size</h2>
          <div class="context" ref={ el => this.context = el }>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  { ` Resize Service initialization:

    new ResizeService( this.context, this.containers, "vertical", { global: { runtime: { maxsize: 200 },
    watchers: [ this.watchMaxSize.bind( this ) ] }, dedicated: [ { index: 0, runtime: { maxsize: 250 } } ] } ).init( true );` }
                  <br />
                  <br />
                  ==========================================================================================================================
                  <br />
                  <br />
                  { ` JSX:

    <div class="context" ref={ el => this.context = el }>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
    </div>
            `}
                  <br />
                  <br />
                  ==========================================================================================================================
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
    }
  `}
                </pre>
              </span>
            </div>
            <span class="space-top">
              { `Dedicated rules are used to overwrite any runtime rule or add new runtime rules for a given container. These dedicated rules should be defined when the Resize Service is initialized.` }
              <br />
              { `We need to specify the index of the affected container, the runtime rules that will be modified and its new values.` }
              <br />
              <br />
              { `In this example, the first container will have a different maximum size.` }
            </span>
          </article>
        </div>
      </Host >
    );
  }
}
