import CloseButton from './ui/closeButton.ts';
import Dialog from './ui/dialog.ts';

/**
 * ダイアログプレイヤーを表示する
 */
export default () => {
  const dialog = new Dialog('scdp');

  const closeButton = new CloseButton(dialog.element, 'close');
  closeButton.onClick(() => dialog.element.close());
};
