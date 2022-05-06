import { Component, Host, h } from '@stencil/core';
import { ResizeService } from "../../../../../resize-service/dist/ResizeService";
import { Container } from "../../../../../resize-service/dist/constansts";

@Component({
  tag: 'resize-configs',
  styleUrl: 'resize-configs.css',
  shadow: false,
})
export class ResizeConfigs {

  context: HTMLElement;
  innerContext1: HTMLElement;
  innerContext2: HTMLElement;
  containers: Array<Container> = [];
  innerContainers1: Array<Container> = [];
  innerContainers2: Array<Container> = [];

  componentDidLoad() {
    new ResizeService(this.context, this.containers, "horizontal").init(true);
    new ResizeService(this.innerContext1, this.innerContainers1, "horizontal", { global: { startup: { keepSize: true }, configurations: [this.watchResize.bind(this)] } }).init(true);
    new ResizeService(this.innerContext2, this.innerContainers2, "horizontal").init(true);
  }

  addRandomCollor(element: HTMLElement) {
    const random_color = "#" + Math.floor(Math.random() * 0x1000000).toString(16);
    element.style.backgroundColor = random_color;
  }

  watchResize(resizer: ResizeService) {
    const { context, containers, rules } = resizer;
    rules.global.startup.keepSize &&
      (new ResizeObserver(() => {
        containers.forEach(container => {
          if (context[resizer.offsetSizeKey] > resizer.contextSize)
            container.style[resizer.sizeKey] = `${this.getProcentage(resizer.contextSize, container[resizer.offsetSizeKey])}%`;
        });
        resizer.refreshContextSize();
      }).observe(context));
  }

  getProcentage(total: number, part: number) {
    return (100 * part) / total;
  }

  render() {
    return (
      <Host>
        <div class="case">
          <h1>Configurations</h1>
          <h2>Keep size</h2>
          <div class="context" ref={el => this.context = el}>
            <div ref={el => this.containers.push(el as HTMLElement) && (this.innerContext1 = el) && this.addRandomCollor(el)}>
              <div ref={el => this.innerContainers1.push(el as HTMLElement) && this.addRandomCollor(el)}>
              </div>
              <div ref={el => this.innerContainers1.push(el as HTMLElement) && this.addRandomCollor(el)}>
              </div>
            </div>
            <div ref={el => this.containers.push(el as HTMLElement) && (this.innerContext2 = el) && this.addRandomCollor(el)}>
              <div ref={el => this.innerContainers2.push(el as HTMLElement) && this.addRandomCollor(el)}>
              </div>
              <div ref={el => this.innerContainers2.push(el as HTMLElement) && this.addRandomCollor(el)}>
              </div>
            </div>
          </div>
          <article class="space-top">
            <div class="code">
              <span>
                <pre>
                  {` Resize Service initialization:

        new ResizeService(this.context, this.containers, "horizontal").init(true);
        new ResizeService(this.innerContext1, this.innerContainers1, "horizontal", { global: { startup: { keepSize: true }, configurations: [this.watchResize.bind(this)] } }).init(true);
        new ResizeService(this.innerContext2, this.innerContainers2, "horizontal").init(true);
                ` }
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  <br />
                  {` JSX: 

        <div class="context" ref={el => this.context = el}>
        <div ref={el => this.containers.push(el as HTMLElement) && (this.innerContext1 = el) && this.addRandomCollor(el)}>
          <div ref={el => this.innerContainers1.push(el as HTMLElement) && this.addRandomCollor(el)}>
          </div>
          <div ref={el => this.innerContainers1.push(el as HTMLElement) && this.addRandomCollor(el)}>
          </div>
        </div>
        <div ref={el => this.containers.push(el as HTMLElement) && (this.innerContext2 = el) && this.addRandomCollor(el)}>
          <div ref={el => this.innerContainers2.push(el as HTMLElement) && this.addRandomCollor(el)}>
          </div>
          <div ref={el => this.innerContainers2.push(el as HTMLElement) && this.addRandomCollor(el)}>
          </div>
        </div>
        </div>
            `}
                  <br />
                  <br />
                  ========================================================================================================================================================================
                  <br />
                  <br />
                  {` Watcher example:
                  
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
            <span class="space-top">Each container has a min height of 20px.</span>
          </article>
        </div>
      </Host >
    );
  }
}
