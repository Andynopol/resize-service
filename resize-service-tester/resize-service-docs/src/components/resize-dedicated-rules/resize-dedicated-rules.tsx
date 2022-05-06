import { Component, Host, h } from '@stencil/core';
import { Container } from '../../../../resize-service/dist/constansts';
import { ResizeService } from "../../../../resize-service/dist/ResizeService";

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
        <div class="case">
          <h1>Dedicated Rules</h1>
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
                </pre>
              </span>
            </div>
            <span class="space-top">Overwrite the max height of the first container to 250px.</span>
          </article>
        </div>
      </Host >
    );
  }
}
