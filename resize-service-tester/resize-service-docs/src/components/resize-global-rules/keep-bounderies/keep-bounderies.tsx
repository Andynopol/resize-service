import { Component, Host, h } from '@stencil/core';
import { ResizeService } from "../../../../../resize-service/dist/ResizeService";

@Component( {
  tag: 'keep-bounderies',
  styleUrl: 'keep-bounderies.css',
  shadow: false,
} )
export class KeepBounderies {

  context: HTMLElement;
  containers: Array<HTMLElement> = [];
  innerContext1: HTMLElement;
  innerContainers1: Array<HTMLElement> = [];
  innerContext2: HTMLElement;
  innerContainers2: Array<HTMLElement> = [];

  componentDidLoad () {
    new ResizeService( this.context, this.containers, "vertical" ).init( true );
    new ResizeService( this.innerContext1, this.innerContainers1, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.innerContext2, this.innerContainers2, "vertical" ).init( true );
  }

  addRandomCollor ( element: HTMLElement ) {
    const random_color = "#" + Math.floor( Math.random() * 0x1000000 ).toString( 16 );
    element.style.backgroundColor = random_color;
  }

  render () {
    return (
      <Host>
        <div class="case">
          <h1>Global Startup Rules</h1>
          <h2>Keep bounderies</h2>
          <div class="context" ref={ el => this.context = el }>
            <div ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext1 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.innerContainers1.push( el as HTMLElement ) && this.addRandomCollor( el ) }>

              </div>
              <div ref={ el => this.innerContainers1.push( el as HTMLElement ) && this.addRandomCollor( el ) }>

              </div>
            </div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext2 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.innerContainers2.push( el as HTMLElement ) && this.addRandomCollor( el ) }>

              </div>
              <div ref={ el => this.innerContainers2.push( el as HTMLElement ) && this.addRandomCollor( el ) }>

              </div>
            </div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  {` Resize Services initialization:

    new ResizeService( this.context, this.containers, "vertical" ).init( true );
    new ResizeService( this.innerContext1, this.innerContainers1, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.innerContext2, this.innerContainers2, "vertical" ).init( true ); `}
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  <br />
                  { ` JSX: 

    <div id="context" ref={ el => this.context = el }>
      <div ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext1 = el ) && this.addRandomCollor( el ) }>
        <div ref={ el => this.innerContainers1.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
        <div ref={ el => this.innerContainers1.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      </div>
      <div ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext2 = el ) && this.addRandomCollor( el ) }>
        <div ref={ el => this.innerContainers2.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
        <div ref={ el => this.innerContainers2.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      </div>
    </div>
            `}
                </pre>
              </span>
            </div>
            <span class="space-top">The first container will not exceed its container bounderies.</span>
          </article>
        </div>
      </Host>
    );
  }

}
