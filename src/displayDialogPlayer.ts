import CloseButton from './ui/closeButton.ts';
import Dialog from './ui/dialog.ts';
import observe from './util/observer.ts';
import TrackInfo from './types/trackInfo.ts';

/**
 * ダイアログプレイヤーを表示する
 */
export default () => {
  const dialog = new Dialog('scdp');
  dialog.setChild(`
    <div class="container">
      <img class="thumbnail" draggable="false" />
      <p class="title">トラック名</p>
      <p class="artist">アーティスト名</p>
    </div>
  `);

  const info = getTrackInfo();
  updateDialogWithTrackInfo(dialog.element, info);

  const trackInfoSourceObserver = updateDialogOnChangeTrack(dialog.element);

  const closeButton = new CloseButton(dialog.element, 'close');
  closeButton.onClick(() => dialog.element.close());
  dialog.onClose(() => {
    trackInfoSourceObserver.disconnect();
  });
};

/**
 * トラック情報を取得する
 */
const getTrackInfo = (): TrackInfo => {
  const badge = document.querySelector<HTMLElement>('.playbackSoundBadge')!;
  const title = badge
    .querySelector<HTMLElement>(
      '.playbackSoundBadge__titleContextContainer .playbackSoundBadge__title a span:not(.sc-visuallyhidden)',
    )!
    .textContent!;
  const artist = badge
    .querySelector<HTMLElement>(
      '.playbackSoundBadge__titleContextContainer a.playbackSoundBadge__lightLink',
    )!
    .textContent!;
  const style = badge
    .querySelector<HTMLElement>(
      'a.playbackSoundBadge__avatar span',
    )!
    .getAttribute('style')!;
  const thumbnailSrc = style.match(/url\("(.*?)"\)/)![1];
  return { title, artist, thumbnailSrc };
};

/**
 * トラックが変わったらダイアログのトラック情報を更新する
 */
const updateDialogOnChangeTrack = (dialog: HTMLElement): MutationObserver => {
  const trackInfoSourceEl = document.querySelector<HTMLElement>(
    '.playbackSoundBadge',
  )!;
  return observe(trackInfoSourceEl, () => {
    const info = getTrackInfo();
    updateDialogWithTrackInfo(dialog, info);
  });
};

/**
 * ダイアログのトラック情報を更新する
 */
const updateDialogWithTrackInfo = (dialog: HTMLElement, info: TrackInfo) => {
  const titleEl = dialog.querySelector('#scdp .title')!;
  titleEl.textContent = info.title;

  const artistEl = dialog.querySelector('#scdp .artist')!;
  artistEl.textContent = info.artist;

  const thumbnailEl = dialog.querySelector('#scdp img.thumbnail')!;
  thumbnailEl.setAttribute('src', info.thumbnailSrc);
};
