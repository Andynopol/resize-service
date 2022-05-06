import { Component, Host, h } from '@stencil/core';
import { ResizeService } from "../../../../resize-service/dist/ResizeService";

@Component({
  tag: 'resize-vertical',
  styleUrl: 'resize-vertical.css',
  shadow: false,
})
export class ResizeVertical {

  context: HTMLElement;
  containers: Array<HTMLElement> = [];

  componentDidLoad() {
    new ResizeService(this.context, this.containers, "vertical").init(true);
  }

  addRandomCollor(element: HTMLElement) {
    const random_color = "#" + Math.floor(Math.random() * 0x1000000).toString(16);
    element.style.backgroundColor = random_color;
  }

  render() {
    return (
      <Host>
        <div class="case">
          <h2>Vertical Display</h2>
          <div class="context" ref={el => this.context = el}>
            <div ref={el => this.containers.push(el as HTMLElement) && this.addRandomCollor(el)}></div>
            <div ref={el => this.containers.push(el as HTMLElement) && this.addRandomCollor(el)}></div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  new ResizeService( this.context, this.containers, "vertical" ).init( true );
                  <br />
                  {`
                  <div class="context" ref={ el => this.context = el }>
                    <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
                    <div ref={ el => this.containers.push( el as HTMLElement ) && this.addRandomCollor( el ) }></div>
                  </div>
            `}
                </pre>
              </span>
            </div>
            <span class="space-top">Vertical display of two containers.</span>
          </article>
        </div>
      </Host>
    );
  }

}
