import { Component, Host, h } from '@stencil/core';
import { ResizeService } from "../../../../../resize-service/dist/ResizeService";

@Component( {
  tag: 'resize-horizontal',
  styleUrl: 'resize-horizontal.css',
  shadow: false,
} )
export class ResizeHorizontal {

  context: HTMLElement;
  containers: Array<HTMLElement> = [];

  componentDidLoad () {
    new ResizeService( this.context, this.containers, "horizontal" ).init( true );
  }

  addRandomCollor ( element: HTMLElement ) {
    const random_color = "#" + Math.floor( Math.random() * 0x1000000 ).toString( 16 );
    element.style.backgroundColor = random_color;
  }

  render () {
    return (
      <Host>
        <div class="case">
          <h2>Horizontal Display</h2>
          <div class="context" ref={ el => this.context = el }>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  { ` Resize Service initialization:

    new ResizeService( this.context, this.containers, "horizontal" ).init( true );
                   `}
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
                </pre>
              </span>
            </div>
            <span class="space-top">
              { `In this example, we have two containers with horizontal display, separated by a dragbar.` }
            </span>
          </article>
        </div>
      </Host>
    );
  }

}
