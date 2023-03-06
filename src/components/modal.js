import { closePopup } from "./utils";

function handleOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

export { handleOverlay };
