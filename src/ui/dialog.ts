export default class {
  element: HTMLDialogElement;

  constructor(id?: string) {
    if (!document.querySelector('dialog#scdp')) {
      const dialog = document.createElement('dialog');
      if (id) dialog.id = id;
      document.body.appendChild(dialog);
    }
    const dialog = document.querySelector<HTMLDialogElement>('dialog#scdp')!;
    dialog.showModal();
    this.element = dialog;
  }

  setChild(child: string) {
    this.element.innerHTML = child;
  }

  onClose(callback?: () => void) {
    this.element.addEventListener('close', () => {
      if (callback) callback();
    });
  }
}
