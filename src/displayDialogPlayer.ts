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
      <div class="thumbnail-container">
        <button>
          <img class="thumbnail large" draggable="false" />
        </button>
      </div>
      <p class="title">トラック名</p>
      <p class="artist">アーティスト名</p>
    </div>
  `);

  const info = getTrackInfo();
  updateDialogWithTrackInfo(dialog.element, info);

  togglePlayOnClickThumbnail();

  const trackInfoSourceObserver = updateDialogOnChangeTrack(dialog.element);
  const playButtonObserver = updateDialogOnPlayOrPauseTrack(dialog.element);

  const closeButton = new CloseButton(dialog.element, 'close');
  closeButton.onClick(() => dialog.element.close());
  dialog.onClose(() => {
    trackInfoSourceObserver.disconnect();
    playButtonObserver.disconnect();
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
  const thumbnailSrc = style
    .match(/url\("(.*?)"\)/)![1]
    .replace(/50x50/, '500x500')
    .replace(/120x120/, '1080x1080');
  return { title, artist, thumbnailSrc };
};

/**
 * サムネイルクリックで再生/一時停止
 */
const togglePlayOnClickThumbnail = () => {
  const thumbnailButton = document.querySelector(
    '#scdp .thumbnail-container button',
  )!;
  const playButton = document.querySelector<HTMLElement>(
    '.playControls__elements button.playControls__play',
  )!;
  thumbnailButton.addEventListener('click', () => {
    playButton.click();
  });
};

/**
 * トラックが再生/一時停止されたらダイアログを更新する
 */
const updateDialogOnPlayOrPauseTrack = (
  dialog: HTMLElement,
): MutationObserver => {
  const playButton = document.querySelector<HTMLElement>(
    '.playControls__elements button.playControls__play',
  )!;
  return observe(playButton, () => {
    const isPlaying = playButton.classList.contains('playing');
    const thumbnailEl = dialog.querySelector('#scdp img.thumbnail')!;
    thumbnailEl.classList.add(isPlaying ? 'large' : 'small');
    thumbnailEl.classList.remove(isPlaying ? 'small' : 'large');
  });
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
