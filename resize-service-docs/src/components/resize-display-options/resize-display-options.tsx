import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'resize-display-options',
  styleUrl: 'resize-display-options.css',
  shadow: false,
})
export class ResizeDisplayOptions {

  render() {
    return (
      <Host>
        <h2>1. Containers Display Options</h2>
        <resize-vertical />
        <resize-horizontal />
      </Host>
    );
  }
}
