import displayDialogPlayer from '../displayDialogPlayer.ts';
import goToTrackPageOnChange from '../goToTrackPageOnChange.ts';

goToTrackPageOnChange();

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
  displayDialogPlayer();

  sendResponse();
  return true;
});
