import { Component, Host, h } from '@stencil/core';
import { ResizeService } from "../../../../dist/ResizeService";

@Component( {
  tag: 'wtf-is-this',
  styleUrl: 'wtf-is-this.css',
  shadow: true,
} )
export class WtfIsThis {


  resizeService: ResizeService;
  context: HTMLElement;
  innerContext1: HTMLElement;
  innerContext2: HTMLElement;
  innerContext3: HTMLElement;
  inner1Context1: HTMLElement;
  inner1Context2: HTMLElement;
  inner1Context3: HTMLElement;
  inner2Context1: HTMLElement;
  inner2Context2: HTMLElement;
  inner2Context3: HTMLElement;
  inner3Context1: HTMLElement;
  inner3Context2: HTMLElement;
  inner3Context3: HTMLElement;
  containers: Array<HTMLElement> = [];
  inner1Containers: Array<HTMLElement> = [];
  inner2Containers: Array<HTMLElement> = [];
  inner3Containers: Array<HTMLElement> = [];
  inner1Containers1: Array<HTMLElement> = [];
  inner1Containers2: Array<HTMLElement> = [];
  inner1Containers3: Array<HTMLElement> = [];
  inner2Containers1: Array<HTMLElement> = [];
  inner2Containers2: Array<HTMLElement> = [];
  inner2Containers3: Array<HTMLElement> = [];
  inner3Containers1: Array<HTMLElement> = [];
  inner3Containers2: Array<HTMLElement> = [];
  inner3Containers3: Array<HTMLElement> = [];

  componentDidLoad () {
    this.resizeService = new ResizeService( this.context, this.containers, "vertical" );
    this.resizeService.init( true );
    new ResizeService( this.innerContext1, this.inner1Containers, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.innerContext2, this.inner2Containers, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.innerContext3, this.inner3Containers, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner1Context1, this.inner1Containers1, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner1Context2, this.inner1Containers2, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner1Context3, this.inner1Containers3, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner2Context1, this.inner2Containers1, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner2Context2, this.inner2Containers2, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner2Context3, this.inner2Containers3, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner3Context1, this.inner3Containers1, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner3Context2, this.inner3Containers2, "horizontal", { global: { startup: { keepBounderies: true } } } ).init( true );
    new ResizeService( this.inner3Context3, this.inner3Containers3, "vertical", { global: { startup: { keepBounderies: true } } } ).init( true );
  }

  // resizeExact () {
  //   this.resizeService.resize( [ 50, 0 ], "exact" );
  // }

  // resizeProcentage () {
  //   this.resizeService.resize( [ 50, 50 ], "procentage" );
  // }

  // resizeRatio () {
  //   this.resizeService.resize( [ 1 / 4, 3 / 4 ], "ratio" );
  // }


  addRandomCollor ( element: HTMLElement ) {
    const random_color = "#" + Math.floor( Math.random() * 0x1000000 ).toString( 16 );
    element.style.backgroundColor = random_color;
  }

  render () {
    return (
      <Host>

        <div id="context" ref={ el => this.context = el }>
          <div id="inner1Context" ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext1 = el ) && this.addRandomCollor( el ) }>
            <div id="inner1Context1" ref={ el => this.inner1Containers.push( el as HTMLElement ) && ( this.inner1Context1 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner1Containers1.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner1Containers1.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner1Containers1.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
            <div id="inner1Context2" ref={ el => this.inner1Containers.push( el as HTMLElement ) && ( this.inner1Context2 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner1Containers2.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner1Containers2.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner1Containers2.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
            <div id="inner1Context3" ref={ el => this.inner1Containers.push( el as HTMLElement ) && ( this.inner1Context3 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner1Containers3.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner1Containers3.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner1Containers3.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
          </div>
          <div id="inner2Context" ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext2 = el ) && this.addRandomCollor( el ) }>
            <div id="inner2Context1" ref={ el => this.inner2Containers.push( el as HTMLElement ) && ( this.inner2Context1 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner2Containers1.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner2Containers1.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner2Containers1.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
            <div id="inner2Context2" ref={ el => this.inner2Containers.push( el as HTMLElement ) && ( this.inner2Context2 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner2Containers2.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner2Containers2.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner2Containers2.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
            <div id="inner2Context3" ref={ el => this.inner2Containers.push( el as HTMLElement ) && ( this.inner2Context3 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner2Containers3.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner2Containers3.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner2Containers3.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
          </div>
          <div id="inner3Context" ref={ el => this.containers.push( el as HTMLElement ) && ( this.innerContext3 = el ) && this.addRandomCollor( el ) }>
            <div id="inner3Context1" ref={ el => this.inner3Containers.push( el as HTMLElement ) && ( this.inner3Context1 = el ) }>
              <div ref={ el => this.inner3Containers1.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner3Containers1.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner3Containers1.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
            <div id="inner3Context2" ref={ el => this.inner3Containers.push( el as HTMLElement ) && ( this.inner3Context2 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner3Containers2.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner3Containers2.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner3Containers2.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
            <div id="inner3Context3" ref={ el => this.inner3Containers.push( el as HTMLElement ) && ( this.inner3Context3 = el ) && this.addRandomCollor( el ) }>
              <div ref={ el => this.inner3Containers3.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner3Containers3.push( el ) && this.addRandomCollor( el ) }></div>
              <div ref={ el => this.inner3Containers3.push( el ) && this.addRandomCollor( el ) }></div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
