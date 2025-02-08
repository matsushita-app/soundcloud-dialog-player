import observe from './util/observer.ts';

/**
 * .fullListenHeroはトラックページにしかないと仮定し、トラックページかどうかを判定する
 */
const isTrackPage = (timeout: number): Promise<boolean> => {
  return new Promise((resolve) => {
    // すでに要素が存在する場合は即座に true を返す
    if (document.querySelector('.fullListenHero')) {
      resolve(true);
      return;
    }

    // DOM の変更を監視
    const observer = new MutationObserver(() => {
      if (document.querySelector('.fullListenHero')) {
        observer.disconnect();
        resolve(true);
      }
    });

    // 監視を開始
    observer.observe(document.body, { childList: true, subtree: true });

    // 一定時間後に false を返す
    setTimeout(() => {
      observer.disconnect();
      resolve(false);
    }, timeout);
  });
};

/**
 * トラックが変わったときにそのページに遷移する
 */
export default async (): Promise<void> => {
  if (!await isTrackPage(5000)) return;

  const observingTarget = document.querySelector<HTMLElement>(
    '.playbackSoundBadge',
  )!;

  observe(observingTarget, () => {
    const a = document.querySelector<HTMLAnchorElement>(
      '.playbackSoundBadge .playbackSoundBadge__titleContextContainer .playbackSoundBadge__title a',
    )!;
    a.click();
  });
};
