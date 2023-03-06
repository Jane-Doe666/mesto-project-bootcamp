function showValidation(input, errorMessage, settings) {
  const spanElementSelector = `#error-${input.id}`;
  const span = document.querySelector(spanElementSelector);
  input.classList.add(settings.inputErrorClass);
  span.textContent = errorMessage;
}

function hideErrorMessage(input, settings) {
  const spanElementSelector = `#error-${input.id}`;
  const span = document.querySelector(spanElementSelector);
  input.classList.remove(settings.inputErrorClass);
  span.textContent = "";
}

export function toggleButton(form, settings) {
  const buttonSubmit = form.querySelector(settings.submitButtonSelector);
  if (form.checkValidity()) {
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.classList.remove(settings.inactiveButtonClass);
  } else {
    buttonSubmit.disabled = "true";
    buttonSubmit.classList.add(settings.inactiveButtonClass);
  }
}

function checkValidation(form, input, settings) {
  if (input.validity.valid) {
    hideErrorMessage(input, settings);
  } else {
    showValidation(input, input.validationMessage, settings);
  }
  toggleButton(form, settings);
}

function setEventListeners(formElement, settings) {
  const inputsList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputsList.forEach((inputElement) =>
    inputElement.addEventListener("input", () => {
      checkValidation(formElement, inputElement, settings);
    })
  );
}

export default function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
}
