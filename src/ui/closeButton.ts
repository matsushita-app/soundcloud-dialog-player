export default class {
  element: HTMLButtonElement;

  constructor(parent: HTMLElement, className?: string) {
    const button = document.createElement('button');
    if (className) button.classList.add(className);
    button.innerHTML = `
        <svg>
          <path d="M1.2 18C.6 18 0 17.5 0 16.8c0-.4.1-.6.4-.8l7-7-7-7c-.3-.2-.4-.5-.4-.8C0 .5.6 0 1.2 0c.3 0 .6.1.8.3l7 7 7-7c.2-.2.5-.3.8-.3.6 0 1.2.5 1.2 1.2 0 .3-.1.6-.4.8l-7 7 7 7c.2.2.4.5.4.8 0 .7-.6 1.2-1.2 1.2-.3 0-.6-.1-.8-.3l-7-7-7 7c-.2.1-.5.3-.8.3z"></path>
        </svg>
      `;
    parent.appendChild(button);
    this.element = button;
  }

  onClick(callback: () => void): void {
    this.element.addEventListener('click', () => callback());
  }
}
