import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { debounce } from '@kluntje/js-utils/lib/function-helpers/decorators';

import './sidebarNav.ts';

@customElement('sidebar-component')
export class SidebarComponent extends LitElement {
  @query('.toggle')
  toggle: HTMLAnchorElement;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setInitialVisibility();
    window.addEventListener('resize', this.setInitialVisibility.bind(this));
  }

  @debounce(100)
  private setInitialVisibility() {
    window.innerWidth <= 1280 ? this.classList.add('inactive') : this.classList.remove('inactive');
  }

  firstUpdated(): void {
    this.toggle.addEventListener('click', this.handleToggleClick);
  }

  handleToggleClick = (e: Event) => {
    e.preventDefault();
    this.classList.toggle('inactive');
  };

  render() {
    return html`
      <div class="inner">
        <sidebar-nav></sidebar-nav>
      </div>
      <a href="#sidebar" class="toggle hamburger-icon"><icon-component name="hamburger"></icon-component></a>
    `;
  }
}