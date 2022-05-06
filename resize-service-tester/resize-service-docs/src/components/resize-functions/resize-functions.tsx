import { Component, Host, h } from '@stencil/core';
import { ResizeService } from "../../../../resize-service/dist/ResizeService";

@Component( {
  tag: 'resize-functions',
  styleUrl: 'resize-functions.css',
  shadow: false,
} )
export class ResizeFunctions {
  resizeService: ResizeService;
  context: HTMLElement;
  containers: Array<HTMLElement> = [];

  componentDidLoad () {
    this.resizeService = new ResizeService( this.context, this.containers, "vertical" );
    this.resizeService.init( true );
  }

  resizeExact () {
    this.resizeService.resize( [ 20, 80, 10, 10 ], 'exact' );
  }

  resizeProcentage () {
    this.resizeService.resize( [ 30, 40, 20, 10 ], "procentage" );
  }

  resizeRatio () {
    this.resizeService.resize( [ 1 / 5, 2 / 5, 2 / 5, 0 ], "ratio" );
  }


  addRandomCollor ( element: HTMLElement ) {
    const random_color = "#" + Math.floor( Math.random() * 0x1000000 ).toString( 16 );
    element.style.backgroundColor = random_color;
  }

  render () {
    return (
      <Host>
        <div class="case">
          <h1>Resize functionalities</h1>
          <h2>Exact / Procentage / Ratio</h2>
          <div class="context" ref={ el => this.context = el }>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
            <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
          </div>
          <div class="controls">
            <button onClick={this.resizeExact.bind(this)}>Resize exact</button>
            <button onClick={this.resizeProcentage.bind(this)}>Resize procentage</button>
            <button onClick={this.resizeRatio.bind(this)}>Resize ratio</button>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  {` Resize Service initialization:
    this.resizeService = new ResizeService( this.context, this.containers, "vertical" );
    this.resizeService.init( true ); `}
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  <br />
                  { ` JSX:

    <div class="context" ref={ el => this.context = el }>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
      <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
    </div> `}
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  <br />
                  { ` Resize handler example:
                  
    resizeExact () {
      this.resizeService.resize( [ 20, 80, 10, 10 ], "exact" );
    } 

    resizeProcentage () {
      this.resizeService.resize( [ 30, 40, 20, 10 ], "procentage" );
    }
  
    resizeRatio () {
      this.resizeService.resize( [ 1 / 5, 2 / 5, 2 / 5, 0 ], "ratio" );
    }
    `}

                </pre>
              </span>
            </div>
            <span class="space-top">Each container has a max height of 200px.</span>
          </article>
        </div>
      </Host >
    );
  }

}
