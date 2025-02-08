export default (
  target: HTMLElement,
  callback: () => void,
): MutationObserver => {
  const observer = new MutationObserver((_) => callback());
  observer.observe(target, { childList: true });
  return observer;
};
