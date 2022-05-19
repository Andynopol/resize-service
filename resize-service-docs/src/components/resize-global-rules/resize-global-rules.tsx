import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'resize-global-rules',
  styleUrl: 'resize-global-rules.css',
  shadow: false,
})
export class ResizeGlobalRules {

  render() {
    return (
      <Host>
        <keep-bounderies />
        <h2>3. Global Runtime Rules & Watchers</h2>
        <min-size />
        <max-size />
        <resize-configs />
      </Host>
    );
  }

}
