import { closePopup } from "./utils";

function handleOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function handleOverlayByEsc(event, popup) {
  if (event.key === "Escape") {
    closePopup(popup);
  }
}

export { handleOverlay, handleOverlayByEsc };
